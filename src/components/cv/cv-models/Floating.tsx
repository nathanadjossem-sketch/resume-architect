import type { CSSProperties } from "react";
import { font, Initials, type TemplateProps } from "./_shared";

const FloatTitle = ({ children, accent }: { children: React.ReactNode; accent: string }) => (
  <h2 style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{children}</h2>
);

export default function Floating({ data, design }: TemplateProps) {
  const c = design.color;
  const card: CSSProperties = {
    background: "#ffffff", borderRadius: 14, padding: 16,
    boxShadow: "0 6px 20px -10px rgba(15,23,42,0.18), 0 2px 4px -2px rgba(15,23,42,0.06)",
    marginBottom: 14,
  };
  return (
    <div className="cv-page" style={{ background: "#f4f5f8", fontFamily: font(design), padding: design.margins, color: "#1f2937" }}>
      <div style={{ ...card, display: "flex", alignItems: "center", gap: 18, padding: 20 }}>
        <Initials data={data} color={c} size={72} fontSize={24} />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", letterSpacing: -0.3 }}>{data.personal.firstName} {data.personal.lastName}</h1>
          <p style={{ fontSize: 13, color: c, fontWeight: 600, marginTop: 2 }}>{data.personal.title}</p>
          <p style={{ fontSize: 10.5, color: "#666", marginTop: 6 }}>
            {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("   •   ")}
          </p>
        </div>
      </div>

      {data.profile && (
        <div style={card}>
          <FloatTitle accent={c}>Profil</FloatTitle>
          <p style={{ fontSize: 12, color: "#444", lineHeight: 1.65 }}>{data.profile}</p>
        </div>
      )}

      <div style={card}>
        <FloatTitle accent={c}>Expériences</FloatTitle>
        {data.experiences.map((e) => (
          <div key={e.id} style={{ marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: 13 }}>{e.role}</strong>
              <span style={{ fontSize: 10.5, background: `${c}15`, color: c, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{e.period}</span>
            </div>
            <div style={{ fontSize: 11.5, color: c, fontWeight: 600 }}>{e.company}</div>
            <p style={{ fontSize: 11.5, color: "#555", marginTop: 4, lineHeight: 1.55 }}>{e.description}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={card}>
          <FloatTitle accent={c}>Formation</FloatTitle>
          {data.educations.map((e) => (
            <div key={e.id} style={{ marginBottom: 6 }}>
              <strong style={{ fontSize: 12 }}>{e.degree}</strong>
              <div style={{ fontSize: 11, color: "#666" }}>{e.school} · {e.period}</div>
            </div>
          ))}
        </div>
        <div style={card}>
          <FloatTitle accent={c}>Compétences</FloatTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {data.skills.map((s) => (
              <span key={s.id} style={{ background: "#f1f5f9", color: "#1f2937", padding: "3px 9px", borderRadius: 999, fontSize: 11 }}>{s.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
