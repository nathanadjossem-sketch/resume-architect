import { font, Initials, type TemplateProps } from "./_shared";

const DiagTitle = ({ c, children }: { c: string; children: React.ReactNode }) => (
  <h2 style={{ fontSize: 12, fontWeight: 800, color: c, textTransform: "uppercase", letterSpacing: 2, margin: "16px 0 10px", borderLeft: `4px solid ${c}`, paddingLeft: 8 }}>{children}</h2>
);

export default function Diagonal({ data, design }: TemplateProps) {
  const petrol = design.color || "#0e4f5c";
  return (
    <div className="cv-page" style={{ fontFamily: font(design), padding: 0, color: "#1a1a1a", position: "relative", background: "#fff" }}>
      <div style={{ position: "relative", height: 240, background: petrol, clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)", color: "#fff", padding: `${design.margins + 12}px ${design.margins + 16}px` }}>
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <Initials data={data} color="rgba(255,255,255,0.2)" size={88} fontSize={28} />
          <div>
            <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 4, textTransform: "uppercase" }}>Curriculum</div>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.05, marginTop: 4 }}>
              {data.personal.firstName}<br />{data.personal.lastName}
            </h1>
            <div style={{ fontSize: 13, marginTop: 6, opacity: 0.92, fontWeight: 500 }}>{data.personal.title}</div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 50, right: design.margins + 16, fontSize: 10.5, textAlign: "right", lineHeight: 1.7 }}>
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
        </div>
      </div>

      <div style={{ padding: `0 ${design.margins + 16}px ${design.margins + 16}px`, marginTop: -10 }}>
        {data.profile && (
          <section style={{ marginBottom: 18 }}>
            <DiagTitle c={petrol}>Profil</DiagTitle>
            <p style={{ fontSize: 12, lineHeight: 1.65, color: "#333" }}>{data.profile}</p>
          </section>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          <div>
            <DiagTitle c={petrol}>Expérience</DiagTitle>
            {data.experiences.map((e) => (
              <div key={e.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 13 }}>{e.role}</strong>
                  <span style={{ fontSize: 10.5, color: petrol, fontWeight: 700 }}>{e.period}</span>
                </div>
                <div style={{ fontSize: 11.5, color: petrol, fontWeight: 600 }}>{e.company}</div>
                <p style={{ fontSize: 11.5, color: "#444", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
              </div>
            ))}
            <DiagTitle c={petrol}>Formation</DiagTitle>
            {data.educations.map((e) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <strong style={{ fontSize: 12 }}>{e.degree}</strong>
                <div style={{ fontSize: 11, color: "#555" }}>{e.school} · {e.period}</div>
              </div>
            ))}
          </div>
          <div>
            <DiagTitle c={petrol}>Compétences</DiagTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {data.skills.map((s) => (
                <span key={s.id} style={{ background: petrol, color: "#fff", padding: "2px 8px", fontSize: 10.5, fontWeight: 600, clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}>{s.name}</span>
              ))}
            </div>
            {data.languages.length > 0 && (
              <>
                <DiagTitle c={petrol}>Langues</DiagTitle>
                {data.languages.map((l) => (
                  <div key={l.id} style={{ fontSize: 11, marginBottom: 3 }}><strong>{l.name}</strong> — <span style={{ color: "#666" }}>{l.level}</span></div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
