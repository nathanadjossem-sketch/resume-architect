import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { CVDesign } from "@/lib/cv-types";
import { Check } from "lucide-react";

const PALETTES: Array<{ name: string; color: string }> = [
  { name: "Slate", color: "#0f172a" },
  { name: "Indigo", color: "#4f46e5" },
  { name: "Cobalt", color: "#1d4ed8" },
  { name: "Turquoise", color: "#14b8a6" },
  { name: "Émeraude", color: "#059669" },
  { name: "Terracotta", color: "#c2724a" },
  { name: "Cuivre", color: "#b45309" },
  { name: "Bourgogne", color: "#9f1239" },
  { name: "Violet", color: "#7c3aed" },
  { name: "Or", color: "#b08d3b" },
  { name: "Charbon", color: "#1f2937" },
  { name: "Rose", color: "#e11d48" },
];

const FONTS: Array<{ id: CVDesign["font"]; label: string; sample: string }> = [
  { id: "sans" as any, label: "Inter", sample: "Aa" },
  { id: "serif" as any, label: "Serif Moderne", sample: "Aa" },
  { id: "display" as any, label: "Playfair", sample: "Aa" },
  { id: "mono" as any, label: "Mono Tech", sample: "Aa" },
];

const STACKS: Record<string, string> = {
  sans: '"Inter", sans-serif',
  serif: '"Source Serif 4", serif',
  display: '"Playfair Display", serif',
  mono: '"JetBrains Mono", monospace',
};

export function Customizer({ design, onChange }: { design: CVDesign; onChange: (d: CVDesign) => void }) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-4">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Palette de couleurs
        </Label>
        <div className="grid grid-cols-6 gap-2">
          {PALETTES.map((p) => {
            const active = design.color === p.color;
            return (
              <button
                key={p.color}
                onClick={() => onChange({ ...design, color: p.color })}
                title={p.name}
                className={`relative aspect-square rounded-lg transition-all hover:scale-105 ${
                  active ? "ring-2 ring-offset-2 ring-offset-background ring-foreground" : ""
                }`}
                style={{ background: p.color }}
                aria-label={p.name}
              >
                {active && (
                  <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-4">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Police d'écriture
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((f) => {
            const active = design.font === f.id;
            return (
              <button
                key={f.id as string}
                onClick={() => onChange({ ...design, font: f.id })}
                className={`px-3 py-3 rounded-lg border text-left transition ${
                  active
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border/60 bg-background/40 hover:border-foreground/30"
                }`}
              >
                <div style={{ fontFamily: STACKS[f.id as string], fontSize: 22, lineHeight: 1, color: "var(--foreground)" }}>
                  {f.sample}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">{f.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-4">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Marges intérieures · {design.margins}px
        </Label>
        <Slider
          min={16}
          max={56}
          step={4}
          value={[design.margins]}
          onValueChange={(v) => onChange({ ...design, margins: v[0] })}
        />
      </div>
    </div>
  );
}
