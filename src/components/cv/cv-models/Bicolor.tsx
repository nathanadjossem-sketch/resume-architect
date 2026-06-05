import { font, Initials, type TemplateProps } from "./_shared";

const CyberSide = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
  <section style={{ marginTop: 22 }}>
    <h2 style={{
      fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
      color: accent, fontWeight: 800, marginBottom: 8,
      paddingBottom: 4, borderBottom: `2px solid ${accent}`,
    }}>
      {title}
    </h2>
    {children}
  </section>
);

const CyberMain = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 22 }}>
    <h2 style={{
      fontSize: 13, fontWeight: 800, color: "#0f172a", letterSpacing: 1.5,
      textTransform: "uppercase", marginBottom: 12, display: "inline-block",
      borderBottom: `4px solid ${accent}`, paddingBottom: 4,
    }}>
      {title}
    </h2>
    {children}
  </section>
);

export default function Bicolor({ data, design }: TemplateProps) {
  const sidebar = "#0f172a";
  const accent = design.color;
  return (
    <div className="cv-page" style={{ display: "flex", fontFamily: font(design), padding: 0 }}>
      <aside style={{ width: "33%", background: sidebar, color: "#f1f5f9", padding: design.margins + 4 }}>
        <Initials data={data} color={accent} fg="#0f172a" />
        <h1 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, marginTop: 18 }}>
          {data.personal.firstName}<br />{data.personal.lastName}
        </h1>
        <div style={{ width: 36, height: 3, background: accent, marginTop: 10 }} />
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10, letterSpacing: 0.5 }}>{data.personal.title}</p>

        <CyberSide title="Contact" accent={accent}>
          <ul style={{ fontSize: 10.5, lineHeight: 1.8, color: "#cbd5e1" }}>
            {data.personal.email && <li>{data.personal.email}</li>}
            {data.personal.phone && <li>{data.personal.phone}</li>}
            {data.personal.location && <li>{data.personal.location}</li>}
            {data.personal.website && <li>{data.personal.website}</li>}
          </ul>
        </CyberSide>

        <CyberSide title="Compétences" accent={accent}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {data.skills.map((s) => (
              <span key={s.id} style={{
                background: "rgba(255,255,255,0.06)", border: `1px solid ${accent}40`,
                color: "#e2e8f0", padding: "2px 8px", borderRadius: 3, fontSize: 10,
              }}>{s.name}</span>
            ))}
          </div>
        </CyberSide>

        {data.languages.length > 0 && (
          <CyberSide title="Langues" accent={accent}>
            <ul style={{ fontSize: 10.5, lineHeight: 1.8, color: "#cbd5e1" }}>
              {data.languages.map((l) => (
                <li key={l.id} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{l.name}</span><span style={{ color: accent }}>{l.level}</span>
                </li>
              ))}
            </ul>
          </CyberSide>
        )}

        {data.interests.length > 0 && (
          <CyberSide title="Intérêts" accent={accent}>
            <p style={{ fontSize: 10.5, color: "#cbd5e1", lineHeight: 1.7 }}>{data.interests.join(" · ")}</p>
          </CyberSide>
        )}
      </aside>

      <main style={{ width: "67%", padding: design.margins + 4, color: "#0f172a", background: "#ffffff" }}>
        {data.profile && (
          <CyberMain title="Profil" accent={accent}>
            <p style={{ fontSize: 12, lineHeight: 1.65, color: "#334155" }}>{data.profile}</p>
          </CyberMain>
        )}
        <CyberMain title="Expérience" accent={accent}>
          {data.experiences.map((e) => (
            <div key={e.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 13, color: "#0f172a" }}>{e.role}</strong>
                <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600, letterSpacing: 0.5 }}>{e.period}</span>
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: accent }}>{e.company}</div>
              <p style={{ fontSize: 11.5, color: "#475569", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
            </div>
          ))}
        </CyberMain>
        <CyberMain title="Formation" accent={accent}>
          {data.educations.map((e) => (
            <div key={e.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 12.5 }}>{e.degree}</strong>
                <span style={{ fontSize: 10, color: "#64748b" }}>{e.period}</span>
              </div>
              <div style={{ fontSize: 11, color: accent }}>{e.school}</div>
            </div>
          ))}
        </CyberMain>
      </main>
    </div>
  );
}
