import React from "react";
import { useIsMobile } from "./ui/use-mobile";
import { SkBar, SkImg, Annotation, WfBtn, SectionDivider } from "./WireframeHelpers";

export default function ArchivePage() {
  const isMobile = useIsMobile();

  return (
    <div style={{ paddingBottom: 80, background: "#111", color: "#fff" }}>
      {/* ═══ PAGE HERO ══════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative" }}>
        <SkImg label="Archive Museum Hero Banner (1440 × 600)" style={{ width: "100%", height: isMobile ? 400 : 600 }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(17,17,17,1) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: isMobile ? "0 20px 40px" : "0 80px 80px", textAlign: "center" }}>
            <Annotation n="A" label="Archive Page — Museum Layout" />
            <span className="wf-tag" style={{ background: "transparent", color: "#888", borderColor: "#444", marginBottom: 16 }}>DIGITAL MUSEUM</span>
            <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 300, letterSpacing: "0.1em", color: "#fff", margin: 0, fontFamily: "Crimson Text, serif" }}>The Heritage Archive</h1>
            <p style={{ maxWidth: 600, fontSize: isMobile ? 12 : 14, color: "#AAA", lineHeight: 1.8, marginTop: 16 }}>
              A curated retrospective of our most iconic creations, rare vintage textiles, and historic runway milestones. These pieces belong to history and are not available for purchase.
            </p>
          </div>
        </SkImg>
      </div>

      {/* ═══ MILESTONES TIMELINE ════════════════════════════════════════════════ */}
      <div style={{ padding: isMobile ? "40px 20px" : "80px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SkBar w={200} h={12} dark style={{ margin: "0 auto", background: "#555" }} />
          <div style={{ marginTop: 16, fontSize: 10, letterSpacing: "0.2em", color: "#888" }}>HISTORIC MILESTONES</div>
        </div>

        {/* 2014 */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 40, marginBottom: 80, alignItems: "center" }}>
          <div style={{ order: isMobile ? 2 : 1, display: "flex", flexDirection: "column", gap: 16, paddingRight: isMobile ? 0 : 60 }}>
            <div style={{ fontSize: 32, fontFamily: "Crimson Text, serif", color: "#d2ae6d" }}>2014</div>
            <SkBar w="80%" h={14} dark style={{ background: "#777" }} />
            <SkBar w="100%" h={9} style={{ background: "#444" }} />
            <SkBar w="90%" h={9} style={{ background: "#444" }} />
            <SkBar w="60%" h={9} style={{ background: "#444" }} />
            <WfBtn style={{ borderColor: "#444", color: "#AAA", width: 140, marginTop: 12 }}>Read Story</WfBtn>
          </div>
          <div style={{ order: isMobile ? 1 : 2 }}>
            <SkImg label="Foundation Collection Image" style={{ height: 400 }} />
          </div>
        </div>

        {/* 2016 */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 40, marginBottom: 80, alignItems: "center" }}>
          <div style={{ order: 1 }}>
            <SkImg label="First Atelier Image" style={{ height: 400 }} />
          </div>
          <div style={{ order: 2, display: "flex", flexDirection: "column", gap: 16, paddingLeft: isMobile ? 0 : 60 }}>
            <div style={{ fontSize: 32, fontFamily: "Crimson Text, serif", color: "#d2ae6d" }}>2016</div>
            <SkBar w="70%" h={14} dark style={{ background: "#777" }} />
            <SkBar w="100%" h={9} style={{ background: "#444" }} />
            <SkBar w="85%" h={9} style={{ background: "#444" }} />
            <SkBar w="70%" h={9} style={{ background: "#444" }} />
            <WfBtn style={{ borderColor: "#444", color: "#AAA", width: 140, marginTop: 12 }}>Read Story</WfBtn>
          </div>
        </div>

        {/* 2018 */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 40, marginBottom: 80, alignItems: "center" }}>
          <div style={{ order: isMobile ? 2 : 1, display: "flex", flexDirection: "column", gap: 16, paddingRight: isMobile ? 0 : 60 }}>
            <div style={{ fontSize: 32, fontFamily: "Crimson Text, serif", color: "#d2ae6d" }}>2018</div>
            <SkBar w="90%" h={14} dark style={{ background: "#777" }} />
            <SkBar w="100%" h={9} style={{ background: "#444" }} />
            <SkBar w="95%" h={9} style={{ background: "#444" }} />
            <WfBtn style={{ borderColor: "#444", color: "#AAA", width: 140, marginTop: 12 }}>View Lookbook</WfBtn>
          </div>
          <div style={{ order: isMobile ? 1 : 2 }}>
            <SkImg label="Lakme Fashion Week Image" style={{ height: 400 }} />
          </div>
        </div>
      </div>

      {/* ═══ RARE TEXTILES & HEIRLOOMS GALLERY ══════════════════════════════════ */}
      <div style={{ padding: isMobile ? "40px 20px" : "80px 80px", background: "#0a0a0a" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SkBar w={280} h={12} dark style={{ margin: "0 auto", background: "#555" }} />
          <div style={{ marginTop: 16, fontSize: 10, letterSpacing: "0.2em", color: "#888" }}>THE VAULT · NOT FOR SALE</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="wf-card" style={{ background: "#111", border: "1px solid #333", overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <SkImg label={`Rare Artifact ${i}`} style={{ height: 360 }} />
                <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", padding: "4px 8px", fontSize: 8, color: "#d2ae6d", letterSpacing: "0.1em" }}>
                  MUSEUM ONLY
                </div>
              </div>
              <div style={{ padding: "24px 20px" }}>
                <SkBar w="60%" h={12} dark style={{ background: "#888" }} />
                <SkBar w="90%" h={8} style={{ marginTop: 12, background: "#444" }} />
                <SkBar w="75%" h={8} style={{ marginTop: 6, background: "#444" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
