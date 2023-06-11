import React, { useEffect } from "react";

export default function GlassBackground() {

  return (
    <div
      id="glass-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        zIndex: 999,
      }}
    ></div>
  );
}
