import { font, type TemplateProps } from "./_shared";

export default function Timeline({ data, design }: TemplateProps) {
  const c = design.color;
  const Row = ({ left, dot = true, children }: { left: string; dot?: boolean; children: React.ReactNode }) => (
    <div style={{ display: "grid", gridTemplateColumns: "78px 1fr", gap: 18, marginBottom: 14, position: "relative" }}>
      <div style={{ fontSize: 10, color: c, fontWeight: 800, textAlign: "right", paddingTop: 3, letterSpacing: 0.5 }}>{left}</div>
      <div style={{ position: "relative", borderLeft: `2px solid ${c}30`, paddingLeft: 18 }}>
        {dot && (
          <span style={{ position: "absolute", left: -6, top: 4, width: 10, height: 10, borderRadius: "50%", background: "#ffffff", border: `2px solid ${c}` }} />
        )}
        {children}
      </div>
    </div>
  );
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: design.margins + 12, color: "#222", background: "#ffffff" }}>
      <header style={{ marginBottom: 28, paddingBottom: 14, borderBottom: `1px solid ${c}30` }}>
        <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1, color: "#111", lineHeight: 1 }}>{data.personal.firstName} {data.personal.lastName}</h1>
        <p style={{ fontSize: 14, color: c, fontWeight: 600, marginTop: 6 }}>{data.personal.title}</p>
        <p style={{ fontSize: 11, color: "#666", marginTop: 8 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).join("  ·  ")}
        </p>
      </header>

      {data.profile && (
        <Row left="PROFIL" dot={false}>
          <p style={{ fontSize: 12, color: "#444", lineHeight: 1.65 }}>{data.profile}</p>
        </Row>
      )}

      <h2 style={{ fontSize: 11, color: c, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", margin: "20px 0 14px" }}>— Expérience</h2>
      {data.experiences.map((e) => (
        <Row key={e.id} left={e.period}>
          <strong style={{ fontSize: 13, color: "#111" }}>{e.role}</strong>
          <div style={{ fontSize: 11.5, color: c, fontWeight: 600 }}>{e.company}</div>
          <p style={{ fontSize: 11.5, color: "#555", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
        </Row>
      ))}

      <h2 style={{ fontSize: 11, color: c, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", margin: "20px 0 14px" }}>— Formation</h2>
      {data.educations.map((e) => (
        <Row key={e.id} left={e.period}>
          <strong style={{ fontSize: 12 }}>{e.degree}</strong>
          <div style={{ fontSize: 11, color: "#666" }}>{e.school}</div>
        </Row>
      ))}

      <Row left="SKILLS" dot={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {data.skills.map((s) => (
            <span key={s.id} style={{ fontSize: 11, color: "#333", borderBottom: `2px solid ${c}` }}>{s.name}</span>
          ))}
        </div>
      </Row>
      {data.languages.length > 0 && (
        <Row left="LANGUES" dot={false}>
          <p style={{ fontSize: 11.5, color: "#444" }}>{data.languages.map((l) => `${l.name} (${l.level})`).join("  ·  ")}</p>
        </Row>
      )}
    </div>
  );
}
