import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Download, Save, FileText, Sparkles, Palette, LayoutTemplate,
  ZoomIn, ZoomOut, ArrowDown,
} from "lucide-react";
import { CVForm } from "@/components/cv/CVForm";
import { CVPreview } from "@/components/cv/templates";
import { TemplatePicker } from "@/components/cv/TemplatePicker";
import { Customizer } from "@/components/cv/Customizer";
import { emptyCV, type CVData, type CVDesign } from "@/lib/cv-types";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/$cvId")({ component: Editor });

function Editor() {
  const { cvId } = Route.useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const previewSectionRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("Mon CV");
  const [data, setData] = useState<CVData>(emptyCV);
  const [design, setDesign] = useState<CVDesign>({
    template: "bicolor",
    color: "#1e293b",
    font: "sans",
    margins: 32,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [zoom, setZoom] = useState(0.85);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [user, authLoading, navigate]);

  const emailConfirmed = !!user?.email_confirmed_at || !!(user as any)?.confirmed_at;

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: cv, error } = await supabase.from("cvs").select("*").eq("id", cvId).single();
      if (error || !cv) {
        toast.error("CV introuvable");
        navigate({ to: "/dashboard" });
        return;
      }
      setTitle(cv.title);
      setData({ ...emptyCV, ...(cv.data as any) });
      setDesign({
        template: cv.template,
        color: cv.color,
        font: cv.font as CVDesign["font"],
        margins: cv.margins,
      });
      setLoading(false);
    })();
  }, [cvId, user, navigate]);

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => save(true), 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, design, title]);

  const save = async (silent = false) => {
    setSaving(true);
    const { error } = await supabase
      .from("cvs")
      .update({
        title,
        data: data as any,
        template: design.template,
        color: design.color,
        font: design.font,
        margins: design.margins,
      })
      .eq("id", cvId);
    setSaving(false);
    if (error) toast.error(error.message);
    else if (!silent) toast.success("Enregistré");
  };

  const exportPDF = async () => {
    if (!previewRef.current) return;
    toast.loading("Génération du PDF…", { id: "pdf" });
    try {
      const [{ toPng }, { default: jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf"),
      ]);
      const node = previewRef.current;
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
        width: node.offsetWidth,
        height: node.offsetHeight,
      });
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const img = new Image();
      img.src = dataUrl;
      await new Promise((res) => (img.onload = res));
      const ratio = img.height / img.width;
      const imgH = pageW * ratio;
      pdf.addImage(dataUrl, "PNG", 0, 0, pageW, Math.min(imgH, pageH));
      pdf.save(`${title || "cv"}.pdf`);
      toast.success("PDF téléchargé", { id: "pdf" });
    } catch (e: any) {
      toast.error("Erreur PDF: " + e.message, { id: "pdf" });
    }
  };

  const scrollToPreview = () => {
    previewSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Chargement…</div>;
  }

  if (user && !emailConfirmed) {
    return (
      <div className="min-h-screen grid place-items-center px-4 text-center bg-background">
        <div className="max-w-md border rounded-2xl p-8 bg-card shadow-sm space-y-3">
          <FileText className="w-8 h-8 mx-auto text-primary" strokeWidth={1.5} />
          <h2 className="text-lg font-semibold">Confirmez votre adresse email</h2>
          <p className="text-sm text-muted-foreground">
            Nous avons envoyé un lien de confirmation à <strong>{user.email}</strong>.
            Cliquez sur le lien pour activer votre compte et accéder à l'éditeur de CV.
          </p>
          <Button variant="outline" onClick={async () => {
            await supabase.auth.resend({ type: "signup", email: user.email! });
            toast.success("Email de confirmation renvoyé");
          }}>Renvoyer l'email</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border/60 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-3 bg-background/80 backdrop-blur-md z-30 sticky top-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="hover:bg-accent/40 shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-primary/60 grid place-items-center shadow-md shrink-0">
              <FileText className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none shadow-none h-8 px-1 font-medium focus-visible:ring-0 bg-transparent text-sm sm:text-base min-w-0"
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-xs text-muted-foreground hidden md:inline-flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${saving ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
            {saving ? "Enregistrement…" : "Synchronisé"}
          </span>
          <Button variant="outline" size="sm" onClick={() => save()} className="hover:bg-accent/60 rounded-xl hidden sm:inline-flex">
            <Save className="w-4 h-4 sm:mr-1.5" strokeWidth={1.5} /> <span className="hidden sm:inline">Enregistrer</span>
          </Button>
          <Button size="sm" onClick={exportPDF} className="rounded-xl shadow-sm">
            <Download className="w-4 h-4 sm:mr-1.5" strokeWidth={1.5} /> <span className="hidden sm:inline">Télécharger</span>
          </Button>
        </div>
      </header>

      {/* Responsive layout: stacked on mobile, side-by-side on desktop */}
      <div className="w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-[1600px]">
        {/* Left column: form / designs / style */}
        <div className="w-full lg:w-1/2 lg:max-w-[640px] min-w-0">
          <Tabs defaultValue="content" className="w-full">
            <div className="sticky top-[57px] z-20 bg-background/90 backdrop-blur-md py-2 -mx-3 sm:-mx-4 px-3 sm:px-4 border-b border-border/40">
              <TabsList className="grid grid-cols-3 w-full bg-muted/60 rounded-xl">
                <TabsTrigger value="content" className="rounded-lg text-xs sm:text-sm"><Sparkles className="w-3.5 h-3.5 sm:mr-1.5" strokeWidth={1.5} /> <span className="hidden sm:inline">Vos informations</span><span className="sm:hidden">Infos</span></TabsTrigger>
                <TabsTrigger value="designs" className="rounded-lg text-xs sm:text-sm"><LayoutTemplate className="w-3.5 h-3.5 sm:mr-1.5" strokeWidth={1.5} /> Modèles</TabsTrigger>
                <TabsTrigger value="style" className="rounded-lg text-xs sm:text-sm"><Palette className="w-3.5 h-3.5 sm:mr-1.5" strokeWidth={1.5} /> Style</TabsTrigger>
              </TabsList>
            </div>
            <div className="pt-6">
              <TabsContent value="content" className="mt-0"><CVForm data={data} onChange={setData} /></TabsContent>
              <TabsContent value="designs" className="mt-0"><TemplatePicker data={data} design={design} onChange={setDesign} /></TabsContent>
              <TabsContent value="style" className="mt-0"><Customizer design={design} onChange={setDesign} /></TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right column: live preview — sticky on desktop, stacked under form on mobile */}
        <section ref={previewSectionRef} className="w-full lg:w-1/2 lg:flex-1 min-w-0 lg:sticky lg:top-[73px] lg:self-start lg:max-h-[calc(100vh-90px)] lg:overflow-y-auto">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2 flex-wrap">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} /> Aperçu
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Modèle : <span className="capitalize font-medium text-foreground">{design.template}</span>
              </p>
            </div>
            <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1 shadow-sm shrink-0">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => setZoom((z) => Math.max(0.3, z - 0.1))}>
                <ZoomOut className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Button>
              <span className="text-xs font-medium tabular-nums w-10 text-center">{Math.round(zoom * 100)}%</span>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}>
                <ZoomIn className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Button>
            </div>
          </div>

          <div className="editor-canvas rounded-2xl border border-border p-3 sm:p-6 overflow-auto w-full">
            <div
              className="origin-top-left mx-auto"
              style={{ transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.25s ease", width: "fit-content" }}
            >
              <CVPreview ref={previewRef} data={data} design={design} />
            </div>
          </div>

          <div className="flex justify-center mt-4 sm:mt-6">
            <Button onClick={exportPDF} size="lg" className="rounded-xl shadow-sm w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" strokeWidth={1.5} /> Télécharger mon CV
            </Button>
          </div>
        </section>
      </div>

      {/* Floating action button — only on mobile to jump to preview */}
      <button
        onClick={scrollToPreview}
        className="lg:hidden fixed bottom-5 right-5 z-40 bg-primary text-primary-foreground rounded-full shadow-lg px-4 py-2.5 flex items-center gap-2 text-sm font-medium hover:shadow-xl transition-shadow"
        aria-label="Voir l'aperçu"
      >
        <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
        Aperçu
      </button>
    </div>
  );
}
