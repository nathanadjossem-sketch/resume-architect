import { forwardRef } from "react";
import type { CVData, CVDesign } from "@/lib/cv-types";

interface Props {
  data: CVData;
  design: CVDesign;
}

export const CVPreviewBicolor = forwardRef<HTMLDivElement, Props>(({ data, design }, ref) => {
  const fontFamily = design.font === "serif" ? "var(--font-serif)" : "var(--font-sans)";
  const sidebarBg = design.color;
  return (
    <div
      ref={ref}
      className="cv-page flex"
      style={{ fontFamily, padding: 0 }}
    >
      {/* Sidebar */}
      <aside
        className="w-1/3 text-white p-6 space-y-6"
        style={{ background: sidebarBg, padding: design.margins }}
      >
        <div>
          <div
            className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-3xl font-semibold"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            {data.personal.firstName?.[0]}
            {data.personal.lastName?.[0]}
          </div>
          <h1 className="text-xl font-bold leading-tight">
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-sm opacity-80 mt-1">{data.personal.title}</p>
        </div>

        <Section title="Contact" light>
          <ul className="space-y-1.5 text-xs leading-relaxed opacity-95">
            {data.personal.email && <li>{data.personal.email}</li>}
            {data.personal.phone && <li>{data.personal.phone}</li>}
            {data.personal.location && <li>{data.personal.location}</li>}
            {data.personal.website && <li>{data.personal.website}</li>}
          </ul>
        </Section>

        {data.languages.length > 0 && (
          <Section title="Langues" light>
            <ul className="space-y-1.5 text-xs">
              {data.languages.map((l) => (
                <li key={l.id} className="flex justify-between">
                  <span>{l.name}</span>
                  <span className="opacity-70">{l.level}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {data.interests.length > 0 && (
          <Section title="Centres d'intérêt" light>
            <ul className="text-xs space-y-1 opacity-95">
              {data.interests.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </Section>
        )}
      </aside>

      {/* Main */}
      <main className="w-2/3 space-y-6" style={{ padding: design.margins, color: "#1a1a1a" }}>
        {data.profile && (
          <Section title="Profil" accent={design.color}>
            <p className="text-sm leading-relaxed text-neutral-700">{data.profile}</p>
          </Section>
        )}

        {data.experiences.length > 0 && (
          <Section title="Expériences" accent={design.color}>
            <div className="space-y-3">
              {data.experiences.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm">{e.role}</h3>
                    <span className="text-xs text-neutral-500">{e.period}</span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: design.color }}>
                    {e.company}
                  </p>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.educations.length > 0 && (
          <Section title="Formation" accent={design.color}>
            <div className="space-y-2">
              {data.educations.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-sm">{e.degree}</h3>
                    <span className="text-xs text-neutral-500">{e.period}</span>
                  </div>
                  <p className="text-xs" style={{ color: design.color }}>
                    {e.school}
                  </p>
                  {e.description && <p className="text-xs text-neutral-600 mt-1">{e.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.skills.length > 0 && (
          <Section title="Compétences" accent={design.color}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {data.skills.map((s) => (
                <div key={s.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{s.name}</span>
                  </div>
                  <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(s.level / 5) * 100}%`, background: design.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>
    </div>
  );
});

CVPreviewBicolor.displayName = "CVPreviewBicolor";

function Section({
  title,
  children,
  light,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  light?: boolean;
  accent?: string;
}) {
  return (
    <section>
      <h2
        className={`text-[11px] font-bold uppercase tracking-[0.15em] mb-2 ${
          light ? "opacity-80" : ""
        }`}
        style={accent ? { color: accent } : undefined}
      >
        {title}
      </h2>
      {accent && <div className="h-px mb-2" style={{ background: accent, opacity: 0.3 }} />}
      {children}
    </section>
  );
}
