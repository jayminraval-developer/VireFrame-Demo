import React from "react";

/* ─── Shared Skeleton Helpers ────────────────────────────────────────────────── */
export const SkBar = ({
  w = "100%",
  h = 10,
  dark = false,
  style,
}: {
  w?: string | number;
  h?: number;
  dark?: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      width: w,
      height: h,
      background: dark ? "#C8C8C8" : "#E4E4E4",
      borderRadius: 2,
      flexShrink: 0,
      ...style,
    }}
  />
);

export const SkImg = ({
  label = "Image Placeholder",
  style,
  children,
}: {
  label?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) => (
  <div className="wf-img" style={{ position: "relative", ...style }}>
    <span className="wf-img-label">{label}</span>
    {children}
  </div>
);

export const Annotation = ({ n, label }: { n: string; label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
    <span className="wf-dot">{n}</span>
    <span className="wf-section-tag">{label}</span>
  </div>
);

export const WfBtn = ({
  children,
  solid,
  style,
  onClick,
}: {
  children: React.ReactNode;
  solid?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={solid ? "wf-btn wf-btn-solid" : "wf-btn"}
    style={style}
  >
    {children}
  </button>
);

export const SectionDivider = ({ label }: { label: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "8px 0 24px",
    }}
  >
    <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
    <span
      style={{
        fontSize: 9,
        color: "#AAA",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {label}
    </span>
    <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
  </div>
);
