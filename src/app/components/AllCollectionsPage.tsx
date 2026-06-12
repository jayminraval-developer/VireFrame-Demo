import React from "react";
import { useIsMobile } from "./ui/use-mobile";
import { SkBar, SkImg, Annotation, WfBtn, SectionDivider } from "./WireframeHelpers";

/* ─── Collection category data ─────────────────────────────────────────────── */
const COLLECTION_CATEGORIES = [
  {
    id: "women",
    name: "Women",
    sub: "Lehengas · Sarees · Anarkali · Prêt",
    count: "142 Pieces",
    tags: ["New In", "Bestseller", "Pre-Order"],
    desc: "Discover our women's couture edit — from handwoven lehengas to luxe prêt silks.",
    badge: "NEW SEASON",
  },
  {
    id: "men",
    name: "Men",
    sub: "Sherwanis · Bundis · Kurtas · Indo-Western",
    count: "86 Pieces",
    tags: ["Couture", "Festive", "Signature"],
    desc: "Structured tailoring, heritage menswear and contemporary Indian occasion dressing.",
    badge: "COUTURE",
  },
  {
    id: "home-decor",
    name: "Home Decor",
    sub: "Cushions · Wall Art · Table Linen · Sculptures",
    count: "78 Pieces",
    tags: ["New In", "Limited", "Festive Edit"],
    desc: "Studio Virtues brings its heritage textile language into the home — handwoven cushions, zardozi-embellished table linen, and artisan wall art.",
    badge: "NEW LAUNCH",
  },
  {
    id: "pret",
    name: "Prêt",
    sub: "Ready-to-Wear · Silk Saris · Co-Ords",
    count: "98 Pieces",
    tags: ["New In", "Bestseller", "Resort"],
    desc: "Everyday luxury — lightweight silk, classic prints and easy draped silhouettes.",
    badge: "SS 2025",
  },
  {
    id: "accessories",
    name: "Accessories",
    sub: "Dupattas · Safas · Jewellery · Clutches",
    count: "55 Pieces",
    tags: ["Heritage", "Limited", "New In"],
    desc: "Finishing pieces — from handcrafted safas and embellished dupattas to clutch bags.",
    badge: "LIMITED",
  },
  {
    id: "archive",
    name: "Archive",
    sub: "One-of-One · Vintage Textiles · Heirloom",
    count: "28 Pieces",
    tags: ["Rare", "Archive", "Heritage"],
    desc: "Rare archive finds, collector pieces and vintage textiles from past runway seasons.",
    badge: "ARCHIVE",
  },
];

/* Room category icons (wireframe squares with labels) */
const ROOM_CATEGORIES = [
  { label: "Living Room", icon: "LR" },
  { label: "Bedroom", icon: "BD" },
  { label: "Dining Room", icon: "DR" },
  { label: "Entryway", icon: "EW" },
  { label: "Study", icon: "ST" },
  { label: "Bath", icon: "BT" },
];

interface AllCollectionsPageProps {
  onSelectCollection: (id: string) => void;
}

