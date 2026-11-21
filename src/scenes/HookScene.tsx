import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { PintaPlopAdProps } from "../adConfig";
import { SAFE_ZONE } from "../components/SafeZoneOverlay";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";

const DiagonalRibbon: React.FC<{ color: string; top: number; delay: number }> = ({
  color,
  top,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        left: -180,
        top,
        width: 1500,
        height: 120,
        backgroundColor: color,
        rotate: "-9deg",
        opacity: 0.92,
        translate: `${interpolate(frame, [delay, delay + Math.round(0.45 * fps)], [-1100, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 14, stiffness: 180 }),
        })}px 0px`,
      }}
    />
  );
};

const HookBeatOne: React.FC<{
  hook: PintaPlopAdProps["hook"];
  marca: PintaPlopAdProps["marca"];
}> = ({ hook, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE_ZONE.top + 115,
        paddingBottom: SAFE_ZONE.bottom + 20,
        paddingLeft: SAFE_ZONE.left + 12,
        paddingRight: SAFE_ZONE.right + 8,
        justifyContent: "center",
        gap: 28,
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          backgroundColor: marca.naranja,
          color: marca.negro,
          padding: "12px 26px",
          borderRadius: 10,
          fontFamily: FONT_DISPLAY,
          fontSize: 34,
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: interpolate(frame, [0, Math.round(0.2 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `0px ${interpolate(frame, [0, Math.round(0.35 * fps)], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 14, stiffness: 200 }),
          })}px`,
        }}
      >
        {hook.etiquetaSuperior}
      </div>

      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 112,
          lineHeight: 0.96,
          letterSpacing: 1.5,
          color: "#FFFFFF",
          textTransform: "uppercase",
          opacity: interpolate(frame, [3, Math.round(0.25 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [3, Math.round(0.45 * fps)], [1.18, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 13, stiffness: 210 }),
          }),
        }}
      >
        {hook.linea1}
      </div>

      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 118,
          lineHeight: 0.96,
          letterSpacing: 1.5,
          color: marca.naranja,
          textTransform: "uppercase",
          opacity: interpolate(frame, [8, Math.round(0.35 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `${interpolate(frame, [8, Math.round(0.5 * fps)], [-90, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 14, stiffness: 200 }),
          })}px 0px`,
        }}
      >
        {hook.linea2}
      </div>

      <div
        style={{
          position: "absolute",
          right: SAFE_ZONE.right - 20,
          bottom: SAFE_ZONE.bottom + 30,
          width: 310,
          height: 310,
          opacity: interpolate(frame, [6, Math.round(0.4 * fps)], [0, 0.95], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [6, Math.round(0.55 * fps)], [0.72, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 13, stiffness: 170 }),
          }),
          rotate: `${interpolate(frame, [6, Math.round(1.4 * fps)], [-8, 3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}deg`,
        }}
      >
        <Img
          src={staticFile("assets/productos/albalatex-20l-cutout.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 18px 34px rgba(245, 155, 15, 0.35))",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const HookBeatTwo: React.FC<{
  hook: PintaPlopAdProps["hook"];
  marca: PintaPlopAdProps["marca"];
}> = ({ hook, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE_ZONE.top + 115,
        paddingBottom: SAFE_ZONE.bottom + 20,
        paddingLeft: SAFE_ZONE.left + 12,
        paddingRight: SAFE_ZONE.right + 8,
        justifyContent: "center",
        gap: 34,
      }}
    >
      <div
        style={{
          backgroundColor: marca.naranja,
          padding: "28px 32px",
          borderRadius: 18,
          boxShadow: "0 20px 50px rgba(245, 155, 15, 0.35)",
          scale: interpolate(frame, [0, Math.round(0.35 * fps)], [0.78, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12, stiffness: 220 }),
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 96,
            lineHeight: 0.98,
            letterSpacing: 1.5,
            color: marca.negro,
            textTransform: "uppercase",
          }}
        >
          {hook.palabraDestacada}
        </div>
      </div>

      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 44,
          lineHeight: 1.25,
          color: "#FFFFFF",
          opacity: interpolate(frame, [5, Math.round(0.35 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `0px ${interpolate(frame, [5, Math.round(0.45 * fps)], [45, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px`,
        }}
      >
        {hook.subtitulo}
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          marginTop: 8,
          opacity: interpolate(frame, [10, Math.round(0.45 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `0px ${interpolate(frame, [10, Math.round(0.5 * fps)], [35, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 14, stiffness: 180 }),
          })}px`,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 20,
            overflow: "hidden",
            border: `4px solid ${marca.naranja}`,
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile("assets/productos/scene3-rodillo-membrana.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            backgroundColor: marca.azulMarino,
            border: `3px solid ${marca.naranja}`,
            borderRadius: 18,
            padding: "20px 26px",
            fontFamily: FONT_DISPLAY,
            fontSize: 38,
            color: "#FFFFFF",
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          LÁTEX · MEMBRANAS · RODILLOS
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const HookScene: React.FC<{
  hook: PintaPlopAdProps["hook"];
  marca: PintaPlopAdProps["marca"];
}> = ({ hook, marca }) => {
  const { fps } = useVideoConfig();
  const beatOneFrames = Math.round(1.55 * fps);

  return (
    <AbsoluteFill style={{ backgroundColor: marca.negro, overflow: "hidden" }}>
      <DiagonalRibbon color={marca.naranja} top={105} delay={0} />
      <DiagonalRibbon color={marca.azulMarino} top={1660} delay={4} />

      {/* Logo oficial oscuro integrado sin recuadro sobre fondo negro */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top + 8,
          left: SAFE_ZONE.left + 8,
          width: 420,
          height: 106,
          backgroundColor: marca.negro,
          borderRadius: 12,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("assets/marca/logo-horizontal-oscuro.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <Sequence name="Hook-Beat-1" from={0} durationInFrames={beatOneFrames}>
        <HookBeatOne hook={hook} marca={marca} />
      </Sequence>

      <Sequence name="Hook-Beat-2" from={beatOneFrames}>
        <HookBeatTwo hook={hook} marca={marca} />
      </Sequence>
    </AbsoluteFill>
  );
};
