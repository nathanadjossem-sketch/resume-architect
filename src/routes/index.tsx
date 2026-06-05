import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, Palette } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Change le titre de l'onglet du navigateur dynamiquement et gère la redirection
  useEffect(() => {
    document.title = "Resume-Architect - Votre CV impeccable en quelques minutes";
    
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b">
        {/* Partie Logo supprimée : Remplacée par un texte pur bien stylisé */}
        <div className="text-xl font-bold tracking-tight text-primary">
          Resume-Architect
        </div>
        <Link to="/auth">
          <Button variant="ghost">Se connecter</Button>
        </Link>
      </header>

      <main className="px-6 md:px-12 py-20 md:py-28 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-accent text-accent-foreground mb-6">
          <Sparkles className="w-3 h-3" /> Nouveau · Édition en temps réel
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Votre CV, <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>impeccable</span>
          <br /> en quelques minutes.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Choisissez un template, remplissez le formulaire et exportez un PDF prêt à envoyer. Tout est sauvegardé automatiquement.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/auth">
            <Button size="lg">Créer mon CV</Button>
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6 text-left">
          {[
            { icon: Sparkles, title: "Aperçu en temps réel", desc: "Voyez chaque modification instantanément à droite de l'écran." },
            { icon: Palette, title: "Templates & personnalisation", desc: "Changez de design, de couleur, de police sans perdre vos données." },
            { icon: Download, title: "Export PDF haute fidélité", desc: "Un rendu net, sur A4, prêt à être partagé." },
          ].map((f, i) => (
            <div key={i} className="p-5 rounded-xl border bg-card">
              <f.icon className="w-5 h-5 mb-3" />
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}