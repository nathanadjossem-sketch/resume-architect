import { font, type TemplateProps } from "./_shared";

const NeonTitle = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <h2 style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: 3, textTransform: "uppercase", margin: "16px 0 10px", borderBottom: `1px dashed ${color}66`, paddingBottom: 4 }}>{children}</h2>
);

export default function Neon({ data, design }: TemplateProps) {
  const cyan = "#22d3ee";
  const magenta = "#ec4899";
  const bg = "#0b0f14";
  const txt = "#f1f5f9";
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: design.margins + 8, background: bg, color: txt }}>
      <header style={{ borderBottom: `1px solid ${cyan}`, paddingBottom: 14, marginBottom: 18, position: "relative" }}>
        <div style={{ fontSize: 10, color: cyan, letterSpacing: 6, textTransform: "uppercase" }}>// profile_v2.exe</div>
        <h1 style={{ fontSize: 38, fontWeight: 900, margin: "6px 0", letterSpacing: -1, color: "#fff" }}>
          {data.personal.firstName} <span style={{ color: magenta }}>{data.personal.lastName}</span>
        </h1>
        <div style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>{data.personal.title}</div>
        <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 10.5, color: "#94a3b8" }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).map((v, i) => (
            <span key={i}>{v}</span>
          ))}
        </div>
      </header>

      {data.profile && (
        <section style={{ marginBottom: 18, padding: 12, border: `1px solid ${magenta}55`, background: "rgba(236,72,153,0.05)" }}>
          <div style={{ fontSize: 10, color: magenta, letterSpacing: 3, marginBottom: 6 }}>▮ PROFIL</div>
          <p style={{ fontSize: 11.5, lineHeight: 1.6, color: "#e2e8f0" }}>{data.profile}</p>
        </section>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 22 }}>
        <div>
          <NeonTitle color={cyan}>Expérience</NeonTitle>
          {data.experiences.map((e) => (
            <div key={e.id} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `2px solid ${cyan}` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 12.5, color: "#fff" }}>{e.role}</strong>
                <span style={{ fontSize: 10, color: magenta, fontWeight: 700 }}>{e.period}</span>
              </div>
              <div style={{ fontSize: 11, color: cyan }}>{e.company}</div>
              <p style={{ fontSize: 11, color: "#cbd5e1", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
            </div>
          ))}
          <NeonTitle color={cyan}>Formation</NeonTitle>
          {data.educations.map((e) => (
            <div key={e.id} style={{ marginBottom: 6 }}>
              <strong style={{ fontSize: 12, color: "#fff" }}>{e.degree}</strong>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{e.school} · {e.period}</div>
            </div>
          ))}
        </div>
        <div>
          <NeonTitle color={magenta}>Skills</NeonTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {data.skills.map((s) => (
              <span key={s.id} style={{ background: "rgba(34,211,238,0.1)", border: `1px solid ${cyan}`, color: cyan, padding: "2px 8px", fontSize: 10, fontWeight: 600, borderRadius: 2 }}>{s.name}</span>
            ))}
          </div>
          {data.languages.length > 0 && (
            <>
              <NeonTitle color={magenta}>Langues</NeonTitle>
              {data.languages.map((l) => (
                <div key={l.id} style={{ fontSize: 11, display: "flex", justifyContent: "space-between", color: "#cbd5e1", marginBottom: 3 }}>
                  <span>{l.name}</span><span style={{ color: magenta }}>{l.level}</span>
                </div>
              ))}
            </>
          )}
          {data.interests.length > 0 && (
            <>
              <NeonTitle color={magenta}>Intérêts</NeonTitle>
              <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.7 }}>{data.interests.join(" · ")}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
