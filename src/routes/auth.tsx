import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { FileText, Mail, Lock } from "lucide-react";
import { validateEmail } from "@/lib/email-validation";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateEmail(email);
    if (!v.ok) return toast.error(v.reason);
    if (password.length < 6) return toast.error("Mot de passe : 6 caractères minimum");

    setLoading(true);
    const payload = { email: email.trim().toLowerCase(), password };

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        ...payload,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      if (!data.session) {
        toast.success("Compte créé. Vérifiez votre boîte mail pour confirmer votre adresse avant de vous connecter.", { duration: 9000 });
        setMode("signin");
        setPassword("");
        return;
      }
      toast.success("Compte créé. Bienvenue !");
    } else {
      const { error } = await supabase.auth.signInWithPassword(payload);
      setLoading(false);
      if (error) {
        const m = error.message?.toLowerCase() ?? "";
        if (m.includes("not confirmed") || m.includes("email not")) {
          return toast.error("Email non confirmé. Vérifiez votre boîte mail.");
        }
        return toast.error("Email ou mot de passe incorrect");
      }
      toast.success("Connexion réussie");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-gradient-to-br from-background via-background to-accent/20">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 font-semibold mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
            <FileText className="w-4 h-4" />
          </div>
          Resumly
        </Link>

        <div className="border rounded-2xl p-7 bg-card shadow-lg space-y-5">
          <div className="text-center space-y-1">
            <h2 className="font-semibold text-xl tracking-tight">
              {mode === "signin" ? "Connexion" : "Créer un compte"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "signin"
                ? "Accédez à vos CV en quelques secondes."
                : "Commencez à créer votre CV professionnel."}
            </p>
          </div>

          <div className="grid grid-cols-2 p-1 bg-muted rounded-lg text-sm">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`py-1.5 rounded-md transition ${mode === "signin" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              Se connecter
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`py-1.5 rounded-md transition ${mode === "signup" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
            >
              S'inscrire
            </button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Mot de passe</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Patientez…" : mode === "signin" ? "Se connecter" : "Créer mon compte"}
            </Button>
          </form>

          <p className="text-[11px] text-muted-foreground text-center">
            En continuant, vous acceptez nos conditions d'utilisation.
          </p>
        </div>
      </div>
    </div>
  );
}
