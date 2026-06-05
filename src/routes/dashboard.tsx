import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Trash2, Copy, Pencil, LogOut } from "lucide-react";
import { emptyCV } from "@/lib/cv-types";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

type CVRow = {
  id: string;
  title: string;
  template: string;
  updated_at: string;
};

function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [cvs, setCvs] = useState<CVRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [user, authLoading, navigate]);

  const load = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("cvs")
      .select("id,title,template,updated_at")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    else setCvs(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const createCV = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("cvs")
      .insert({ user_id: user.id, title: "Mon CV", data: emptyCV as any })
      .select("id")
      .single();
    if (error) return toast.error(error.message);
    navigate({ to: "/editor/$cvId", params: { cvId: data.id } });
  };

  const duplicate = async (id: string) => {
    const { data: src } = await supabase.from("cvs").select("*").eq("id", id).single();
    if (!src || !user) return;
    const { error } = await supabase.from("cvs").insert({
      user_id: user.id,
      title: src.title + " (copie)",
      data: src.data,
      template: src.template,
      color: src.color,
      font: src.font,
      margins: src.margins,
    });
    if (error) toast.error(error.message);
    else { toast.success("CV dupliqué"); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce CV ?")) return;
    const { error } = await supabase.from("cvs").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { setCvs((c) => c.filter((x) => x.id !== id)); toast.success("Supprimé"); }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
            <FileText className="w-4 h-4" />
          </div>
          Resumly
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-1" /> Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes CV</h1>
            <p className="text-muted-foreground text-sm mt-1">Créez et gérez vos CV en un clic.</p>
          </div>
          <Button onClick={createCV}>
            <Plus className="w-4 h-4 mr-1" /> Nouveau CV
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : cvs.length === 0 ? (
          <div className="border-2 border-dashed rounded-xl p-12 text-center">
            <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-semibold">Aucun CV pour l'instant</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Commencez par en créer un.</p>
            <Button onClick={createCV}>
              <Plus className="w-4 h-4 mr-1" /> Créer mon premier CV
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cvs.map((cv) => (
              <div key={cv.id} className="border rounded-xl bg-card p-5 hover:shadow-md transition">
                <div className="aspect-[1/1.414] bg-muted rounded-md mb-4 grid place-items-center">
                  <FileText className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <h3 className="font-semibold truncate">{cv.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Modifié {new Date(cv.updated_at).toLocaleDateString("fr-FR")}
                </p>
                <div className="flex gap-1 mt-3">
                  <Link to="/editor/$cvId" params={{ cvId: cv.id }} className="flex-1">
                    <Button size="sm" variant="default" className="w-full">
                      <Pencil className="w-3.5 h-3.5 mr-1" /> Éditer
                    </Button>
                  </Link>
                  <Button size="icon" variant="ghost" onClick={() => duplicate(cv.id)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(cv.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
