import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { CVData } from "@/lib/cv-types";

interface Props {
  data: CVData;
  onChange: (next: CVData) => void;
}

export function CVForm({ data, onChange }: Props) {
  const update = <K extends keyof CVData>(key: K, value: CVData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-8">
      <Section
        title="Vos coordonnées"
        hint="Ces informations apparaissent en haut de votre CV. Restez sobre : un titre clair vaut mieux qu'un long slogan."
      >
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom" value={data.personal.firstName} onChange={(v) => update("personal", { ...data.personal, firstName: v })} />
          <Field label="Nom" value={data.personal.lastName} onChange={(v) => update("personal", { ...data.personal, lastName: v })} />
          <Field label="Titre du poste recherché" value={data.personal.title} onChange={(v) => update("personal", { ...data.personal, title: v })} full />
          <Field label="Email" value={data.personal.email} onChange={(v) => update("personal", { ...data.personal, email: v })} />
          <Field label="Téléphone" value={data.personal.phone} onChange={(v) => update("personal", { ...data.personal, phone: v })} />
          <Field label="Ville" value={data.personal.location} onChange={(v) => update("personal", { ...data.personal, location: v })} />
          <Field label="Site web ou LinkedIn" value={data.personal.website ?? ""} onChange={(v) => update("personal", { ...data.personal, website: v })} />
        </div>
      </Section>

      <Section
        title="À propos de vous"
        hint="Conseil : 3 à 4 lignes suffisent. Mentionnez votre métier, vos années d'expérience et ce qui vous rend unique."
      >
        <Textarea rows={4} value={data.profile} onChange={(e) => update("profile", e.target.value)} placeholder="Ex : Développeur web passionné avec 5 ans d'expérience…" />
      </Section>

      <Section
        title="Parcours professionnel"
        hint="Conseil : Décrivez vos missions en commençant par un verbe d'action (Conçu, Animé, Géré…)."
      >
        <div className="space-y-3">
          {data.experiences.map((exp, i) => (
            <Card key={exp.id} onRemove={() => update("experiences", data.experiences.filter((_, j) => j !== i))}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Poste" value={exp.role} onChange={(v) => update("experiences", data.experiences.map((e, j) => (i === j ? { ...e, role: v } : e)))} />
                <Field label="Entreprise" value={exp.company} onChange={(v) => update("experiences", data.experiences.map((e, j) => (i === j ? { ...e, company: v } : e)))} />
                <Field label="Période (ex : 2021 — Aujourd'hui)" value={exp.period} onChange={(v) => update("experiences", data.experiences.map((e, j) => (i === j ? { ...e, period: v } : e)))} full />
              </div>
              <div className="mt-2">
                <Label className="text-xs">Ce que vous y avez fait</Label>
                <Textarea rows={2} value={exp.description} onChange={(e) => update("experiences", data.experiences.map((it, j) => (i === j ? { ...it, description: e.target.value } : it)))} placeholder="Ex : Pilotage d'une équipe de 4 personnes, refonte du site interne…" />
              </div>
            </Card>
          ))}
          <AddBtn label="Ajouter une expérience" onClick={() => update("experiences", [...data.experiences, { id: crypto.randomUUID(), role: "", company: "", period: "", description: "" }])} />
        </div>
      </Section>

      <Section title="Formations">
        <div className="space-y-3">
          {data.educations.map((ed, i) => (
            <Card key={ed.id} onRemove={() => update("educations", data.educations.filter((_, j) => j !== i))}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Diplôme" value={ed.degree} onChange={(v) => update("educations", data.educations.map((e, j) => (i === j ? { ...e, degree: v } : e)))} />
                <Field label="École" value={ed.school} onChange={(v) => update("educations", data.educations.map((e, j) => (i === j ? { ...e, school: v } : e)))} />
                <Field label="Période" value={ed.period} onChange={(v) => update("educations", data.educations.map((e, j) => (i === j ? { ...e, period: v } : e)))} full />
              </div>
            </Card>
          ))}
          <AddBtn label="Ajouter une formation" onClick={() => update("educations", [...data.educations, { id: crypto.randomUUID(), degree: "", school: "", period: "" }])} />
        </div>
      </Section>

      <Section title="Compétences">
        <div className="space-y-2">
          {data.skills.map((s, i) => (
            <div key={s.id} className="flex gap-2 items-center">
              <Input value={s.name} onChange={(e) => update("skills", data.skills.map((it, j) => (i === j ? { ...it, name: e.target.value } : it)))} placeholder="Compétence" />
              <Input type="number" min={1} max={5} className="w-20" value={s.level} onChange={(e) => update("skills", data.skills.map((it, j) => (i === j ? { ...it, level: Number(e.target.value) } : it)))} />
              <Button size="icon" variant="ghost" onClick={() => update("skills", data.skills.filter((_, j) => j !== i))}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <AddBtn label="Ajouter une compétence" onClick={() => update("skills", [...data.skills, { id: crypto.randomUUID(), name: "", level: 3 }])} />
        </div>
      </Section>

      <Section title="Langues">
        <div className="space-y-2">
          {data.languages.map((l, i) => (
            <div key={l.id} className="flex gap-2 items-center">
              <Input value={l.name} onChange={(e) => update("languages", data.languages.map((it, j) => (i === j ? { ...it, name: e.target.value } : it)))} placeholder="Langue" />
              <Input value={l.level} onChange={(e) => update("languages", data.languages.map((it, j) => (i === j ? { ...it, level: e.target.value } : it)))} placeholder="Niveau" />
              <Button size="icon" variant="ghost" onClick={() => update("languages", data.languages.filter((_, j) => j !== i))}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <AddBtn label="Ajouter une langue" onClick={() => update("languages", [...data.languages, { id: crypto.randomUUID(), name: "", level: "" }])} />
        </div>
      </Section>

      <Section title="Centres d'intérêt">
        <Input
          value={data.interests.join(", ")}
          onChange={(e) => update("interests", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          placeholder="Séparés par des virgules"
        />
      </Section>
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-1 text-foreground/90">{title}</h3>
      {hint && <p className="text-xs text-muted-foreground mb-3 italic">{hint}</p>}
      {children}
    </div>
  );
}

function Field({ label, value, onChange, full }: { label: string; value: string; onChange: (v: string) => void; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <Label className="text-xs">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Card({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="border rounded-lg p-3 bg-card relative">
      <Button size="icon" variant="ghost" className="absolute top-1 right-1 h-7 w-7" onClick={onRemove}>
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
      {children}
    </div>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="w-full">
      <Plus className="w-4 h-4 mr-1" /> {label}
    </Button>
  );
}
