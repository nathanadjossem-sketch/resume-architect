import { font, type TemplateProps } from "./_shared";

const BoldDivider = ({ c }: { c: string }) => (
  <div style={{ display: "flex", margin: "18px 0 14px" }}>
    <div style={{ height: 3, background: "#0a0a0a", flex: 2 }} />
    <div style={{ height: 3, background: c, flex: 1 }} />
  </div>
);
const BoldTitle = ({ c, children }: { c: string; children: React.ReactNode }) => (
  <h2 style={{ fontSize: 11, fontWeight: 800, color: c, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>{children}</h2>
);

export default function BoldHeader({ data, design }: TemplateProps) {
  const c = design.color;
  const black = "#0a0a0a";
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: design.margins + 12, color: black }}>
      <header style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: c, letterSpacing: 4, textTransform: "uppercase" }}>{data.personal.title}</div>
        <h1 style={{ fontSize: 64, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3, margin: "6px 0", color: black }}>
          {data.personal.firstName}<br />{data.personal.lastName}.
        </h1>
        <div style={{ display: "flex", marginTop: 14 }}>
          <div style={{ height: 6, background: black, flex: 1 }} />
          <div style={{ height: 6, background: c, flex: 1 }} />
        </div>
        <p style={{ fontSize: 11, color: "#444", marginTop: 10 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).join("   /   ")}
        </p>
      </header>

      {data.profile && (
        <section style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 14, color: "#222", lineHeight: 1.55, fontWeight: 500 }}>{data.profile}</p>
        </section>
      )}

      <BoldDivider c={c} />
      <BoldTitle c={c}>Expérience</BoldTitle>
      {data.experiences.map((e) => (
        <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: c, fontWeight: 800, letterSpacing: 1 }}>{e.period}</div>
            <div style={{ fontSize: 12, color: "#111", fontWeight: 800, marginTop: 2 }}>{e.company}</div>
          </div>
          <div>
            <strong style={{ fontSize: 16, color: black, fontWeight: 800, letterSpacing: -0.3 }}>{e.role}</strong>
            <p style={{ fontSize: 11.5, color: "#444", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
          </div>
        </div>
      ))}

      <BoldDivider c={c} />
      <BoldTitle c={c}>Formation</BoldTitle>
      {data.educations.map((e) => (
        <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: c, fontWeight: 800 }}>{e.period}</div>
          <div>
            <strong style={{ fontSize: 13 }}>{e.degree}</strong>
            <div style={{ fontSize: 11, color: "#555" }}>{e.school}</div>
          </div>
        </div>
      ))}

      <BoldDivider c={c} />
      <BoldTitle c={c}>Compétences</BoldTitle>
      <p style={{ fontSize: 14, color: "#222", fontWeight: 600, lineHeight: 1.7 }}>{data.skills.map((s) => s.name).join("   ·   ")}</p>
      {data.languages.length > 0 && (
        <>
          <BoldDivider c={c} />
          <BoldTitle c={c}>Langues</BoldTitle>
          <p style={{ fontSize: 13, color: "#222" }}>{data.languages.map((l) => `${l.name} — ${l.level}`).join("   /   ")}</p>
        </>
      )}
    </div>
  );
}
