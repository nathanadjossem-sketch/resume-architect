import { TEMPLATES, CVPreview } from "./templates";
import type { CVData, CVDesign } from "@/lib/cv-types";
import { Check } from "lucide-react";

interface Props {
  data: CVData;
  design: CVDesign;
  onChange: (d: CVDesign) => void;
}

// 10 tiles — each one is a real (scaled) render of the CV with its template applied,
// so the user previews the actual layout, never a mockup.
export function TemplatePicker({ data, design, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Galerie de designs</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Vos données restent intactes. Cliquez pour basculer instantanément.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((t) => {
          const selected = design.template === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange({ ...design, template: t.id })}
              className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all hover:-translate-y-0.5 ${
                selected
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-border/60 hover:border-foreground/30"
              }`}
            >
              <div
                aria-hidden
                className="bg-white overflow-hidden"
                style={{ width: "100%", aspectRatio: "210 / 297", position: "relative" }}
              >
                <div
                  style={{
                    transform: "scale(0.215)",
                    transformOrigin: "top left",
                    width: "210mm",
                    pointerEvents: "none",
                  }}
                >
                  <CVPreview data={data} design={{ ...design, template: t.id }} />
                </div>
              </div>

              <div className="px-2.5 py-2 bg-card/80 backdrop-blur-md border-t border-border/60">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11.5px] font-semibold truncate">{t.name}</span>
                  {selected && (
                    <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground grid place-items-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <div className="text-[9.5px] text-muted-foreground mt-0.5 uppercase tracking-wider">
                  {t.tag}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
