import type { CSSProperties } from "react";
import { FONT_STACKS, type TemplateProps } from "./_shared";

const NoirTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 11, fontWeight: 600, color: "#0a0a0a", letterSpacing: 5,
    textTransform: "uppercase", margin: "22px 0 14px",
    textAlign: "center", position: "relative",
  }}>
    <span style={{ background: "#fdfcf9", padding: "0 14px", position: "relative", zIndex: 1 }}>{children}</span>
    <span style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "#222", zIndex: 0 }} />
  </h2>
);

export default function Classic({ data, design }: TemplateProps) {
  const dropCap: CSSProperties = {
    float: "left", fontFamily: FONT_STACKS.display,
    fontSize: 44, lineHeight: 0.9, marginRight: 8, marginTop: 2,
    color: "#0a0a0a", fontWeight: 700,
  };
  return (
    <div className="cv-page" style={{ fontFamily: FONT_STACKS.display, padding: design.margins + 20, color: "#111", background: "#fdfcf9" }}>
      <header style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 10, color: "#888", letterSpacing: 6, textTransform: "uppercase" }}>— Curriculum Vitae —</div>
        <h1 style={{ fontSize: 42, fontWeight: 400, marginTop: 10, color: "#0a0a0a", letterSpacing: 1 }}>
          {data.personal.firstName} <em style={{ fontWeight: 500 }}>{data.personal.lastName}</em>
        </h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 6 }}>
          <span style={{ width: 40, height: 1, background: "#555" }} />
          <span style={{ fontSize: 11, color: "#555", fontStyle: "italic", letterSpacing: 2 }}>{data.personal.title}</span>
          <span style={{ width: 40, height: 1, background: "#555" }} />
        </div>
        <p style={{ fontSize: 10.5, color: "#777", marginTop: 14, letterSpacing: 1 }}>
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("    ·    ")}
        </p>
      </header>

      {data.profile && (
        <section style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 12.5, color: "#333", lineHeight: 1.75, textAlign: "justify" }}>
            <span style={dropCap}>{data.profile[0]}</span>{data.profile.slice(1)}
          </p>
        </section>
      )}

      <NoirTitle>Expérience</NoirTitle>
      {data.experiences.map((e) => (
        <div key={e.id} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <strong style={{ fontSize: 14, fontWeight: 600 }}>{e.role}</strong>
            <span style={{ fontSize: 11, fontStyle: "italic", color: "#666" }}>{e.period}</span>
          </div>
          <div style={{ fontSize: 12, fontStyle: "italic", color: "#444" }}>{e.company}</div>
          <p style={{ fontSize: 12, color: "#333", marginTop: 5, lineHeight: 1.65 }}>{e.description}</p>
        </div>
      ))}

      <NoirTitle>Formation</NoirTitle>
      {data.educations.map((e) => (
        <div key={e.id} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ fontSize: 12.5 }}>{e.degree}</strong>
            <span style={{ fontSize: 11, fontStyle: "italic", color: "#666" }}>{e.period}</span>
          </div>
          <div style={{ fontSize: 11.5, fontStyle: "italic", color: "#555" }}>{e.school}</div>
        </div>
      ))}

      <NoirTitle>Compétences</NoirTitle>
      <p style={{ fontSize: 12, color: "#333", lineHeight: 1.8, textAlign: "center", fontStyle: "italic" }}>
        {data.skills.map((s) => s.name).join("   ·   ")}
      </p>

      {data.languages.length > 0 && (
        <>
          <NoirTitle>Langues</NoirTitle>
          <p style={{ fontSize: 12, color: "#333", textAlign: "center", fontStyle: "italic" }}>
            {data.languages.map((l) => `${l.name} (${l.level})`).join("   ·   ")}
          </p>
        </>
      )}
    </div>
  );
}
