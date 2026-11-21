import React from "react";
import { AbsoluteFill } from "remotion";

export const SAFE_ZONE = {
  top: 220,
  bottom: 340,
  left: 64,
  right: 140,
} as const;

export const SafeZoneOverlay: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 999 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: SAFE_ZONE.top,
          backgroundColor: "rgba(239, 68, 68, 0.18)",
          borderBottom: "2px dashed rgba(239, 68, 68, 0.85)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 10,
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        ZONA UI SUPERIOR (220px)
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: SAFE_ZONE.bottom,
          backgroundColor: "rgba(239, 68, 68, 0.18)",
          borderTop: "2px dashed rgba(239, 68, 68, 0.85)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 12,
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        ZONA UI INFERIOR REELS / TIKTOK / META ADS (340px)
      </div>

      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top,
          bottom: SAFE_ZONE.bottom,
          right: 0,
          width: SAFE_ZONE.right,
          backgroundColor: "rgba(239, 68, 68, 0.14)",
          borderLeft: "2px dashed rgba(239, 68, 68, 0.75)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top,
          bottom: SAFE_ZONE.bottom,
          left: 0,
          width: SAFE_ZONE.left,
          backgroundColor: "rgba(239, 68, 68, 0.14)",
          borderRight: "2px dashed rgba(239, 68, 68, 0.75)",
        }}
      />
    </AbsoluteFill>
  );
};
