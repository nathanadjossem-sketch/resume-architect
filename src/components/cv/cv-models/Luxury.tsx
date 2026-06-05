import { font, type TemplateProps } from "./_shared";

const LuxBox = ({ title, gold, card, children }: { title: string; gold: string; card: string; children: React.ReactNode }) => (
  <section style={{ border: `1px solid ${gold}55`, background: card, padding: 14, marginBottom: 12 }}>
    <h2 style={{ fontSize: 10, color: gold, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${gold}33`, fontWeight: 600 }}>◆ {title}</h2>
    {children}
  </section>
);

export default function Luxury({ data, design }: TemplateProps) {
  const gold = "#c9a96e";
  const bg = "#161616";
  const card = "#1f1f1f";
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: design.margins + 12, background: bg, color: "#e8e4dc" }}>
      <header style={{ border: `1px solid ${gold}`, padding: 22, marginBottom: 20, textAlign: "center", background: card }}>
        <div style={{ fontSize: 9, color: gold, letterSpacing: 8, textTransform: "uppercase" }}>★ Curriculum Vitae ★</div>
        <h1 style={{ fontSize: 34, fontWeight: 300, margin: "12px 0 4px", letterSpacing: 3, color: "#fff" }}>
          {data.personal.firstName.toUpperCase()} <span style={{ color: gold, fontWeight: 600 }}>{data.personal.lastName.toUpperCase()}</span>
        </h1>
        <div style={{ width: 60, height: 1, background: gold, margin: "10px auto" }} />
        <div style={{ fontSize: 12, color: gold, fontStyle: "italic", letterSpacing: 2 }}>{data.personal.title}</div>
        <div style={{ fontSize: 10.5, color: "#aaa", marginTop: 10, letterSpacing: 1 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).join("  ◆  ")}
        </div>
      </header>

      {data.profile && (
        <LuxBox title="Profil" gold={gold} card={card}>
          <p style={{ fontSize: 11.5, lineHeight: 1.7, color: "#cfc9bd", fontWeight: 300 }}>{data.profile}</p>
        </LuxBox>
      )}
      <LuxBox title="Expérience" gold={gold} card={card}>
        {data.experiences.map((e) => (
          <div key={e.id} style={{ marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${gold}33` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontSize: 13, color: "#fff", letterSpacing: 0.5 }}>{e.role}</strong>
              <span style={{ fontSize: 10, color: gold, letterSpacing: 1 }}>{e.period}</span>
            </div>
            <div style={{ fontSize: 11, color: gold, fontStyle: "italic" }}>{e.company}</div>
            <p style={{ fontSize: 11, color: "#bdb7ab", marginTop: 4, lineHeight: 1.6, fontWeight: 300 }}>{e.description}</p>
          </div>
        ))}
      </LuxBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <LuxBox title="Formation" gold={gold} card={card}>
          {data.educations.map((e) => (
            <div key={e.id} style={{ marginBottom: 6 }}>
              <strong style={{ fontSize: 12, color: "#fff" }}>{e.degree}</strong>
              <div style={{ fontSize: 10.5, color: "#aaa" }}>{e.school} · {e.period}</div>
            </div>
          ))}
        </LuxBox>
        <LuxBox title="Compétences" gold={gold} card={card}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {data.skills.map((s) => (
              <span key={s.id} style={{ border: `1px solid ${gold}`, color: gold, padding: "2px 7px", fontSize: 10, letterSpacing: 0.5 }}>{s.name}</span>
            ))}
          </div>
        </LuxBox>
      </div>
      {data.languages.length > 0 && (
        <LuxBox title="Langues" gold={gold} card={card}>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {data.languages.map((l) => (
              <div key={l.id} style={{ fontSize: 11, color: "#cfc9bd" }}>
                {l.name} <span style={{ color: gold }}>· {l.level}</span>
              </div>
            ))}
          </div>
        </LuxBox>
      )}
    </div>
  );
}
