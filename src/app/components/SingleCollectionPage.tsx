import React, { useState } from "react";
import { useIsMobile } from "./ui/use-mobile";
import { SkBar, SkImg, Annotation, WfBtn, SectionDivider } from "./WireframeHelpers";

/* ─── Per-collection metadata ────────────────────────────────────────────────── */
const COLLECTION_META: Record<
  string,
  {
    name: string;
    sub: string;
    description: string;
    badge: string;
    totalItems: number;
    filterGroups: { label: string; options: string[] }[];
  }
> = {
  women: {
    name: "Women",
    sub: "Couture · Prêt · Occasion Wear",
    description: "Discover our women's couture edit. From handwoven lehengas and zardozi-embellished saris to lightweight prêt silhouettes for modern occasions.",
    badge: "NEW SEASON",
    totalItems: 142,
    filterGroups: [
      { label: "Discover", options: ["New Season", "The Atelier Edit", "Seasonal Lookbook", "Made to Order", "Last Pieces"] },
      { label: "By Occasion", options: ["All Occasions", "Wedding Guest", "Festive Season", "Casual Luxe", "Evening Wear", "Resort"] },
      { label: "By Category", options: ["All", "Lehengas", "Sarees", "Anarkali Suits", "Co-Ord Sets", "Dupattas"] },
      { label: "Sort By", options: ["New Season First", "The Atelier Edit", "Price: Low–High", "Price: High–Low"] },
    ],
  },
  men: {
    name: "Men",
    sub: "Sherwanis · Bundis · Kurta Sets",
    description: "Structured heritage tailoring for the modern Indian groom and occasion dresser. Traditional silhouettes reimagined with handwoven fabrics and fine embroideries.",
    badge: "COUTURE",
    totalItems: 86,
    filterGroups: [
      { label: "Discover", options: ["New Season", "The Atelier Edit", "Seasonal Lookbook", "Made to Order", "Last Pieces"] },
      { label: "By Occasion", options: ["All Occasions", "The Groom", "Festive Season", "Sangeet Night", "Reception Look", "Heritage Casual"] },
      { label: "By Category", options: ["All", "Sherwanis", "Bundis & Jackets", "Kurta Sets", "Indo-Western", "Safas & Acc."] },
      { label: "Sort By", options: ["New Season First", "The Atelier Edit", "Price: Low–High", "Price: High–Low"] },
    ],
  },
  "home-decor": {
    name: "Home Decor",
    sub: "Cushions · Wall Art · Table Linen · Sculptures · Candles",
    description: "Studio Virtues brings its heritage textile language into your living spaces. Each piece is handcrafted using the same artisan techniques — zardozi embroidery, block printing, handloom weaving — applied to the objects of everyday life.",
    badge: "NEW LAUNCH",
    totalItems: 78,
    filterGroups: [
      { label: "Room", options: ["All Rooms", "Living Room", "Bedroom", "Dining Room", "Entryway", "Study & Office"] },
      { label: "Category", options: ["All", "Cushions & Throws", "Wall Art & Frames", "Table Linen", "Candles & Fragrance", "Sculptures & Artefacts"] },
      { label: "Craft", options: ["All", "Zardozi", "Block Print", "Handloom", "Embroidery", "Hand-Painted"] },
      { label: "Sort By", options: ["New Arrivals First", "Studio Exclusives", "Price: Low–High", "Price: High–Low"] },
    ],
  },
  pret: {
    name: "Prêt",
    sub: "Ready-to-Wear Luxe Silks",
    description: "Everyday luxury in heritage fabrics. Lightweight silk saris, classic block-print co-ords, and effortless draped silhouettes for the modern Indian wardrobe.",
    badge: "SS 2025",
    totalItems: 98,
    filterGroups: [
      { label: "Discover", options: ["New Season", "The Atelier Edit", "Seasonal Lookbook", "Made to Order", "Last Pieces"] },
      { label: "By Occasion", options: ["All Occasions", "Everyday Luxe", "Work", "Weekend", "Festive Season", "Resort"] },
      { label: "By Category", options: ["All", "Silk Saris", "Co-Ord Sets", "Kurta Sets", "Draped Silhouettes", "Separates"] },
      { label: "Sort By", options: ["New Season First", "The Atelier Edit", "Price: Low–High", "Price: High–Low"] },
    ],
  },
  accessories: {
    name: "Accessories",
    sub: "Dupattas · Safas · Clutches · Jewellery",
    description: "The finishing layer — from handcrafted embellished dupattas and royal safas to zardozi clutch bags and custom jewellery pieces.",
    badge: "STUDIO EDIT",
    totalItems: 55,
    filterGroups: [
      { label: "By Category", options: ["All", "Dupattas", "Safas & Brooches", "Clutches", "Jewellery", "Footwear"] },
      { label: "By Craft", options: ["All", "Zardozi", "Block Print", "Handwoven", "Beadwork", "Metal Work"] },
      { label: "Worn With", options: ["All", "Lehenga", "Saree", "Sherwani", "Casual Luxe", "Evening Wear"] },
      { label: "Sort By", options: ["New Season First", "The Atelier Edit", "Price: Low–High", "Price: High–Low"] },
    ],
  },
  archive: {
    name: "Archive",
    sub: "One-of-One · Vintage Textiles · Heirloom",
    description: "Rare pieces from past runway seasons — one-of-a-kind archive garments, vintage handwoven textiles and collector-edition pieces not available anywhere else.",
    badge: "ARCHIVE",
    totalItems: 28,
    filterGroups: [
      { label: "Season", options: ["All Seasons", "2014 — Foundation", "2016 — First Atelier", "2018 — Lakme", "2020 — Couture", "2024 — Museum"] },
      { label: "Piece Type", options: ["All", "One-of-One", "Vintage Textile", "Collector's Edition", "Runway Piece", "Heirloom Find"] },
      { label: "Craft", options: ["All", "Zardozi", "Hand-Woven", "Block Print", "Heritage Embroidery"] },
      { label: "Sort By", options: ["Archive Date", "Rarest First", "Price: Low–High", "Price: High–Low"] },
    ],
  },
};

