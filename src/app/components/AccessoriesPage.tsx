import React from "react";
import { useIsMobile } from "./ui/use-mobile";
import { SkBar, SkImg, Annotation, WfBtn, SectionDivider } from "./WireframeHelpers";

interface AccessoriesPageProps {
  onSelectProduct: (id: string) => void;
}

export default function AccessoriesPage({ onSelectProduct }: AccessoriesPageProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState("Women");

  return (
    <div style={{ paddingBottom: 80, background: "#fff" }}>
      {/* ═══ PAGE HERO ══════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative" }}>
        <SkImg label="Accessories Hero Banner (1440 × 400)" style={{ width: "100%", height: isMobile ? 300 : 400 }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "rgba(0,0,0,0.40)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: isMobile ? "0 20px" : "0 80px", textAlign: "center" }}>
            <Annotation n="A" label="Accessories Page — Custom Hero" />
            <span className="wf-tag" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>THE FINISHING TOUCH</span>
            <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 300, letterSpacing: "0.05em", color: "#fff", margin: 0, fontFamily: "Crimson Text, serif" }}>Accessories</h1>
            <p style={{ maxWidth: 600, fontSize: isMobile ? 12 : 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
              From handcrafted embellished dupattas and royal safas to zardozi clutch bags and custom jewellery pieces. Complete the heritage look.
            </p>
          </div>
        </SkImg>
      </div>

      {/* ═══ GENDER TOGGLE ══════════════════════════════════════════════════════ */}
      <div style={{ borderBottom: "1.5px solid #EBEBEB", display: "flex", justifyContent: "center", background: "#FAFAFA" }}>
        {["Women", "Men"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: "none", border: "none", padding: "24px 40px", cursor: "pointer",
            fontSize: 14, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
            color: activeTab === tab ? "#222" : "#AAA",
            borderBottom: activeTab === tab ? "2px solid #222" : "2px solid transparent",
            transition: "all 0.3s"
          }}>
            {tab}'s Accessories
          </button>
        ))}
      </div>

      {/* ═══ DYNAMIC CONTENT (WOMEN OR MEN) ═════════════════════════════════════ */}
      <div style={{ padding: isMobile ? "32px 20px" : "64px 80px", background: "#fff" }}>
        <Annotation n="B" label={`Accessories — ${activeTab} Section Layout`} />
        
        {activeTab === "Women" ? (
          <>
            <SectionDivider label="Fine Jewellery & Clutches" />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: 32, marginBottom: 64 }}>
              <SkImg label="Featured Necklace / Clutch Editorial" style={{ height: 480 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="wf-card" style={{ cursor: "pointer" }} onClick={() => onSelectProduct("product-acc-w")}>
                    <SkImg label={`Item ${i}`} style={{ height: 180 }} />
                    <div style={{ padding: 12 }}>
                      <SkBar w="70%" h={10} dark />
                      <SkBar w="40%" h={10} style={{ marginTop: 6 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SectionDivider label="Handwoven Dupattas & Belts" />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 20 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="wf-card" style={{ cursor: "pointer" }} onClick={() => onSelectProduct("product-acc-w")}>
                  <SkImg label={`Dupatta ${i}`} style={{ height: 320 }} />
                  <div style={{ padding: 16 }}>
                    <SkBar w="80%" h={12} dark />
                    <SkBar w="50%" h={10} style={{ marginTop: 8 }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <SectionDivider label="Safas & Pagris" />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: 32, marginBottom: 64 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="wf-card" style={{ cursor: "pointer" }} onClick={() => onSelectProduct("product-acc-m")}>
                    <SkImg label={`Safa ${i}`} style={{ height: 180 }} />
                    <div style={{ padding: 12 }}>
                      <SkBar w="70%" h={10} dark />
                      <SkBar w="40%" h={10} style={{ marginTop: 6 }} />
                    </div>
                  </div>
                ))}
              </div>
              <SkImg label="Featured Groom Safa Editorial" style={{ height: 480 }} />
            </div>

            <SectionDivider label="Brooches, Stoles & Footwear" />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 20 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="wf-card" style={{ cursor: "pointer" }} onClick={() => onSelectProduct("product-acc-m")}>
                  <SkImg label={`Accessory ${i}`} style={{ height: 280 }} />
                  <div style={{ padding: 16 }}>
                    <SkBar w="80%" h={12} dark />
                    <SkBar w="50%" h={10} style={{ marginTop: 8 }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
