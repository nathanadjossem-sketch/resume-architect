import { font, Initials, type TemplateProps } from "./_shared";

const SplitTitle = ({ accent, children }: { accent: string; children: React.ReactNode }) => (
  <h2 style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: 2, textTransform: "uppercase", margin: "20px 0 10px" }}>{children}</h2>
);
const SplitTitleLight = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 13, fontWeight: 800, color: "#1a2238", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 14px", borderBottom: "2px solid #1a2238", paddingBottom: 4, display: "inline-block" }}>{children}</h2>
);

export default function Split({ data, design }: TemplateProps) {
  const dark = "#1a2238";
  const accent = design.color;
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: 0, display: "flex", color: "#1f2937", minHeight: "297mm" }}>
      <div style={{ width: "50%", background: dark, color: "#f1f5f9", padding: design.margins + 6 }}>
        <Initials data={data} color={accent} fg={dark} size={86} fontSize={28} />
        <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.05, marginTop: 18, color: "#fff" }}>
          {data.personal.firstName}<br /><span style={{ color: accent }}>{data.personal.lastName}</span>
        </h1>
        <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 8 }}>{data.personal.title}</p>
        <div style={{ width: 50, height: 3, background: accent, marginTop: 14 }} />

        <SplitTitle accent={accent}>Profil</SplitTitle>
        <p style={{ fontSize: 11.5, color: "#cbd5e1", lineHeight: 1.65 }}>{data.profile}</p>

        <SplitTitle accent={accent}>Contact</SplitTitle>
        <ul style={{ fontSize: 11, color: "#e2e8f0", lineHeight: 1.85 }}>
          {data.personal.email && <li>✉  {data.personal.email}</li>}
          {data.personal.phone && <li>☎  {data.personal.phone}</li>}
          {data.personal.location && <li>◉  {data.personal.location}</li>}
          {data.personal.website && <li>↗  {data.personal.website}</li>}
        </ul>

        <SplitTitle accent={accent}>Compétences</SplitTitle>
        {data.skills.map((s) => (
          <div key={s.id} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10.5, color: "#e2e8f0", marginBottom: 3 }}>{s.name}</div>
            <div style={{ background: "rgba(255,255,255,0.12)", height: 4, borderRadius: 2 }}>
              <div style={{ background: accent, width: `${(s.level / 5) * 100}%`, height: "100%", borderRadius: 2 }} />
            </div>
          </div>
        ))}

        {data.languages.length > 0 && (
          <>
            <SplitTitle accent={accent}>Langues</SplitTitle>
            {data.languages.map((l) => (
              <div key={l.id} style={{ fontSize: 11, color: "#e2e8f0", display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span>{l.name}</span><span style={{ color: accent }}>{l.level}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <div style={{ width: "50%", background: "#fafaf7", padding: design.margins + 6 }}>
        <SplitTitleLight>Parcours professionnel</SplitTitleLight>
        {data.experiences.map((e) => (
          <div key={e.id} style={{ marginBottom: 14, paddingLeft: 16, borderLeft: `3px solid ${accent}`, position: "relative" }}>
            <span style={{ position: "absolute", left: -7, top: 4, width: 11, height: 11, borderRadius: "50%", background: "#fafaf7", border: `3px solid ${accent}` }} />
            <div style={{ fontSize: 10, color: accent, fontWeight: 800, letterSpacing: 1 }}>{e.period}</div>
            <strong style={{ fontSize: 13, color: "#111" }}>{e.role}</strong>
            <div style={{ fontSize: 11.5, color: "#555", fontWeight: 600 }}>{e.company}</div>
            <p style={{ fontSize: 11.5, color: "#555", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
          </div>
        ))}

        <SplitTitleLight>Formation</SplitTitleLight>
        {data.educations.map((e) => (
          <div key={e.id} style={{ marginBottom: 8 }}>
            <strong style={{ fontSize: 12 }}>{e.degree}</strong>
            <div style={{ fontSize: 11, color: "#666" }}>{e.school} · {e.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
