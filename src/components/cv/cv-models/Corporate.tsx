import { font, Initials, type TemplateProps } from "./_shared";

const CorpSide = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 18 }}>
    <h2 style={{ fontSize: 11, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10, paddingBottom: 4, borderBottom: `1px solid ${accent}55` }}>{title}</h2>
    {children}
  </section>
);
const CorpMain = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 13, fontWeight: 800, color: "#111", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: 24, height: 3, background: accent }} />{title}
    </h2>
    {children}
  </section>
);

export default function Corporate({ data, design }: TemplateProps) {
  const c = design.color;
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: 0, color: "#1f2937" }}>
      <header style={{ background: c, padding: `${design.margins + 8}px ${design.margins + 16}px`, color: "#ffffff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Initials data={data} color="rgba(255,255,255,0.18)" size={92} fontSize={30} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.05 }}>{data.personal.firstName} {data.personal.lastName}</h1>
            <p style={{ fontSize: 14, opacity: 0.92, marginTop: 6, fontWeight: 500 }}>{data.personal.title}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 12, fontSize: 11, opacity: 0.92 }}>
              {data.personal.email && <span>✉ {data.personal.email}</span>}
              {data.personal.phone && <span>☎ {data.personal.phone}</span>}
              {data.personal.location && <span>◉ {data.personal.location}</span>}
              {data.personal.website && <span>↗ {data.personal.website}</span>}
            </div>
          </div>
        </div>
      </header>

      <div style={{ padding: design.margins + 8, display: "grid", gridTemplateColumns: "1fr 2.1fr", gap: 26 }}>
        <aside>
          <CorpSide title="Compétences" accent={c}>
            {data.skills.map((s) => (
              <div key={s.id} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 3 }}>{s.name}</div>
                <div style={{ background: "#e5e7eb", height: 4, borderRadius: 2 }}>
                  <div style={{ background: c, width: `${(s.level / 5) * 100}%`, height: "100%", borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </CorpSide>
          {data.languages.length > 0 && (
            <CorpSide title="Langues" accent={c}>
              {data.languages.map((l) => (
                <div key={l.id} style={{ fontSize: 11, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ color: "#666" }}>{l.level}</span>
                </div>
              ))}
            </CorpSide>
          )}
          {data.interests.length > 0 && (
            <CorpSide title="Centres d'intérêt" accent={c}>
              <p style={{ fontSize: 11, color: "#555", lineHeight: 1.7 }}>{data.interests.join(" · ")}</p>
            </CorpSide>
          )}
        </aside>
        <main>
          {data.profile && (
            <CorpMain title="Profil" accent={c}>
              <p style={{ fontSize: 12, color: "#444", lineHeight: 1.65 }}>{data.profile}</p>
            </CorpMain>
          )}
          <CorpMain title="Expérience professionnelle" accent={c}>
            {data.experiences.map((e) => (
              <div key={e.id} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `3px solid ${c}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ fontSize: 13 }}>{e.role}</strong>
                  <span style={{ fontSize: 10.5, color: "#666", fontWeight: 600 }}>{e.period}</span>
                </div>
                <div style={{ fontSize: 11.5, color: c, fontWeight: 600 }}>{e.company}</div>
                <p style={{ fontSize: 11.5, color: "#555", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
              </div>
            ))}
          </CorpMain>
          <CorpMain title="Formation" accent={c}>
            {data.educations.map((e) => (
              <div key={e.id} style={{ marginBottom: 8 }}>
                <strong style={{ fontSize: 12 }}>{e.degree}</strong>
                <div style={{ fontSize: 11, color: "#555" }}>{e.school} · {e.period}</div>
              </div>
            ))}
          </CorpMain>
        </main>
      </div>
    </div>
  );
}
