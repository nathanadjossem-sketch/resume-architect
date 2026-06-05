import { font, type TemplateProps } from "./_shared";

export default function Editorial({ data, design }: TemplateProps) {
  const c = design.color;
  const serif = '"Playfair Display", Georgia, serif';
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: design.margins + 12, color: "#1a1a1a", background: "#fff" }}>
      <header style={{ borderBottom: "2px solid #1a1a1a", paddingBottom: 14, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>
          <span>Vol. 01 · Édition Spéciale</span>
          <span style={{ color: c }}>● Portfolio</span>
        </div>
        <h1 style={{ fontFamily: serif, fontSize: 64, fontWeight: 900, lineHeight: 0.95, margin: "10px 0 4px", letterSpacing: -2, color: "#0a0a0a" }}>
          {data.personal.firstName}<br /><em style={{ color: c, fontStyle: "italic", fontWeight: 400 }}>{data.personal.lastName}</em>
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <span style={{ fontSize: 13, fontStyle: "italic", color: "#444" }}>{data.personal.title}</span>
          <span style={{ fontSize: 10, color: "#666" }}>{data.personal.email} · {data.personal.phone}</span>
        </div>
      </header>

      {data.profile && (
        <section style={{ marginBottom: 22, position: "relative", paddingLeft: 48 }}>
          <span style={{ position: "absolute", left: 0, top: -20, fontFamily: serif, fontSize: 90, color: c, lineHeight: 1, fontWeight: 900 }}>“</span>
          <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.5, color: "#222", fontStyle: "italic" }}>{data.profile}</p>
        </section>
      )}

      <h2 style={{ fontFamily: serif, fontSize: 22, fontWeight: 800, borderBottom: `3px double ${c}`, paddingBottom: 6, marginBottom: 12 }}>Parcours</h2>
      <div style={{ columnCount: 3, columnGap: 16, fontSize: 10.5, lineHeight: 1.55, color: "#333" }}>
        {data.experiences.map((e) => (
          <div key={e.id} style={{ breakInside: "avoid", marginBottom: 12 }}>
            <div style={{ fontFamily: serif, fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{e.role}</div>
            <div style={{ fontSize: 9.5, color: c, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{e.company} — {e.period}</div>
            <p style={{ marginTop: 4 }}>{e.description}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18, borderTop: "1px solid #ddd", paddingTop: 14 }}>
        <div>
          <h3 style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Formation</h3>
          {data.educations.map((e) => (
            <div key={e.id} style={{ fontSize: 11, marginBottom: 4 }}>
              <strong>{e.degree}</strong> <span style={{ color: "#666" }}>— {e.school}, {e.period}</span>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Compétences & Langues</h3>
          <p style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>
            <span style={{ color: c, fontWeight: 700 }}>SKILLS · </span>{data.skills.map((s) => s.name).join(", ")}
          </p>
          {data.languages.length > 0 && (
            <p style={{ fontSize: 11, color: "#444", lineHeight: 1.6, marginTop: 4 }}>
              <span style={{ color: c, fontWeight: 700 }}>LANGUES · </span>{data.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
