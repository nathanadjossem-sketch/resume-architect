import { font, type TemplateProps } from "./_shared";

const ZenBox = ({ title, brick, children }: { title: string; brick: string; children: React.ReactNode }) => (
  <section style={{ border: `1px solid ${brick}`, padding: 14, marginBottom: 14, position: "relative" }}>
    <span style={{ position: "absolute", top: -8, left: 14, background: "#f5efe4", padding: "0 8px", fontSize: 10, color: brick, letterSpacing: 3, textTransform: "uppercase" }}>{title}</span>
    {children}
  </section>
);

export default function Zen({ data, design }: TemplateProps) {
  const brick = "#a23b2a";
  const bg = "#f5efe4";
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: design.margins + 16, background: bg, color: "#2a241e" }}>
      <header style={{ textAlign: "center", marginBottom: 26 }}>
        <div style={{ fontSize: 9, color: brick, letterSpacing: 8, textTransform: "uppercase" }}>履 歴 書</div>
        <h1 style={{ fontSize: 30, fontWeight: 300, margin: "12px 0 4px", letterSpacing: 4, color: "#2a241e" }}>{data.personal.firstName} {data.personal.lastName}</h1>
        <div style={{ fontSize: 11.5, color: "#6b5f50", letterSpacing: 2, fontStyle: "italic" }}>{data.personal.title}</div>
        <div style={{ width: 40, height: 1, background: brick, margin: "14px auto" }} />
        <div style={{ fontSize: 10.5, color: "#6b5f50", display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).join(" · ")}
        </div>
      </header>

      {data.profile && (
        <ZenBox title="Profil" brick={brick}>
          <p style={{ fontSize: 11.5, lineHeight: 1.75, color: "#3a3329", fontWeight: 300 }}>{data.profile}</p>
        </ZenBox>
      )}
      <ZenBox title="Expérience" brick={brick}>
        {data.experiences.map((e) => (
          <div key={e.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontSize: 12.5, fontWeight: 500, color: "#2a241e" }}>{e.role}</strong>
              <span style={{ fontSize: 10, color: brick, letterSpacing: 1 }}>{e.period}</span>
            </div>
            <div style={{ fontSize: 11, color: "#6b5f50", fontStyle: "italic" }}>{e.company}</div>
            <p style={{ fontSize: 11, color: "#3a3329", marginTop: 4, lineHeight: 1.65, fontWeight: 300 }}>{e.description}</p>
          </div>
        ))}
      </ZenBox>
      <ZenBox title="Formation" brick={brick}>
        {data.educations.map((e) => (
          <div key={e.id} style={{ marginBottom: 6 }}>
            <strong style={{ fontSize: 12, fontWeight: 500 }}>{e.degree}</strong>
            <div style={{ fontSize: 10.5, color: "#6b5f50" }}>{e.school} · {e.period}</div>
          </div>
        ))}
      </ZenBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <ZenBox title="Compétences" brick={brick}>
          <p style={{ fontSize: 11, color: "#3a3329", lineHeight: 1.8, fontWeight: 300 }}>{data.skills.map((s) => s.name).join("  ·  ")}</p>
        </ZenBox>
        {data.languages.length > 0 && (
          <ZenBox title="Langues" brick={brick}>
            {data.languages.map((l) => (
              <div key={l.id} style={{ fontSize: 11, color: "#3a3329", marginBottom: 3, fontWeight: 300 }}>
                {l.name} — <span style={{ color: brick }}>{l.level}</span>
              </div>
            ))}
          </ZenBox>
        )}
      </div>
    </div>
  );
}
