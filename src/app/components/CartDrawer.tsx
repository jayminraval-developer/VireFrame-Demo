import React from "react";
import { useIsMobile } from "./ui/use-mobile";
import { SkBar, SkImg, WfBtn } from "./WireframeHelpers";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 999,
          transition: "opacity 0.3s"
        }}
      />
      
      {/* Drawer Panel */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: isMobile ? "100%" : 480,
          background: "#fff",
          zIndex: 1000,
          boxShadow: "-4px 0 24px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.3s ease-out forwards"
        }}
      >
        <style>
          {`
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}
        </style>

        {/* Header */}
        <div style={{ padding: isMobile ? "24px 20px" : "32px 40px", borderBottom: "1.5px solid #EBEBEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Your Bag (2)</span>
          <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: "#888" }}>×</button>
        </div>

        {/* Cart Items (Scrollable) */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "24px 20px" : "32px 40px", display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Item 1 */}
          <div style={{ display: "flex", gap: 20 }}>
            <SkImg label="Product Image" style={{ width: 100, height: 130, flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <SkBar w="70%" h={12} dark />
                <button style={{ background: "transparent", border: "none", color: "#AAA", cursor: "pointer", fontSize: 12 }}>✕</button>
              </div>
              <SkBar w="40%" h={10} />
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid #CCC", padding: "4px 8px" }}>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#888" }}>-</button>
                  <span style={{ fontSize: 10 }}>1</span>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#888" }}>+</button>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#333" }}>INR 1,20,000</span>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "#F0F0F0" }} />

          {/* Item 2 */}
          <div style={{ display: "flex", gap: 20 }}>
            <SkImg label="Accessory Image" style={{ width: 100, height: 130, flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <SkBar w="60%" h={12} dark />
                <button style={{ background: "transparent", border: "none", color: "#AAA", cursor: "pointer", fontSize: 12 }}>✕</button>
              </div>
              <SkBar w="30%" h={10} />
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid #CCC", padding: "4px 8px" }}>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#888" }}>-</button>
                  <span style={{ fontSize: 10 }}>1</span>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#888" }}>+</button>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#333" }}>INR 25,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Summary */}
        <div style={{ padding: isMobile ? "24px 20px" : "32px 40px", background: "#F9F9F9", borderTop: "1.5px solid #EBEBEB", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#666" }}>
            <span>Subtotal</span>
            <span>INR 1,45,000</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#666" }}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div style={{ height: 1, background: "#EBEBEB" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#222" }}>
            <span>Total</span>
            <span>INR 1,45,000</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            <WfBtn solid style={{ height: 52 }}>Proceed to Checkout</WfBtn>
            <WfBtn style={{ height: 52, background: "transparent", border: "1px solid #CCC" }} onClick={onClose}>Continue Shopping</WfBtn>
          </div>
        </div>

      </div>
    </>
  );
}
