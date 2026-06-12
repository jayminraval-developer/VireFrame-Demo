import { useState, useEffect, useCallback, useRef } from "react";
import AllCollectionsPage from "./components/AllCollectionsPage";
import SingleCollectionPage from "./components/SingleCollectionPage";
import AccessoriesPage from "./components/AccessoriesPage";
import ArchivePage from "./components/ArchivePage";
import ProductPage from "./components/ProductPage";
import CartDrawer from "./components/CartDrawer";
import { SkBar, SkImg, Annotation, WfBtn } from "./components/WireframeHelpers";
import { useIsMobile } from "./components/ui/use-mobile";

/* ─── NAV ITEMS ─────────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Women", "Men", "Home Decor", "Atelier", "Archive", "Accessories"];

const NAV_CATEGORIES: Record<string, { label: string; links: string[] }[]> = {
  Women: [
    { label: "Discover", links: ["New Season", "The Atelier Edit", "Seasonal Lookbook", "Made to Order", "Last Pieces"] },
    { label: "By Occasion", links: ["Wedding Guest", "Festive Season", "Casual Luxe", "Evening Wear", "Resort"] },
    { label: "By Category", links: ["Lehengas", "Sarees", "Anarkali Suits", "Co-Ord Sets", "Dupattas"] },
  ],
  Men: [
    { label: "Discover", links: ["New Season", "The Atelier Edit", "Seasonal Lookbook", "Made to Order", "Last Pieces"] },
    { label: "By Occasion", links: ["The Groom", "Festive Season", "Sangeet Night", "Reception Look", "Heritage Casual"] },
    { label: "By Category", links: ["Sherwanis", "Bundis & Jackets", "Kurta Sets", "Indo-Western", "Safas"] },
  ],
  "Home Decor": [
    { label: "Discover", links: ["New Arrivals", "Studio Exclusives", "Seasonal Edit", "Made to Order", "Last Pieces"] },
    { label: "By Room", links: ["Living Room", "Bedroom", "Dining Room", "Entryway", "Study & Office"] },
    { label: "By Category", links: ["Cushions & Throws", "Wall Art & Frames", "Table Linen", "Candles & Fragrance", "Sculptures"] },
  ],
  Atelier: [
    { label: "Our Services", links: ["Bespoke Commission", "Private Fittings", "Fabric Sourcing", "Heritage Embroidery", "Express Tailoring"] },
    { label: "Find Us", links: ["Ahmedabad Atelier", "Mumbai Studio", "Virtual Styling", "Home Visits", "NRI Appointments"] },
    { label: "Experiences", links: ["Studio Tour", "Karigar Meet", "Heritage Workshops", "Archive Access", "Gift Experiences"] },
  ],
  Archive: [
    { label: "Milestones", links: ["2014 — Foundation", "2016 — First Atelier", "2018 — Lakme Debut", "2020 — Couture Salon", "2024 — Museum Project"] },
    { label: "Editorials", links: ["Heritage Lookbooks", "Runway Collections", "Press Features", "Artisan Journals", "Campaign Films"] },
    { label: "Rare Pieces", links: ["Archive Pieces", "One-of-One Items", "Vintage Textiles", "Collector's Editions", "Heirloom Finds"] },
  ],
  Accessories: [
    { label: "Women's Accessories", links: ["Potlis & Clutches", "Handwoven Dupattas", "Fine Jewellery", "Bridal Belts", "Juttis & Mojaris"] },
    { label: "Men's Accessories", links: ["Safas & Pagris", "Brooches & Kalgi", "Heritage Shawls", "Stoles", "Embroidered Mojaris"] },
    { label: "Discover", links: ["New Arrivals", "The Wedding Edit", "Studio Exclusives", "Last Pieces", "Gifting"] },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════ */
