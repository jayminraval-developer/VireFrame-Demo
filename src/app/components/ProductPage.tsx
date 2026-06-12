import React, { useState } from "react";
import { SkBar, SkImg, Annotation, WfBtn, SectionDivider } from "./WireframeHelpers";

interface ProductPageProps {
  onBack: () => void;
  onAddToCart?: () => void;
}

export default function ProductPage({ onBack, onAddToCart }: ProductPageProps) {
  const [activeAccordion, setActiveAccordion] = useState<string>("details");
  const [activeImage, setActiveImage] = useState(0);

  const galleryImages = [
    "Main Product Shot — Front View",
    "Detail Shot — Embroidery Close-up",
    "Model Shot — Side Profile",
    "Fabric Texture",
    "Back Detail",
  ];

  return (
    <div style={{ background: "#fff" }}>
      {/* ═══ BREADCRUMB ═══════════════════════════════════════════════════════ */}
      <div style={{ padding: "24px 80px", borderBottom: "1.5px solid #EBEBEB", display: "flex", gap: 8, alignItems: "center", fontSize: 9, color: "#AAA", letterSpacing: "0.15em" }}>
        <span onClick={onBack} style={{ cursor: "pointer" }}>Home</span>
        <span>/</span>
        <span onClick={onBack} style={{ cursor: "pointer" }}>Collections</span>
        <span>/</span>
        <span onClick={onBack} style={{ cursor: "pointer" }}>Women</span>
        <span>/</span>
        <span style={{ color: "#555", fontWeight: 600 }}>The Zardozi Velvet Lehenga</span>
      </div>

      {/* ═══ PRODUCT MAIN SECTION ═══════════════════════════════════════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", minHeight: "85vh" }}>
        
        {/* ── LEFT: IMAGE GALLERY (Interactive) ───────────────────────────── */}
        <div style={{ background: "#F9F9F9", borderRight: "1.5px solid #EBEBEB", position: "relative" }}>
          <div style={{ position: "sticky", top: 120, padding: "0 60px", display: "flex", gap: 24 }}>
            <div style={{ position: "absolute", top: -16, left: 24, zIndex: 10 }}>
              <Annotation n="A" label="Interactive Product Gallery" />
            </div>

            {/* Thumbnails (Vertical Strip) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40, width: 80, flexShrink: 0 }}>
            {galleryImages.map((imgLabel, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(idx)}
                style={{ 
                  cursor: "pointer", 
                  border: activeImage === idx ? "1.5px solid #222" : "1px solid transparent",
                  padding: 2,
                  transition: "all 0.2s ease"
                }}
              >
                <SkImg label={`Thumb ${idx + 1}`} style={{ height: 100, width: "100%", border: "1px dashed #CCC" }} />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <SkImg label={galleryImages[activeImage]} style={{ width: "100%", height: "auto", aspectRatio: "3/4", objectFit: "cover" }} />
            
            {/* Arrows */}
            <div style={{ position: "absolute", bottom: 24, right: 24, display: "flex", gap: 8 }}>
              <button 
                onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
                style={{ width: 40, height: 40, background: "#fff", border: "1.5px solid #EBEBEB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ‹
              </button>
              <button 
                onClick={() => setActiveImage((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
                style={{ width: 40, height: 40, background: "#fff", border: "1.5px solid #EBEBEB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: PRODUCT INFO (Sticky) ──────────────────────────────────── */}
      <div style={{ padding: "48px 64px" }}>
        <div style={{ position: "sticky", top: 120 }}>
            <Annotation n="B" label="Product Details & Purchasing" />
            
            {/* Header info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              <span className="wf-tag" style={{ alignSelf: "flex-start" }}>THE ATELIER EDIT</span>
              <SkBar w="85%" h={28} dark />
              <SkBar w="40%" h={18} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                <SkBar w="95%" h={10} />
                <SkBar w="90%" h={10} />
                <SkBar w="70%" h={10} />
              </div>
            </div>

            <div style={{ height: "1.5px", background: "#EBEBEB", margin: "32px 0" }} />

            {/* One-of-a-Kind Badging */}
            <div style={{ marginBottom: 32, padding: "16px 20px", background: "#F9F9F9", border: "1.5px dashed #D4D4D4", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#222", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
                1/1
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#222" }}>One-of-a-Kind Piece</span>
                <span style={{ fontSize: 9, color: "#666", lineHeight: 1.4 }}>
                  This is a unique, non-replicable archive piece. There are no size or color variations available.
                </span>
              </div>
            </div>

            {/* Measurements / Fit Details */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>Current Measurements</span>
                <span style={{ fontSize: 9, color: "#888", textDecoration: "underline", cursor: "pointer" }}>View Diagram</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "16px 20px", border: "1.5px solid #EBEBEB" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#555" }}>
                  <span>Chest / Bust</span>
                  <span style={{ fontWeight: 600 }}>34 inches</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#555" }}>
                  <span>Waist</span>
                  <span style={{ fontWeight: 600 }}>28 inches</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#555" }}>
                  <span>Length</span>
                  <span style={{ fontWeight: 600 }}>42 inches</span>
                </div>
              </div>

              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#F9F9F9", border: "1.5px dashed #D4D4D4" }}>
                <span style={{ fontSize: 14 }}>✂️</span>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Bespoke Alterations</div>
                  <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>Request minor sizing adjustments by our master tailors before delivery.</div>
                </div>
                <WfBtn style={{ marginLeft: "auto", height: 28, fontSize: 8, padding: "0 12px" }}>Request</WfBtn>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <WfBtn solid style={{ flex: 1, height: 52 }} onClick={onAddToCart}>Add to Cart</WfBtn>
                <WfBtn style={{ width: 52, height: 52, padding: 0 }}>♡</WfBtn>
              </div>
              <WfBtn style={{ height: 52, background: "transparent", borderColor: "#222" }}>Inquire to Acquire</WfBtn>
              <WfBtn style={{ height: 52, background: "#F9F9F9", borderColor: "#D4D4D4" }}>Book Studio Viewing</WfBtn>
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <span style={{ fontSize: 9, color: "#888" }}>This piece is reserved on a first-come, first-served basis.</span>
              </div>
            </div>

            {/* Accordions */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { id: "details", label: "The Details" },
                { id: "craft", label: "Heritage & Craft" },
                { id: "shipping", label: "Shipping & Returns" },
              ].map((acc) => (
                <div key={acc.id} style={{ borderBottom: "1.5px solid #EBEBEB" }}>
                  <div 
                    onClick={() => setActiveAccordion(activeAccordion === acc.id ? "" : acc.id)}
                    style={{ 
                      padding: "20px 0", display: "flex", justifyContent: "space-between", 
                      alignItems: "center", cursor: "pointer" 
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#333" }}>{acc.label}</span>
                    <span style={{ fontSize: 14, color: "#888" }}>{activeAccordion === acc.id ? "−" : "+"}</span>
                  </div>
                  {activeAccordion === acc.id && (
                    <div style={{ paddingBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                      <SkBar w="95%" h={9} />
                      <SkBar w="85%" h={9} />
                      <SkBar w="90%" h={9} />
                      <SkBar w="60%" h={9} />
                      {acc.id === "details" && (
                        <ul style={{ paddingLeft: 20, margin: "10px 0 0", color: "#666", fontSize: 10, lineHeight: 1.8 }}>
                          <li>Hand-woven pure silk velvet base</li>
                          <li>Intricate zardozi and dabka embroidery</li>
                          <li>Includes embellished net dupatta</li>
                          <li>Dry clean only</li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Need Help */}
            <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 9, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>Need Assistance?</span>
              <a href="#" style={{ fontSize: 9, color: "#222", fontWeight: 600, textDecoration: "underline" }}>WhatsApp Us</a>
              <a href="#" style={{ fontSize: 9, color: "#222", fontWeight: 600, textDecoration: "underline" }}>Email Concierge</a>
            </div>

          </div>
        </div>
      </div>

      {/* ═══ THE ARTISAN STORY ═════════════════════════════════════════════════ */}
      <div style={{ padding: "80px", background: "#222", color: "#fff", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <Annotation n="C" label="Craftsmanship Story (Immersive)" />
        <SkImg label="Karigar at Work — Video Placeholder" style={{ height: 500, borderColor: "#444", background: "#111", color: "#666" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span className="wf-tag" style={{ borderColor: "#555", color: "#888", background: "transparent", alignSelf: "flex-start" }}>THE PROCESS</span>
          <SkBar w="80%" h={28} />
          <div style={{ height: 1, background: "#444", margin: "12px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SkBar w="100%" h={10} /><SkBar w="90%" h={10} /><SkBar w="95%" h={10} /><SkBar w="70%" h={10} />
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 300 }}>120+</span>
              <span style={{ fontSize: 9, color: "#888", letterSpacing: "0.15em", textTransform: "uppercase" }}>Hours of Craft</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 300 }}>4</span>
              <span style={{ fontSize: 9, color: "#888", letterSpacing: "0.15em", textTransform: "uppercase" }}>Master Artisans</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ COMPLETE THE LOOK (Styling) ═══════════════════════════════════════ */}
      <div style={{ padding: "80px", background: "#F9F9F9", borderBottom: "1.5px solid #EBEBEB" }}>
        <Annotation n="D" label="Complete The Look / Styling Recommendations" />
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#333" }}>Studio Styling</span>
              <SkBar w="70%" h={24} dark />
              <SkBar w="50%" h={10} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[1, 2].map(i => (
                <div key={i} className="wf-card" style={{ display: "flex", gap: 20, padding: 16, background: "#fff", alignItems: "center" }}>
                  <SkImg label={`Accessory ${i}`} style={{ width: 100, height: 120, flexShrink: 0 }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <span className="wf-tag" style={{ alignSelf: "flex-start" }}>COMPLEMENTARY</span>
                    <SkBar w="80%" h={12} dark />
                    <SkBar w={60} h={10} />
                  </div>
                  <WfBtn style={{ height: 36, padding: "0 20px" }}>Add</WfBtn>
                </div>
              ))}
            </div>
          </div>
          <SkImg label="Full Styled Look Editorial Image" style={{ height: 600 }} />
        </div>
      </div>

      {/* ═══ YOU MAY ALSO LIKE ═════════════════════════════════════════════════ */}
      <div style={{ padding: "64px 80px" }}>
        <Annotation n="E" label="Cross-Sells & Recommendations" />
        <SectionDivider label="More from this Collection" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="wf-card" style={{ cursor: "pointer" }}>
              <SkImg label={`Recommended Product ${i + 1}`} style={{ height: 320 }} />
              <div style={{ padding: "16px", background: "#fff", display: "flex", justifyContent: "space-between", borderTop: "1.5px dashed #D4D4D4" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <SkBar w={120} h={10} dark />
                  <SkBar w={80} h={8} />
                </div>
                <SkBar w={50} h={10} dark />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
