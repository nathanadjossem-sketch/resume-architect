import { forwardRef } from "react";
import type { TemplateProps } from "./cv-models/_shared";
import Bicolor from "./cv-models/Bicolor";
import Creative from "./cv-models/Creative";
import Corporate from "./cv-models/Corporate";
import Minimalist from "./cv-models/Minimalist";
import Technical from "./cv-models/Technical";
import Timeline from "./cv-models/Timeline";
import Floating from "./cv-models/Floating";
import BoldHeader from "./cv-models/BoldHeader";
import Split from "./cv-models/Split";
import Classic from "./cv-models/Classic";
import Neon from "./cv-models/Neon";
import Zen from "./cv-models/Zen";
import Diagonal from "./cv-models/Diagonal";
import Editorial from "./cv-models/Editorial";
import Luxury from "./cv-models/Luxury";

export type { TemplateProps } from "./cv-models/_shared";

export const TEMPLATES = [
  { id: "bicolor", name: "Cyber Dark Sidebar", tag: "Sombre · Sidebar" },
  { id: "creative", name: "Geometric Avant-Garde", tag: "Créatif · Géométrique" },
  { id: "corporate", name: "Corporate Banner", tag: "Pro · Bandeau" },
  { id: "minimalist", name: "Nordic Sage & Terracotta", tag: "Tendance · Pastel" },
  { id: "technical", name: "Tech Dashboard", tag: "Dense · Dev" },
  { id: "timeline", name: "Asymmetric Timeline", tag: "Chrono · Asymétrique" },
  { id: "floating", name: "Floating Cards", tag: "Cartes · Ombrées" },
  { id: "boldheader", name: "Bold Typography", tag: "Typo · Accent" },
  { id: "split", name: "Split 50/50 Contrast", tag: "Contraste · Égal" },
  { id: "classic", name: "Minimalist Noir", tag: "Couture · Serif" },
  { id: "neon", name: "Neon Cyberpunk", tag: "Futur · Néon" },
  { id: "zen", name: "Japanese Zen", tag: "Épuré · Nippon" },
  { id: "diagonal", name: "Diagonal Split", tag: "Audacieux · Diagonale" },
  { id: "editorial", name: "Creative Editorial", tag: "Magazine · Serif" },
  { id: "luxury", name: "Dark Mode Luxury", tag: "Sombre · Or" },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]["id"];

const RENDERERS: Record<string, React.FC<TemplateProps>> = {
  bicolor: Bicolor,
  creative: Creative,
  corporate: Corporate,
  minimalist: Minimalist,
  technical: Technical,
  timeline: Timeline,
  floating: Floating,
  boldheader: BoldHeader,
  split: Split,
  classic: Classic,
  neon: Neon,
  zen: Zen,
  diagonal: Diagonal,
  editorial: Editorial,
  luxury: Luxury,
};

export const CVPreview = forwardRef<HTMLDivElement, TemplateProps>(({ data, design }, ref) => {
  const Renderer = RENDERERS[design.template] ?? Bicolor;
  return (
    <div ref={ref}>
      <Renderer data={data} design={design} />
    </div>
  );
});
CVPreview.displayName = "CVPreview";