type Page = "home" | "collections" | "collection" | "product" | "accessories" | "archive";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [activeCollection, setActiveCollection] = useState("women");
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);

  const isMobile = useIsMobile();

  const goHome = () => { setPage("home"); window.scrollTo(0,0); };
  const goCollections = () => { setPage("collections"); window.scrollTo(0,0); };
  const goCollection = (id: string) => { 
    if (id === "accessories") {
      setPage("accessories");
    } else if (id === "archive") {
      setPage("archive");
    } else {
      setActiveCollection(id); 
      setPage("collection"); 
    }
    window.scrollTo(0,0); 
  };
  const goProduct = () => { setPage("product"); window.scrollTo(0,0); };
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announcements = [
    "Complimentary Studio Shipping on orders above ₹25,000",
    "Book a Private Atelier Fitting Session — Ahmedabad & Mumbai",
    "New Arrivals: Couture '25 Heritage Collection — Now Live",
  ];

  useEffect(() => {
    const t = setInterval(() => setAnnouncementIndex(p => (p + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);

  const onScroll = useCallback(() => setScrollY(window.scrollY), []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const openNav = (link: string) => {
    if (navTimer.current) clearTimeout(navTimer.current);
    setActiveNav(link);
  };
  const closeNav = () => {
    navTimer.current = setTimeout(() => setActiveNav(null), 180);
  };
  const stayOpen = () => {
    if (navTimer.current) clearTimeout(navTimer.current);
  };

  return (
    <div style={{ background: "var(--wf-bg)", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>

      {/* ═══ 01 · ANNOUNCEMENT BAR ══════════════════════════════════════════════ */}
      <div style={{
        background: "#222",
        color: "#DDD",
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 20px" : "0 48px",
        fontSize: isMobile ? 8 : 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        borderBottom: "1px dashed #444",
        position: "relative",
      }}>
        <div style={{ position: "absolute", left: isMobile ? 12 : 8, top: "50%", transform: "translateY(-50%)" }}>
          <span className="wf-section-tag" style={{ background: "transparent", color: "#888", borderColor: "#555", fontSize: 8 }}>
            {!isMobile && "01 — "}ANNOUNCEMENT
          </span>
        </div>
        <div style={{ flex: 1, textAlign: isMobile ? "right" : "center" }}>{announcements[announcementIndex]}</div>
      </div>

      {/* ─── OUTER WRAPPER ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1440, margin: "0 auto", background: "#fff", boxShadow: "0 0 40px rgba(0,0,0,0.08)", position: "relative", borderLeft: "1px solid #E0E0E0", borderRight: "1px solid #E0E0E0" }}>

        {/* ═══ 02 · HEADER + MEGA MENU ════════════════════════════════════════════ */}
        <header
          style={{ position: "sticky", top: 0, background: "#fff", borderBottom: "1.5px solid #DEDEDE", zIndex: 100 }}
          onMouseLeave={closeNav}
        >
          <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 20px" : "0 80px" }}>

            {/* Mobile Hamburger (Only visible on mobile) */}
            {isMobile && (
              <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: "#222" }}>
                ☰
              </button>
            )}

            {/* Logo block */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: isMobile ? "center" : "flex-start" }}>
              <div className="wf-bar-xl" style={{ width: 180, background: "#CCC" }} />
              <div className="wf-bar-sm" style={{ width: 120, background: "#E0E0E0" }} />
            </div>

            {/* Desktop Nav links */}
            {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {/* Home */}
              <button
                onClick={goHome}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: page === "home" ? "#222" : "#888", padding: "8px 0",
                  fontFamily: "Inter, sans-serif",
                  borderBottom: page === "home" ? "2px solid #333" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >Home</button>

              {/* Collections */}
              <button
                onClick={goCollections}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: page === "collections" || page === "collection" || page === "accessories" || page === "archive" ? "#222" : "#888",
                  padding: "8px 0", fontFamily: "Inter, sans-serif",
                  borderBottom: page === "collections" || page === "collection" || page === "accessories" || page === "archive" ? "2px solid #333" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >Collections</button>

              {/* Category links with mega menu */}
              {NAV_LINKS.map(link => (
                <button
                  key={link}
                  onMouseEnter={() => openNav(link)}
                  onClick={() => goCollection(link.toLowerCase())}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: activeNav === link ? "#222" : "#888",
                    position: "relative",
                    fontFamily: "Inter, sans-serif",
                    borderBottom: activeNav === link ? "2px solid #555" : "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {link}
                </button>
              ))}
            </nav>
            )}

            {/* Icons row */}
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 20, height: 20, background: "#E4E4E4", borderRadius: 3 }} />
                <span style={{ fontSize: 7, color: "#AAA", letterSpacing: "0.1em", textTransform: "uppercase" }}>Search</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: 20, height: 20, background: "#E4E4E4", borderRadius: 3 }} />
                <span style={{ fontSize: 7, color: "#AAA", letterSpacing: "0.1em", textTransform: "uppercase" }}>Wishlist</span>
              </div>
              <div onClick={() => setIsCartOpen(true)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, background: "#E4E4E4", borderRadius: 3 }} />
                <span style={{ fontSize: 7, color: "#AAA", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cart</span>
              </div>
            </div>
          </div>

          {/* ── MEGA MENU DROPDOWN ──────────────────────────────────────────────── */}
          <div
            className={`wf-mega ${activeNav ? "visible" : "hidden"}`}
            onMouseEnter={stayOpen}
            onMouseLeave={closeNav}
          >
            {activeNav && NAV_CATEGORIES[activeNav] && (
              <div style={{ padding: "28px 80px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 280px", gap: 40 }}>
                {NAV_CATEGORIES[activeNav].map((cat, ci) => (
                  <div key={ci}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#888" }}>{cat.label}</span>
                      <div style={{ flex: 1, height: 1, background: "#E0E0E0" }} />
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {cat.links.map((lnk, li) => (
                        <li key={li} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {li === 0 && <span className="wf-tag">New</span>}
                          <span style={{ fontSize: 11, color: "#555", cursor: "pointer" }}>{lnk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured card placeholder */}
                <div className="wf-img" style={{ height: 280 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16, position: "relative", zIndex: 1, width: "100%" }}>
                    <SkBar w="60%" h={8} dark />
                    <SkBar w="80%" h={12} dark />
                    <div className="wf-btn wf-btn-solid" style={{ marginTop: 12, fontSize: 9, width: "fit-content" }}>Featured CTA</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ═══ PAGE CONTENT SWITCH ═══════════════════════════════════════════════ */}

        {/* ── ALL COLLECTIONS PAGE ────────────────────────────────────────────── */}
        {page === "collections" && (
          <AllCollectionsPage onSelectCollection={goCollection} />
        )}

        {/* ── ARCHIVE PAGE ──────────────────────────────────────────────────── */}
        {page === "archive" && (
          <ArchivePage />
        )}

        {/* ── SINGLE COLLECTION PAGE ─────────────────────────────────────────── */}
        {page === "accessories" && (
        <AccessoriesPage onSelectProduct={goProduct} />
      )}

      {page === "collection" && (
          <SingleCollectionPage
            collectionId={activeCollection}
            onBack={goHome}
            onGoToAllCollections={goCollections}
            onProductClick={goProduct}
          />
        )}

        {/* ── PRODUCT PAGE ───────────────────────────────────────────────────── */}
        {page === "product" && (
          <ProductPage
            onBack={() => { setPage("collection"); window.scrollTo(0,0); }}
            onAddToCart={() => setIsCartOpen(true)}
          />
        )}

        {/* ── HOME PAGE ──────────────────────────────────────────────────────── */}
        {page === "home" && <>

        {/* ═══ 03 · HERO ══════════════════════════════════════════════════════════ */}
        <section style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 16, left: 24, zIndex: 10 }}>
            <Annotation n="3" label="Hero — Cinematic Opening" />
          </div>
          <SkImg label="Hero Full-Width Image (1440 × 720)" style={{ width: "100%", height: 700 }} />
          {/* Hero overlay content */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 20, padding: "0 40px"
          }}>
            <div className="wf-box" style={{ padding: "32px 48px", width: 560, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.88)" }}>
              <SkBar w="55%" h={9} />
              <SkBar w="80%" h={30} dark />
              <SkBar w="70%" h={30} dark />
              <SkBar w="50%" h={11} />
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                <div className="wf-btn wf-btn-solid" style={{ width: 180 }}>Primary CTA</div>
                <div className="wf-btn" style={{ width: 180 }}>Secondary CTA</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 04 · CHOOSE YOUR JOURNEY ══════════════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#fff" }}>
          <Annotation n="4" label="Editorial Paths — Choose Your Journey" />
          <div style={{ textAlign: "center", marginBottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <SkBar w={200} h={9} />
            <SkBar w={320} h={26} dark />
            <SkBar w={260} h={10} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {["Bride", "Groom", "Prêt", "Atelier"].map((label, i) => (
              <div key={i} className="wf-card" style={{ height: 460, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <SkImg label={`${label} Image`} style={{ flex: 1 }} />
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8, borderTop: "1px dashed #DDD" }}>
                  <SkBar w="50%" h={8} />
                  <SkBar w="70%" h={14} dark />
                  <div className="wf-btn" style={{ marginTop: 4, width: "100%", height: 34, fontSize: 8 }}>Discover →</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 05 · BRAND STORY + MARQUEE ════════════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#F7F7F7" }}>
          <Annotation n="5" label="Heritage & Legacy — The House of Virtues" />
          <div className="wf-box-solid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            {/* Left image */}
            <SkImg label="Brand Story Editorial Photo" style={{ height: 560 }} />
            {/* Right copy */}
            <div style={{ padding: "48px 56px", display: "flex", flexDirection: "column", gap: 18, borderLeft: "1.5px solid #E0E0E0" }}>
              <SkBar w="45%" h={9} />
              <SkBar w="75%" h={26} dark />
              <SkBar w="80%" h={26} dark />
              <div style={{ height: 1, background: "#DDD", margin: "8px 0" }} />
              <div style={{ borderLeft: "3px solid #CCC", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <SkBar w="100%" h={9} />
                <SkBar w="85%" h={9} />
                <SkBar w="60%" h={9} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <SkBar w="100%" h={9} />
                <SkBar w="95%" h={9} />
                <SkBar w="80%" h={9} />
              </div>
              {/* 3 Pillars */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, borderTop: "1px dashed #DDD", paddingTop: 20, marginTop: 8 }}>
                {["Est. 2014", "100%", "120+ Hrs"].map((v, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <SkBar w="80%" h={12} dark />
                    <SkBar w="60%" h={8} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="wf-btn wf-btn-solid" style={{ width: 150 }}>Primary CTA</div>
                <div className="wf-btn" style={{ width: 150 }}>Secondary CTA</div>
              </div>
            </div>
          </div>

          {/* Marquee strip */}
          <div style={{ background: "#222", height: 44, overflow: "hidden", display: "flex", alignItems: "center", marginTop: 0, borderTop: "1px solid #333" }}>
            <div className="wf-marquee" style={{ gap: 60 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: i % 2 === 0 ? "#AAA" : "#555" }}>
                  {["Handcrafted in India", "·", "One-of-One Couture", "·", "Heritage Textiles", "·", "Bespoke Fitting Studio"][i % 8]}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 06 · SIGNATURE COLLECTIONS (ASYMMETRIC GRID) ══════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#222" }}>
          <Annotation n="6" label="Signature Collections — Asymmetric Block Grid" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <SkBar w={180} h={9} />
              <SkBar w={300} h={22} />
            </div>
            <div className="wf-btn" style={{ borderColor: "#555", color: "#AAA" }}>View All Collections</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
            <SkImg label="Large Feature Collection (Bridal Edit)" style={{ height: 540 }}>
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 2 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <SkBar w={120} h={8} />
                  <SkBar w={200} h={18} />
                </div>
                <div className="wf-btn" style={{ borderColor: "#777", color: "#CCC" }}>Explore</div>
              </div>
            </SkImg>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Noir Heritage", "The Groom's Chapter"].map((label, i) => (
                <SkImg key={i} label={label} style={{ height: 262 }}>
                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, zIndex: 2 }}>
                    <SkBar w="80%" h={12} />
                  </div>
                </SkImg>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 07 · PRODUCT GRID ══════════════════════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#fff" }} id="women">
          <Annotation n="7" label="Latest Creations — Filterable Product Grid" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <SkBar w={160} h={9} />
              <SkBar w={280} h={22} dark />
            </div>
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "Bridal", "Groom", "Prêt", "Accessories"].map((tab, i) => (
                <div key={tab} className="wf-btn" style={{ height: 34, padding: "0 14px", fontSize: 9, background: i === 0 ? "#333" : undefined, color: i === 0 ? "#fff" : undefined, borderColor: i === 0 ? "#333" : undefined }}>
                  {tab}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="wf-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative" }}>
                  <SkImg label={`Product ${i + 1}`} style={{ height: 340 }} />
                  {/* Tag + Wishlist */}
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span className="wf-tag">{["BESTSELLER","COUTURE","NEW IN","PRE-ORDER"][i % 4]}</span>
                  </div>
                  <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, background: "#fff", border: "1px dashed #CCC", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                    <div style={{ width: 12, height: 12, background: "#E0E0E0" }} />
                  </div>
                  {/* Add to bag hover */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(34,34,34,0.85)", padding: "10px 14px" }}>
                    <div className="wf-btn wf-btn-solid" style={{ width: "100%", height: 32, fontSize: 8 }}>Add to Bag</div>
                  </div>
                </div>
                <div style={{ padding: "12px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
                    <SkBar w="50%" h={8} />
                    <SkBar w="90%" h={10} dark />
                  </div>
                  <SkBar w={52} h={10} dark />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <div className="wf-btn" style={{ width: 220 }}>View All Creations</div>
          </div>
        </section>

        {/* ═══ 08 · CRAFTSMANSHIP & HERITAGE ═════════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#F7F7F7" }}>
          <Annotation n="8" label="Artisanal Details — Craftsmanship & Heritage" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <SkBar w={160} h={9} />
              <SkBar w={320} h={22} dark />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 280 }}>
              <SkBar w="100%" h={9} />
              <SkBar w="70%" h={9} />
            </div>
          </div>
          {/* Video placeholder */}
          <div className="wf-img" style={{ width: "100%", height: 440, marginBottom: 32 }}>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.80)", padding: "20px 32px" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px dashed #999", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "18px solid #999", marginLeft: 4 }} />
              </div>
              <SkBar w={220} h={9} />
              <SkBar w={300} h={14} dark />
            </div>
          </div>
          {/* 4 process cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {["Handwoven Textiles", "Zardozi Handwork", "Atelier Tailoring", "Draping Aesthetics"].map((title, i) => (
              <div key={i} className="wf-box-solid" style={{ overflow: "hidden" }}>
                <SkImg label={`Process ${i + 1}`} style={{ height: 200 }} />
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 8, color: "#AAA", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>0{i + 1} — Process</span>
                  <SkBar w="80%" h={11} dark />
                  <SkBar w="100%" h={9} />
                  <SkBar w="85%" h={9} />
                  <SkBar w="60%" h={9} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 09 · FASHION ARCHIVE / TIMELINE ═══════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#fff" }} id="archive">
          <Annotation n="9" label="Historical Timeline — Fashion Archive" />
          <div style={{ textAlign: "center", marginBottom: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <SkBar w={200} h={9} />
            <SkBar w={300} h={24} dark />
            <SkBar w={260} h={10} />
          </div>
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
            <div className="wf-timeline-line" />
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {["2014", "2016", "2018", "2020", "2022", "2024"].map((year, i) => {
                const isLeft = i % 2 === 0;
                const isActive = activeMilestone === i;
                return (
                  <div key={year} style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", position: "relative", cursor: "pointer" }}
                    onClick={() => setActiveMilestone(isActive ? null : i)}>
                    {/* Dot */}
                    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", border: "2px solid #AAA", background: isActive ? "#555" : "#fff", zIndex: 2, transition: "all 0.2s" }} />
                    {/* Card */}
                    <div style={{ width: "44%", marginLeft: isLeft ? "auto" : 0, marginRight: isLeft ? 0 : "auto", textAlign: isLeft ? "right" : "left" }}>
                      <div className="wf-box" style={{ padding: "18px 20px", borderStyle: isActive ? "solid" : "dashed", borderColor: isActive ? "#888" : "#D4D4D4", background: isActive ? "#F9F9F9" : "#fff" }}>
                        <SkBar w={60} h={16} dark style={{ marginLeft: isLeft ? "auto" : 0 }} />
                        <div style={{ marginTop: 8 }}>
                          <SkBar w="80%" h={10} style={{ marginLeft: isLeft ? "auto" : 0 }} />
                        </div>
                        {isActive && (
                          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                            <SkBar w="100%" h={9} />
                            <SkBar w="85%" h={9} />
                            <SkBar w="60%" h={9} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ 10 · STUDIO REELS CAROUSEL ════════════════════════════════════════ */}
        <section style={{ padding: "64px 0", background: "#111" }} id="journal">
          <div style={{ padding: "0 80px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <Annotation n="10" label="Studio Reels — Instagram Carousel" />
              <SkBar w={260} h={22} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["←", "→"].map(a => (
                <div key={a} style={{ width: 36, height: 36, border: "1.5px solid #444", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", cursor: "pointer", fontSize: 14 }}>{a}</div>
              ))}
            </div>
          </div>
          {/* Reels row */}
          <div style={{ display: "flex", gap: 14, paddingLeft: 80, overflow: "hidden" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ flexShrink: 0, width: 240, height: 430, position: "relative", border: i === 2 ? "2px solid #888" : "1px solid #333", opacity: i === 2 ? 1 : 0.5, transform: i === 2 ? "scale(1)" : "scale(0.95)", transition: "all 0.3s" }}>
                <SkImg label={`Reel ${i + 1}`} style={{ height: "100%", width: "100%" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px", background: "rgba(0,0,0,0.7)", display: "flex", flexDirection: "column", gap: 6 }}>
                  <SkBar w="70%" h={9} />
                  <SkBar w="50%" h={8} />
                </div>
                <div style={{ position: "absolute", top: 12, left: 12, right: 12 }}>
                  <SkBar w="100%" h={3} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 11 · TRUST / USP BAR ══════════════════════════════════════════════ */}
        <section style={{ padding: "48px 80px", background: "#F7F7F7", borderTop: "1.5px dashed #DDD" }}>
          <Annotation n="11" label="Trust Bar — Why Studio Virtues" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {["Handcrafted in India", "Bespoke Fittings", "Heritage Textiles", "Free Studio Shipping"].map((label, i) => (
              <div key={i} className="wf-card" style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
                <div style={{ width: 36, height: 36, border: "2px dashed #CCC", borderRadius: "50%", background: "#EEE" }} />
                <SkBar w="80%" h={10} dark />
                <div style={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>
                  <SkBar w="100%" h={9} />
                  <SkBar w="80%" h={9} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 12 · CLIENT TESTIMONIALS ══════════════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#fff" }}>
          <Annotation n="12" label="Atelier Diaries — Client Testimonials" />
          <div style={{ textAlign: "center", marginBottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <SkBar w={200} h={9} />
            <SkBar w={300} h={24} dark />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="wf-box" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="wf-star" />
                  ))}
                  <span className="wf-tag" style={{ marginLeft: 8 }}>BRIDAL CLIENT</span>
                </div>
                {/* Quote bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <SkBar w="100%" h={9} />
                  <SkBar w="95%" h={9} />
                  <SkBar w="85%" h={9} />
                  <SkBar w="70%" h={9} />
                </div>
                <div style={{ height: 1, background: "#EEE" }} />
                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#DDD", border: "1.5px dashed #CCC" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <SkBar w={90} h={10} dark />
                    <SkBar w={60} h={8} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 13 · PRIVATE CONSULTATION FORM ════════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#1A1A1A" }} id="consultation">
          <Annotation n="13" label="By Appointment Only — Private Consultation" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            {/* Left info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <SkBar w="45%" h={9} />
                <SkBar w="80%" h={26} />
                <SkBar w="70%" h={26} />
              </div>
              <div style={{ height: 1, background: "#333" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px dashed #666", flexShrink: 0 }} />
                    <SkBar w="75%" h={10} />
                  </div>
                ))}
              </div>
              <div style={{ height: 1, background: "#333" }} />
              <div style={{ display: "flex", gap: 32 }}>
                {["Location", "Hours"].map(l => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 14, height: 14, background: "#444" }} />
                    <SkBar w={90} h={9} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div style={{ border: "1.5px dashed #444", background: "#111", padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <SkBar w="55%" h={16} />
                <SkBar w="75%" h={9} />
              </div>
              <div style={{ height: 1, background: "#333" }} />
              {["Full Name", "Email Address", "Phone Number"].map(field => (
                <div key={field} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 9, color: "#777", letterSpacing: "0.2em", textTransform: "uppercase" }}>{field}</label>
                  <input className="wf-input" placeholder={`Enter ${field.toLowerCase()}`} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 9, color: "#777", letterSpacing: "0.2em", textTransform: "uppercase" }}>Preferred Date</label>
                  <input type="date" className="wf-input" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 9, color: "#777", letterSpacing: "0.2em", textTransform: "uppercase" }}>Consultation Type</label>
                  <select className="wf-select">
                    <option>Bridal Couture</option>
                    <option>Groom's Wear</option>
                    <option>Bespoke Commission</option>
                  </select>
                </div>
              </div>
              <div className="wf-btn wf-btn-solid" style={{ width: "100%", height: 46, marginTop: 8, fontSize: 10 }}>Request Studio Booking</div>
            </div>
          </div>
        </section>

        {/* ═══ 14 · NEWSLETTER ════════════════════════════════════════════════════ */}
        <section style={{ padding: "64px 80px", background: "#fff", borderTop: "1.5px solid #EBEBEB" }}>
          <Annotation n="14" label="Stay Connected — Newsletter Signup" />
          <div className="wf-box" style={{ maxWidth: 700, margin: "0 auto", padding: "48px 48px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <SkBar w={180} h={9} />
            <SkBar w={360} h={24} dark />
            <SkBar w={300} h={10} />
            <SkBar w={260} h={10} />
            <div style={{ display: "flex", width: "100%", maxWidth: 460, marginTop: 8, border: "1.5px solid #D4D4D4", overflow: "hidden" }}>
              <input className="wf-input" placeholder="Enter your email address" style={{ flex: 1, border: "none", height: 46 }} />
              <div className="wf-btn wf-btn-solid" style={{ height: 46, borderRadius: 0, whiteSpace: "nowrap", fontSize: 9 }}>Subscribe</div>
            </div>
          </div>
        </section>

        </>}{/* end page === home */}

        {/* ═══ 15 · FOOTER (always visible) ══════════════════════════════════════════ */}
        <footer style={{ background: "#fff", padding: "56px 80px 32px", borderTop: "1.5px solid #EBEBEB" }}>
          <Annotation n="15" label="Footer — 5 Column Layout" />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <SkBar w={180} h={18} dark />
              <SkBar w={100} h={9} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                <SkBar w="100%" h={9} />
                <SkBar w="85%" h={9} />
                <SkBar w="70%" h={9} />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                {["IG", "FB"].map(s => (
                  <div key={s} style={{ width: 30, height: 30, borderRadius: "50%", border: "1.5px dashed #CCC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#AAA" }}>{s}</div>
                ))}
              </div>
            </div>
            {/* Link columns */}
            {[
              { title: "Collections", links: ["Bridal Couture", "Groom Sherwani", "Noir Heritage", "Luxe Prêt", "Accessories"] },
              { title: "Services", links: ["Bespoke", "Atelier Tour", "Virtual Styling", "Size Guide", "Care Guide"] },
              { title: "Atelier", links: ["Our Legacy", "Ahmedabad Studio", "Artisan Clusters", "Careers", "Contact"] },
            ].map((col, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <SkBar w="60%" h={10} dark />
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.links.map((_, li) => <SkBar key={li} w={`${70 + li * 5}%`} h={9} />)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: "#EBEBEB", marginBottom: 20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <SkBar w={260} h={9} />
            <div style={{ display: "flex", gap: 24 }}>
              <SkBar w={100} h={9} />
              <SkBar w={100} h={9} />
            </div>
          </div>
        </footer>

      </div>{/* end outer wrapper */}

      {/* ═══ FLOATING ELEMENTS ══════════════════════════════════════════════════ */}

      {/* WhatsApp float */}
      <div style={{
        position: "fixed", bottom: 88, right: 24, width: 44, height: 44, borderRadius: "50%",
        background: "#E4E4E4", border: "2px dashed #BBB", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)", cursor: "pointer", zIndex: 999
      }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: "#888" }}>WA</span>
      </div>

      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed", bottom: 28, right: 24, width: 44, height: 44,
          border: "1.5px dashed #BBB", background: "#F0F0F0", display: "flex",
          alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 999,
          opacity: scrollY > 300 ? 1 : 0, transition: "opacity 0.3s",
        }}
      >
        <span style={{ fontSize: 14, color: "#888" }}>↑</span>
      </div>

      {/* Page indicator badge */}
      <div style={{
        position: "fixed", bottom: 28, left: 24, background: "#fff",
        border: "1.5px solid #D4D4D4", boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
        padding: "10px 16px", zIndex: 999, display: "flex", alignItems: "center", gap: 10
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B6FD4", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#222", letterSpacing: "0.05em" }}>Studio Virtues — Wireframe</div>
          <div style={{ fontSize: 9, color: "#888", letterSpacing: "0.05em" }}>
            {page === "home" && "Page: Home"}
            {page === "collections" && "Page: All Collections"}
            {page === "collection" && `Page: ${activeCollection.charAt(0).toUpperCase() + activeCollection.slice(1)} Collection`}
            {page === "product" && "Page: Product Detail"}
            {" "} · v1 · {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* Global Modals / Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

    </div>
  );
}