export default function AllCollectionsPage({
  onSelectCollection,
}: AllCollectionsPageProps) {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = React.useState("All Categories");
  const filters = ["All", "New Season", "Home Decor", "Couture", "Archive", "Bestsellers"];

  return (
    <div>
      {/* ═══ PAGE HERO ══════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative" }}>
        <SkImg label="Collections Hero Banner (1440 × 320)" style={{ width: "100%", height: 320 }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "rgba(0,0,0,0.50)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: isMobile ? "0 20px" : "0 80px", textAlign: "center" }}>
            <Annotation n="A" label="All Collections — Hero Banner" />
            <SkBar w={160} h={9} />
            <SkBar w={340} h={28} dark />
            <SkBar w={300} h={10} />
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 9, color: "#AAA", letterSpacing: "0.15em" }}>
              <span>Home</span><span>/</span>
              <span style={{ color: "#555", fontWeight: 600 }}>All Collections</span>
            </div>
          </div>
        </SkImg>
      </div>

      {/* ═══ FILTER / SORT BAR ══════════════════════════════════════════════════ */}
      <div style={{
        background: "#fff", borderBottom: "1.5px solid #EBEBEB", padding: isMobile ? "12px 20px" : "0 80px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        minHeight: 56, position: "sticky", top: 72, zIndex: 40, flexWrap: "wrap", gap: 12
      }}>
        <div style={{ display: "flex", gap: 4, overflowX: "auto", whiteSpace: "nowrap" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              border: "none", background: activeFilter === f ? "#222" : "transparent",
              color: activeFilter === f ? "#fff" : "#888", fontSize: 9, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", padding: "6px 14px",
              cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s",
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 9, color: "#AAA", letterSpacing: "0.1em" }}>6 Collections · 487 Pieces</span>
          <div className="wf-btn" style={{ height: 32, padding: "0 14px", fontSize: 9 }}>Sort: New In ▾</div>
        </div>
      </div>

      {/* ═══ COLLECTION GRID ════════════════════════════════════════════════════ */}
      <div style={{ padding: isMobile ? "32px 20px" : "48px 80px", background: "#F7F7F7" }}>
        <Annotation n="B" label="Collection Category Cards — Overview Grid" />

        {/* ── Row 1: Women (featured, large) ──────────────────────────────────── */}
        <div className="wf-card" onClick={() => onSelectCollection("women")}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr", marginBottom: 24, overflow: "hidden", cursor: "pointer" }}>
          <SkImg label="Women Collection — Feature Image (Large)" style={{ height: isMobile ? 320 : 480 }} />
          <div style={{ padding: isMobile ? "24px 20px" : "48px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#fff", borderLeft: isMobile ? "none" : "1.5px dashed #D4D4D4", borderTop: isMobile ? "1.5px dashed #D4D4D4" : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span className="wf-tag">NEW SEASON</span>
                <span style={{ fontSize: 9, color: "#AAA", letterSpacing: "0.1em" }}>142 Pieces</span>
              </div>
              <SkBar w="60%" h={9} />
              <SkBar w="80%" h={28} dark />
              <SkBar w="90%" h={28} dark />
              <div style={{ height: 1, background: "#EBEBEB" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <SkBar w="100%" h={9} /><SkBar w="85%" h={9} /><SkBar w="65%" h={9} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Lehengas", "Sarees", "Anarkali Suits", "Co-Ords", "Accessories"].map((s) => (
                  <span key={s} className="wf-tag" style={{ cursor: "pointer" }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <WfBtn solid style={{ flex: 1 }} onClick={() => onSelectCollection("women")}>Shop Women →</WfBtn>
              <WfBtn style={{ width: 44, padding: 0 }}>♡</WfBtn>
            </div>
          </div>
        </div>

        {/* ── Row 2: Men + Home Decor (equal split, featured) ─────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 24 }}>

          {/* Men */}
          <div className="wf-card" onClick={() => onSelectCollection("men")}
            style={{ display: "flex", flexDirection: "column", overflow: "hidden", cursor: "pointer" }}>
            <div style={{ position: "relative" }}>
              <SkImg label="Men Collection — Image" style={{ height: 300 }}>
                <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ background: "rgba(255,255,255,0.85)", padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                    <SkBar w={80} h={10} dark /><SkBar w={120} h={8} />
                  </div>
                  <span className="wf-tag" style={{ background: "rgba(255,255,255,0.9)" }}>COUTURE</span>
                </div>
              </SkImg>
            </div>
            <div style={{ padding: "20px 22px", background: "#fff", borderTop: "1.5px dashed #D4D4D4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <SkBar w={100} h={12} dark /><SkBar w={160} h={8} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 9, color: "#AAA" }}>86 Pieces</span>
                <WfBtn solid style={{ height: 32, padding: "0 16px", fontSize: 9 }} onClick={() => onSelectCollection("men")}>Shop →</WfBtn>
              </div>
            </div>
          </div>

          {/* Home Decor — special featured card */}
          <div className="wf-card" onClick={() => onSelectCollection("home-decor")}
            style={{ display: "flex", flexDirection: "column", overflow: "hidden", cursor: "pointer", border: "1.5px dashed #AAAAAA" }}>
            {/* Top: image with NEW LAUNCH ribbon */}
            <div style={{ position: "relative" }}>
              <SkImg label="Home Decor — Studio Showcase Image" style={{ height: 300 }}>
                {/* Ribbon */}
                <div style={{ position: "absolute", top: 16, left: 0, background: "#222", color: "#fff", fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", padding: "5px 14px", zIndex: 2 }}>
                  ★ NEW LAUNCH
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ background: "rgba(255,255,255,0.88)", padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                    <SkBar w={100} h={10} dark /><SkBar w={130} h={8} />
                  </div>
                  <span className="wf-tag" style={{ background: "rgba(255,255,255,0.9)" }}>STUDIO EDIT</span>
                </div>
              </SkImg>
            </div>
            {/* Bottom: info + room category tags */}
            <div style={{ padding: "20px 22px", background: "#fff", borderTop: "1.5px dashed #D4D4D4" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <SkBar w={110} h={12} dark />
                  <SkBar w={180} h={8} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 9, color: "#AAA" }}>78 Pieces</span>
                  <WfBtn solid style={{ height: 32, padding: "0 16px", fontSize: 9 }} onClick={() => onSelectCollection("home-decor")}>Explore →</WfBtn>
                </div>
              </div>
              {/* Room tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 6 }}>
                {["Living Room", "Bedroom", "Dining", "Entryway", "Study", "Wall Art"].map(r => (
                  <span key={r} className="wf-tag" style={{ cursor: "pointer" }}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 3: Prêt + Accessories ────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {COLLECTION_CATEGORIES.slice(3, 5).map((col) => (
            <div key={col.id} className="wf-card" onClick={() => onSelectCollection(col.id)}
              style={{ display: "flex", flexDirection: "column", overflow: "hidden", cursor: "pointer" }}>
              <div style={{ position: "relative" }}>
                <SkImg label={`${col.name} Collection — Image`} style={{ height: 240 }}>
                  <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div style={{ background: "rgba(255,255,255,0.85)", padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                      <SkBar w={80} h={10} dark /><SkBar w={120} h={8} />
                    </div>
                    <span className="wf-tag" style={{ background: "rgba(255,255,255,0.9)" }}>{col.badge}</span>
                  </div>
                </SkImg>
              </div>
              <div style={{ padding: "20px 22px", background: "#fff", borderTop: "1.5px dashed #D4D4D4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <SkBar w={100} h={12} dark /><SkBar w={160} h={8} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 9, color: "#AAA" }}>{col.count}</span>
                  <WfBtn solid style={{ height: 32, padding: "0 16px", fontSize: 9 }} onClick={() => onSelectCollection(col.id)}>Shop →</WfBtn>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Final Row: Archive (Featured landscape) ──────────────────────────── */}
        <div className="wf-card" onClick={() => onSelectCollection("archive")}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", overflow: "hidden", cursor: "pointer" }}>
          <div style={{ padding: isMobile ? "24px 20px" : "40px 36px", background: "#222", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="wf-tag" style={{ borderColor: "#555", color: "#888", background: "transparent" }}>ARCHIVE · HERITAGE</span>
              <SkBar w="80%" h={22} /><SkBar w="95%" h={22} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <SkBar w="100%" h={9} /><SkBar w="85%" h={9} /><SkBar w="60%" h={9} />
            </div>
            <WfBtn style={{ borderColor: "#555", color: "#AAA", width: 160, marginTop: 8 }}>Enter Archive →</WfBtn>
          </div>
          <SkImg label="Archive Collection — Wide Image" style={{ height: 280 }} />
        </div>
      </div>

      {/* ═══ HOME DECOR SHOWCASE STRIP ══════════════════════════════════════════ */}
      <div style={{ padding: isMobile ? "32px 20px" : "56px 80px", background: "#fff", borderTop: "1.5px dashed #DDD" }}>
        <Annotation n="C" label="Home Decor — Studio Showcase (Special Section)" />
        <SectionDivider label="The Living Edit — Studio Virtues at Home" />

        {/* Top: descriptive intro */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: isMobile ? 24 : 48, marginBottom: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <SkBar w="80%" h={18} dark />
            <SkBar w="60%" h={9} />
            <div style={{ height: 1, background: "#E0E0E0", margin: "4px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <SkBar w="100%" h={9} /><SkBar w="90%" h={9} /><SkBar w="75%" h={9} />
            </div>
            <WfBtn solid style={{ width: 160, marginTop: 8 }} onClick={() => onSelectCollection("home-decor")}>
              Shop Home Decor →
            </WfBtn>
          </div>
          {/* Room category quick-links */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: 12 }}>
            {ROOM_CATEGORIES.map(room => (
              <div key={room.label} className="wf-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "20px 10px", cursor: "pointer" }}
                onClick={() => onSelectCollection("home-decor")}>
                <div style={{ width: 44, height: 44, border: "1.5px dashed #CCC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#AAA", fontWeight: 700, background: "#F5F5F5" }}>
                  {room.icon}
                </div>
                <span style={{ fontSize: 9, color: "#666", textAlign: "center", letterSpacing: "0.05em", fontWeight: 500 }}>{room.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product carousel: 4 home decor items */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Cushion — Zardozi Embellished", tag: "NEW IN" },
            { label: "Table Runner — Block Print Silk", tag: "BESTSELLER" },
            { label: "Wall Art — Miniature Heritage", tag: "LIMITED" },
            { label: "Candle Set — Atelier Fragrance", tag: "STUDIO EDIT" },
          ].map((item, i) => (
            <div key={i} className="wf-card" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => onSelectCollection("home-decor")}>
              <div style={{ position: "relative" }}>
                <SkImg label={item.label} style={{ height: 240 }} />
                <div style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
                  <span className="wf-tag">{item.tag}</span>
                </div>
              </div>
              <div style={{ padding: "14px 14px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, borderTop: "1.5px dashed #DDD" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <SkBar w="50%" h={8} /><SkBar w="85%" h={10} dark />
                </div>
                <SkBar w={50} h={10} dark />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FEATURED EDITORIAL STRIP ═══════════════════════════════════════════ */}
      <div style={{ padding: isMobile ? "32px 20px" : "48px 80px", background: "#F7F7F7", borderTop: "1.5px dashed #DDD" }}>
        <Annotation n="D" label="Featured Editorial Collections Strip" />
        <SectionDivider label="Current Season Highlights" />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
          {["Couture '25 Women's Edit", "The Groom's Chapter", "The Living Edit — Home Decor"].map((title, i) => (
            <div key={i} className="wf-card" style={{ overflow: "hidden" }}>
              <SkImg label={`Editorial ${i + 1}`} style={{ height: 300 }} />
              <div style={{ padding: "18px 20px", background: "#fff", borderTop: "1.5px dashed #D4D4D4", display: "flex", flexDirection: "column", gap: 8 }}>
                <SkBar w="50%" h={8} />
                <SkBar w="80%" h={13} dark />
                <SkBar w="70%" h={9} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                  <SkBar w={60} h={10} dark />
                  <WfBtn style={{ height: 30, padding: "0 14px", fontSize: 8 }}>View →</WfBtn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ NEWSLETTER STRIP ═══════════════════════════════════════════════════ */}
      <div style={{ background: "#222", padding: isMobile ? "32px 20px" : "40px 80px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 24 : 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SkBar w={280} h={18} />
          <SkBar w={320} h={9} />
        </div>
        <div style={{ display: "flex", gap: 0, border: "1.5px solid #555", overflow: "hidden", flexShrink: 0, width: isMobile ? "100%" : "auto" }}>
          <input className="wf-input" placeholder="Your email address"
            style={{ width: isMobile ? "100%" : 280, border: "none", height: 44, background: "#333", color: "#AAA" }} />
          <WfBtn solid style={{ height: 44, borderRadius: 0, fontSize: 9 }}>Subscribe</WfBtn>
        </div>
      </div>
    </div>
  );
}
