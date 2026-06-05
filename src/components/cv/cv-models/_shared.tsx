import type { CVData, CVDesign } from "@/lib/cv-types";

export interface TemplateProps {
  data: CVData;
  design: CVDesign;
}

export const FONT_STACKS: Record<string, string> = {
  sans: '"Inter", Helvetica, Arial, sans-serif',
  serif: '"Source Serif 4", Georgia, "Times New Roman", serif',
  display: '"Playfair Display", Georgia, serif',
  mono: '"JetBrains Mono", Menlo, monospace',
};

export function font(design: CVDesign) {
  return FONT_STACKS[design.font] ?? FONT_STACKS.sans;
}

export const Initials = ({
  data, color, fg = "#ffffff", size = 80, fontSize = 26,
}: { data: CVData; color: string; fg?: string; size?: number; fontSize?: number }) => (
  <div
    style={{
      width: size, height: size, borderRadius: "50%", background: color, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize, fontWeight: 700, letterSpacing: 1, flexShrink: 0,
    }}
  >
    {data.personal.firstName?.[0]}
    {data.personal.lastName?.[0]}
  </div>
);
