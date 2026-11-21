import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const RAIN_DROPS = Array.from({ length: 42 }, (_, idx) => {
  // Posiciones deterministas sin Math.random() para render 100% reproducible
  const seed = (idx * 97 + 31) % 100;
  const seed2 = (idx * 53 + 17) % 100;
  return {
    id: idx,
    xPercent: (idx * 2.45 + (seed % 7) * 0.4) % 104 - 2,
    speed: 44 + (seed % 26),
    length: 75 + (seed2 % 95),
    width: idx % 4 === 0 ? 3 : 2,
    phase: (idx * 137) % 1920,
    opacity: 0.22 + (seed % 35) / 100,
  };
});

export const RainOverlay: React.FC<{ intensity: number }> = ({ intensity }) => {
  const frame = useCurrentFrame();

  if (intensity <= 0) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        opacity: intensity,
      }}
    >
      {RAIN_DROPS.map((drop) => {
        const y = ((frame * drop.speed + drop.phase) % 2180) - 220;
        const xDrift = -((frame * drop.speed * 0.22) % 260);
        return (
          <div
            key={drop.id}
            style={{
              position: "absolute",
              left: `${drop.xPercent}%`,
              top: 0,
              width: drop.width,
              height: drop.length,
              borderRadius: 99,
              background:
                "linear-gradient(180deg, rgba(220,238,255,0) 0%, rgba(220,238,255,0.85) 100%)",
              opacity: drop.opacity,
              translate: `${xDrift}px ${y}px`,
              rotate: "12deg",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const LightningFlash: React.FC<{
  enabled: boolean;
  flashFrames?: number[];
}> = ({ enabled, flashFrames = [8, 13, 52, 57] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!enabled) {
    return null;
  }

  let peak = 0;
  for (const center of flashFrames) {
    const val = interpolate(
      frame,
      [center - 2, center, center + Math.round(0.22 * fps)],
      [0, 0.72, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    if (val > peak) {
      peak = val;
    }
  }

  if (peak <= 0.01) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background:
          "radial-gradient(circle at 68% 18%, rgba(255,255,255,0.95) 0%, rgba(186,230,253,0.45) 45%, rgba(0,6,69,0) 100%)",
        opacity: peak,
      }}
    />
  );
};
