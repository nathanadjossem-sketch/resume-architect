import { font, type TemplateProps } from "./_shared";

const NordicSection = ({ title, color, children }: { title: string; color: string; children: React.ReactNode }) => (
  <section style={{ marginTop: 18 }}>
    <h2 style={{ fontSize: 10.5, fontWeight: 700, color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{title}</h2>
    {children}
  </section>
);
const NordicMain = ({ title, color, sage, children }: { title: string; color: string; sage: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 13, fontWeight: 700, color: "#2a2a2a", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: sage }} />{title}
    </h2>
    {children}
  </section>
);

export default function Minimalist({ data, design }: TemplateProps) {
  const sage = "#a3b18a";
  const sageBg = "#e8ede2";
  const terra = design.color || "#c2724a";
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: 0, color: "#2a2a2a", background: "#faf8f4" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", minHeight: "297mm" }}>
        <aside style={{ background: sageBg, padding: design.margins + 4 }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: sage, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, marginBottom: 18 }}>
            {data.personal.firstName?.[0]}{data.personal.lastName?.[0]}
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#2a2a2a", lineHeight: 1.15 }}>{data.personal.firstName} {data.personal.lastName}</h1>
          <div style={{ background: terra, color: "#fff", display: "inline-block", padding: "3px 10px", fontSize: 11, marginTop: 8, fontWeight: 600 }}>{data.personal.title}</div>

          <NordicSection title="Contact" color={terra}>
            <ul style={{ fontSize: 10.5, color: "#444", lineHeight: 1.8 }}>
              {data.personal.email && <li>{data.personal.email}</li>}
              {data.personal.phone && <li>{data.personal.phone}</li>}
              {data.personal.location && <li>{data.personal.location}</li>}
              {data.personal.website && <li>{data.personal.website}</li>}
            </ul>
          </NordicSection>

          <NordicSection title="Compétences" color={terra}>
            {data.skills.map((s) => (
              <div key={s.id} style={{ marginBottom: 7 }}>
                <div style={{ fontSize: 10.5, marginBottom: 3, color: "#333" }}>{s.name}</div>
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} style={{ height: 5, flex: 1, background: i < s.level ? terra : "#d8d3c8" }} />
                  ))}
                </div>
              </div>
            ))}
          </NordicSection>

          {data.languages.length > 0 && (
            <NordicSection title="Langues" color={terra}>
              {data.languages.map((l) => (
                <div key={l.id} style={{ fontSize: 11, marginBottom: 3 }}>
                  <strong>{l.name}</strong> <span style={{ color: "#777" }}>· {l.level}</span>
                </div>
              ))}
            </NordicSection>
          )}
        </aside>

        <main style={{ padding: design.margins + 4 }}>
          {data.profile && (
            <NordicMain title="Profil" color={terra} sage={sage}>
              <p style={{ fontSize: 12, color: "#444", lineHeight: 1.65 }}>{data.profile}</p>
            </NordicMain>
          )}
          <NordicMain title="Expérience" color={terra} sage={sage}>
            {data.experiences.map((e) => (
              <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ fontSize: 13, color: "#2a2a2a" }}>{e.role}</strong>
                  <span style={{ fontSize: 10.5, color: sage, fontWeight: 700 }}>{e.period}</span>
                </div>
                <div style={{ fontSize: 11.5, color: terra, fontWeight: 600 }}>{e.company}</div>
                <p style={{ fontSize: 11.5, color: "#555", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
              </div>
            ))}
          </NordicMain>
          <NordicMain title="Formation" color={terra} sage={sage}>
            {data.educations.map((e) => (
              <div key={e.id} style={{ marginBottom: 8 }}>
                <strong style={{ fontSize: 12 }}>{e.degree}</strong>
                <div style={{ fontSize: 11, color: "#666" }}>{e.school} · {e.period}</div>
              </div>
            ))}
          </NordicMain>
        </main>
      </div>
    </div>
  );
}