const PRODUCT_TAGS = ["THE ATELIER EDIT", "NEW SEASON", "MADE TO ORDER", "STUDIO EXCLUSIVE", "SEASONAL LOOKBOOK", "HERITAGE CRAFT", "LAST PIECES", "FESTIVE EDIT"];

interface SingleCollectionPageProps {
  collectionId: string;
  onBack: () => void;
  onGoToAllCollections: () => void;
  onProductClick: () => void;
}

export default function SingleCollectionPage({
  collectionId,
  onBack,
  onGoToAllCollections,
  onProductClick,
}: SingleCollectionPageProps) {
  const isMobile = useIsMobile();
  const meta = COLLECTION_META[collectionId] ?? COLLECTION_META["women"];
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("All");

  const subTabs = meta.filterGroups[0].options;

  return (
    <div>
      {/* ═══ COLLECTION HERO ════════════════════════════════════════════════════ */}
      <div style={{ position: "relative" }}>
        <SkImg
          label={`${meta.name} Collection — Hero Banner (1440 × 380)`}
          style={{ width: "100%", height: 380 }}
        >
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background: "rgba(255,255,255,0.80)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              padding: isMobile ? "0 20px" : "0 80px",
              textAlign: "center",
            }}
          >
            <Annotation n="A" label={`${meta.name} Collection — Hero`} />
            {/* Breadcrumb */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 9, color: "#AAA", letterSpacing: "0.15em", cursor: "pointer" }}>
              <span onClick={onBack} style={{ cursor: "pointer" }}>Home</span>
              <span>/</span>
              <span onClick={onGoToAllCollections} style={{ cursor: "pointer" }}>Collections</span>
              <span>/</span>
              <span style={{ color: "#555", fontWeight: 600 }}>{meta.name}</span>
            </div>
            <span className="wf-tag">{meta.badge}</span>
            <SkBar w={120} h={9} />
            <SkBar w={400} h={32} dark />
            <SkBar w={320} h={9} />
            <SkBar w={280} h={9} />
          </div>
        </SkImg>
      </div>

      {/* ═══ STICKY FILTER BAR ══════════════════════════════════════════════════ */}
      <div
        style={{
          position: "sticky",
          top: 72,
          zIndex: 40,
          background: "#fff",
          borderBottom: "1.5px solid #EBEBEB",
        }}
      >
        {/* Sub-category tabs */}
        <div
          style={{
            padding: isMobile ? "0 20px" : "0 80px",
            height: 48,
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderBottom: "1px solid #F0F0F0",
            overflowX: "auto",
            whiteSpace: "nowrap"
          }}
        >
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                border: "none",
                background: activeTab === tab ? "#222" : "transparent",
                color: activeTab === tab ? "#fff" : "#888",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "5px 14px",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 9, color: "#AAA" }}>{meta.totalItems} items</span>
          </div>
        </div>

        {/* Filter dropdowns + sort + view toggle */}
        <div
          style={{
            padding: isMobile ? "12px 20px" : "0 80px",
            minHeight: 52,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <span style={{ fontSize: 9, color: "#BBB", letterSpacing: "0.15em", fontWeight: 600, textTransform: "uppercase", marginRight: 4 }}>Filter:</span>
          {meta.filterGroups.map((group) => (
            <select
              key={group.label}
              className="wf-select"
              value={activeFilters[group.label] ?? group.options[0]}
              onChange={(e) =>
                setActiveFilters((prev) => ({ ...prev, [group.label]: e.target.value }))
              }
              style={{ width: "auto", height: 34, paddingRight: 28, minWidth: 140 }}
            >
              {group.options.map((opt) => (
                <option key={opt}>{opt === "All" ? `${group.label}: All` : opt}</option>
              ))}
            </select>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            {/* View mode toggle */}
            {(["grid", "list"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                style={{
                  width: 32,
                  height: 32,
                  border: `1.5px ${viewMode === m ? "solid #555" : "dashed #CCC"}`,
                  background: viewMode === m ? "#222" : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  flexDirection: "column",
                }}
              >
                {m === "grid"
                  ? Array.from({ length: 2 }).map((_, ri) => (
                      <div key={ri} style={{ display: "flex", gap: 2 }}>
                        {Array.from({ length: 2 }).map((_, ci) => (
                          <div key={ci} style={{ width: 5, height: 5, background: viewMode === "grid" ? "#fff" : "#CCC" }} />
                        ))}
                      </div>
                    ))
                  : Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} style={{ width: 14, height: 2, background: viewMode === "list" ? "#fff" : "#CCC" }} />
                    ))}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT: SIDEBAR + PRODUCT GRID ═══════════════════════════════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
          background: "#F7F7F7",
          minHeight: 900,
        }}
      >
        {/* ── LEFT SIDEBAR ───────────────────────────────────────────────────── */}
        <aside
          style={{
            background: "#fff",
            borderRight: isMobile ? "none" : "1.5px solid #EBEBEB",
            borderBottom: isMobile ? "1.5px solid #EBEBEB" : "none",
            padding: isMobile ? "24px 20px" : "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <Annotation n="B" label="Filter Sidebar" />

          {meta.filterGroups.map((group) => (
            <div key={group.label} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#888",
                  }}
                >
                  {group.label}
                </span>
                <div style={{ flex: 1, height: 1, background: "#E8E8E8" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {group.options.map((opt, oi) => (
                  <label
                    key={opt}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                      fontSize: 11,
                      color: oi === 0 ? "#222" : "#666",
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        border: `1.5px ${oi === 0 ? "solid #333" : "dashed #CCC"}`,
                        background: oi === 0 ? "#222" : "#fff",
                        flexShrink: 0,
                      }}
                    />
                    {opt === "All" ? `All ${group.label}` : opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Price range slider placeholder */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888" }}>Price Range</span>
            <div style={{ height: 4, background: "#E0E0E0", borderRadius: 2, position: "relative" }}>
              <div style={{ position: "absolute", left: "15%", right: "20%", top: 0, bottom: 0, background: "#555", borderRadius: 2 }} />
              <div style={{ position: "absolute", left: "15%", top: "50%", transform: "translate(-50%, -50%)", width: 10, height: 10, borderRadius: "50%", background: "#222", border: "2px solid #fff", boxShadow: "0 0 0 1.5px #888" }} />
              <div style={{ position: "absolute", right: "20%", top: "50%", transform: "translate(50%, -50%)", width: 10, height: 10, borderRadius: "50%", background: "#222", border: "2px solid #fff", boxShadow: "0 0 0 1.5px #888" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <SkBar w={52} h={8} />
              <SkBar w={52} h={8} />
            </div>
          </div>

          {/* Clear filters */}
          <WfBtn style={{ width: "100%", fontSize: 9 }} onClick={() => setActiveFilters({})}>
            Clear All Filters
          </WfBtn>
        </aside>

        {/* ── PRODUCT GRID ───────────────────────────────────────────────────── */}
        <div style={{ padding: isMobile ? "24px 20px" : "32px 40px" }}>
          <Annotation n="C" label="Product Grid — Filtered Results" />

          {/* Results count + active filter chips */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 10, color: "#AAA", letterSpacing: "0.1em" }}>
              Showing <strong style={{ color: "#333" }}>{meta.totalItems}</strong> items
            </span>
            {/* Active filter chips */}
            {Object.entries(activeFilters)
              .filter(([, v]) => v && !v.includes("All") && !v.includes("Newest"))
              .map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#F0F0F0",
                    border: "1px dashed #CCC",
                    padding: "3px 8px 3px 10px",
                    fontSize: 9,
                    color: "#555",
                  }}
                >
                  {v}
                  <span
                    style={{ cursor: "pointer", color: "#AAA", fontSize: 12, lineHeight: 1 }}
                    onClick={() =>
                      setActiveFilters((prev) => {
                        const next = { ...prev };
                        delete next[k];
                        return next;
                      })
                    }
                  >
                    ×
                  </span>
                </div>
              ))}
          </div>

          {/* Grid or List view */}
          {viewMode === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: isMobile ? 12 : 20 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="wf-card" onClick={onProductClick} style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}>
                  <div style={{ position: "relative" }}>
                    <SkImg
                      label={`${meta.name} Product ${i + 1}`}
                      style={{ height: 320 }}
                    >
                      {/* Tag */}
                      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
                        <span className="wf-tag">{PRODUCT_TAGS[i % PRODUCT_TAGS.length]}</span>
                      </div>
                      {/* Wishlist */}
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "#fff",
                          border: "1px dashed #CCC",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 2,
                          fontSize: 12,
                          color: "#CCC",
                          cursor: "pointer",
                        }}
                      >
                        ♡
                      </div>
                      {/* Add to bag */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "rgba(34,34,34,0.88)",
                          padding: "10px 12px",
                          zIndex: 2,
                        }}
                      >
                        <WfBtn solid style={{ width: "100%", height: 32, fontSize: 8 }}>Add to Bag</WfBtn>
                      </div>
                    </SkImg>
                  </div>
                  <div style={{ padding: "12px 10px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
                      <SkBar w="45%" h={8} />
                      <SkBar w="85%" h={10} dark />
                    </div>
                    <SkBar w={55} h={10} dark />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List view */
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="wf-card" onClick={onProductClick} style={{ display: "flex", gap: 0, overflow: "hidden", cursor: "pointer" }}>
                  <SkImg label={`Product ${i + 1}`} style={{ width: 140, height: 140, flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderLeft: "1.5px dashed #D4D4D4" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                      <span className="wf-tag">{PRODUCT_TAGS[i % PRODUCT_TAGS.length]}</span>
                      <SkBar w="50%" h={9} />
                      <SkBar w="35%" h={12} dark />
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <SkBar w="70%" h={8} />
                        <SkBar w="55%" h={8} />
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", flexShrink: 0 }}>
                      <SkBar w={70} h={14} dark />
                      <div style={{ display: "flex", gap: 8 }}>
                        <WfBtn style={{ height: 32, padding: "0 14px", fontSize: 9 }}>♡</WfBtn>
                        <WfBtn solid style={{ height: 32, padding: "0 18px", fontSize: 9 }}>Add to Bag</WfBtn>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px dashed #DDD",
            }}
          >
            {["‹ Prev", "1", "2", "3", "...", "8", "Next ›"].map((p, i) => (
              <button
                key={i}
                style={{
                  width: p === "1" ? 36 : "auto",
                  height: 36,
                  padding: "0 12px",
                  border: p === "1" ? "1.5px solid #333" : "1.5px dashed #CCC",
                  background: p === "1" ? "#222" : "transparent",
                  color: p === "1" ? "#fff" : "#888",
                  fontSize: 10,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.1em",
                  fontWeight: p === "1" ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COLLECTION STORY STRIP ═════════════════════════════════════════════ */}
      <div
        style={{
          padding: "56px 80px",
          background: "#fff",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          borderTop: "1.5px dashed #DDD",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Annotation n="D" label="Collection Story / Editorial Section" />
          <SkBar w="40%" h={9} />
          <SkBar w="75%" h={24} dark />
          <SkBar w="85%" h={24} dark />
          <div style={{ height: 1, background: "#E0E0E0" }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <SkBar key={i} w={`${100 - i * 8}%`} h={9} />
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <WfBtn solid style={{ width: 160 }}>Shop the Edit</WfBtn>
            <WfBtn style={{ width: 160 }}>Book Consultation</WfBtn>
          </div>
        </div>
        <SkImg label="Collection Editorial Photo" style={{ height: 420 }} />
      </div>

      {/* ═══ YOU MAY ALSO LIKE (Cross-sell) ════════════════════════════════════ */}
      <div style={{ padding: "48px 80px", background: "#F7F7F7", borderTop: "1.5px dashed #DDD" }}>
        <Annotation n="E" label="You May Also Like — Cross-Sell Strip" />
        <SectionDivider label="Complete the Look" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="wf-card">
              <SkImg label={`Related ${i + 1}`} style={{ height: 240 }} />
              <div style={{ padding: "12px 12px", background: "#fff", display: "flex", justifyContent: "space-between", borderTop: "1.5px dashed #D4D4D4" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <SkBar w="45%" h={8} />
                  <SkBar w="80%" h={10} dark />
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
