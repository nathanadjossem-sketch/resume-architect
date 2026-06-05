import { font, type TemplateProps } from "./_shared";

const GeomTitle = ({ accent, children }: { accent: string; children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 11, fontWeight: 900, color: "#0a0a0a", letterSpacing: 3,
    textTransform: "uppercase", margin: "18px 0 12px",
    display: "inline-block", borderBottom: `3px solid ${accent}`, paddingBottom: 3,
  }}>{children}</h2>
);

export default function Creative({ data, design }: TemplateProps) {
  const c = design.color;
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: 0, color: "#111", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 240, height: 180, background: c, clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 140, height: 140, background: "#0a0a0a", clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

      <header style={{ position: "relative", padding: design.margins + 20, paddingBottom: 26 }}>
        <div style={{ fontSize: 11, color: c, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>Curriculum Vitae</div>
        <h1 style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, marginTop: 8, letterSpacing: -1.5, color: "#0a0a0a" }}>
          {data.personal.firstName}<br />
          <span style={{ background: "#0a0a0a", color: c, padding: "0 12px" }}>{data.personal.lastName}</span>
        </h1>
        <p style={{ fontSize: 13, color: "#444", marginTop: 14, fontWeight: 600 }}>{data.personal.title}</p>
      </header>

      <div style={{ padding: `0 ${design.margins + 20}px ${design.margins + 20}px`, position: "relative" }}>
        <div style={{ display: "flex", gap: 12, fontSize: 10.5, color: "#222", borderTop: "2px solid #0a0a0a", borderBottom: `4px solid ${c}`, padding: "10px 0", marginBottom: 22 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).map((v, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span>{v}</span>{i < arr.length - 1 && <span style={{ color: c, fontWeight: 900 }}>◆</span>}
            </span>
          ))}
        </div>

        {data.profile && (
          <div style={{ position: "relative", marginBottom: 22, padding: "12px 16px", background: "#fafafa", borderLeft: `6px solid ${c}` }}>
            <p style={{ fontSize: 12, color: "#222", lineHeight: 1.6 }}>{data.profile}</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24 }}>
          <div>
            <GeomTitle accent={c}>Expériences</GeomTitle>
            {data.experiences.map((e) => (
              <div key={e.id} style={{ marginBottom: 14, position: "relative", paddingLeft: 18 }}>
                <span style={{ position: "absolute", left: 0, top: 5, width: 10, height: 10, background: c, transform: "rotate(45deg)" }} />
                <strong style={{ fontSize: 13, color: "#0a0a0a" }}>{e.role}</strong>
                <div style={{ fontSize: 11, color: "#555" }}>
                  <span style={{ background: "#0a0a0a", color: c, padding: "1px 6px", fontWeight: 700, marginRight: 6 }}>{e.company}</span>{e.period}
                </div>
                <p style={{ fontSize: 11.5, color: "#444", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
              </div>
            ))}
            <GeomTitle accent={c}>Formation</GeomTitle>
            {data.educations.map((e) => (
              <div key={e.id} style={{ marginBottom: 8 }}>
                <strong style={{ fontSize: 12 }}>{e.degree}</strong>
                <div style={{ fontSize: 11, color: "#555" }}>{e.school} · {e.period}</div>
              </div>
            ))}
          </div>
          <div>
            <GeomTitle accent={c}>Skills</GeomTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {data.skills.map((s) => (
                <span key={s.id} style={{ background: "#0a0a0a", color: c, padding: "3px 9px", fontSize: 10.5, fontWeight: 700, clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}>{s.name}</span>
              ))}
            </div>
            {data.languages.length > 0 && (
              <>
                <GeomTitle accent={c}>Langues</GeomTitle>
                <ul style={{ fontSize: 11, color: "#333", lineHeight: 1.8 }}>
                  {data.languages.map((l) => (
                    <li key={l.id}><strong>{l.name}</strong> — <span style={{ color: "#666" }}>{l.level}</span></li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
