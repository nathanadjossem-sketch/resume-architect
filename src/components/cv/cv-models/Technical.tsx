import type { CSSProperties } from "react";
import { FONT_STACKS, type TemplateProps } from "./_shared";

export default function Technical({ data, design }: TemplateProps) {
  const c = design.color;
  const cell: CSSProperties = { border: "1px solid #e2e8f0", padding: 10 };
  return (
    <div className="cv-page" style={{ fontFamily: FONT_STACKS.mono, padding: design.margins, color: "#0f172a", background: "#f8fafc" }}>
      <header style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 0, border: "1px solid #cbd5e1", marginBottom: 10 }}>
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 10, color: c, fontWeight: 700 }}>// PROFILE.json</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginTop: 4 }}>{data.personal.firstName}.{data.personal.lastName}</h1>
          <p style={{ fontSize: 11.5, color: "#475569", marginTop: 2 }}>&gt; {data.personal.title}</p>
        </div>
        <div style={{ borderLeft: "1px solid #cbd5e1", padding: 14, background: "#ffffff", minWidth: 200, fontSize: 10.5, color: "#475569", lineHeight: 1.7 }}>
          <div>email: <span style={{ color: c }}>{data.personal.email}</span></div>
          <div>phone: <span style={{ color: c }}>{data.personal.phone}</span></div>
          <div>loc:   <span style={{ color: c }}>{data.personal.location}</span></div>
          {data.personal.website && <div>url:   <span style={{ color: c }}>{data.personal.website}</span></div>}
        </div>
      </header>

      {data.profile && (
        <div style={{ ...cell, background: "#ffffff", marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: c, fontWeight: 700, marginBottom: 4 }}># README</div>
          <p style={{ fontSize: 11, color: "#334155", lineHeight: 1.6 }}>{data.profile}</p>
        </div>
      )}

      <div style={{ ...cell, background: "#ffffff", marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: c, fontWeight: 700, marginBottom: 6 }}># STACK</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {data.skills.map((s) => (
            <span key={s.id} style={{ background: "#0f172a", color: "#a5f3fc", padding: "2px 7px", fontSize: 10, borderRadius: 3, border: `1px solid ${c}` }}>{s.name}:{s.level}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 10 }}>
        <div style={{ ...cell, background: "#ffffff" }}>
          <div style={{ fontSize: 10, color: c, fontWeight: 700, marginBottom: 8 }}># EXPERIENCE</div>
          {data.experiences.map((e) => (
            <div key={e.id} style={{ marginBottom: 10, paddingBottom: 8, borderBottom: "1px dashed #e2e8f0" }}>
              <div style={{ fontSize: 11.5, fontWeight: 700 }}>
                <span style={{ color: c }}>{e.role}</span>
                <span style={{ color: "#94a3b8", fontWeight: 400 }}> @ </span>{e.company}
                <span style={{ float: "right", color: "#64748b", fontSize: 10 }}>[{e.period}]</span>
              </div>
              <p style={{ fontSize: 10.5, color: "#475569", marginTop: 3, lineHeight: 1.55 }}>{e.description}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{ ...cell, background: "#ffffff", marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: c, fontWeight: 700, marginBottom: 6 }}># EDU</div>
            {data.educations.map((e) => (
              <div key={e.id} style={{ fontSize: 10.5, marginBottom: 6 }}>
                <strong>{e.degree}</strong>
                <div style={{ color: "#64748b" }}>{e.school} · {e.period}</div>
              </div>
            ))}
          </div>
          {data.languages.length > 0 && (
            <div style={{ ...cell, background: "#ffffff" }}>
              <div style={{ fontSize: 10, color: c, fontWeight: 700, marginBottom: 6 }}># LANG</div>
              {data.languages.map((l) => (
                <div key={l.id} style={{ fontSize: 10.5, color: "#334155" }}>
                  {l.name} <span style={{ color: c }}>={'>'}</span> {l.level}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
