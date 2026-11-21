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
import { SAFE_ZONE } from "../components/SafeZoneOverlay";
import { LightningFlash, RainOverlay } from "../components/StormEffects";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";
import type { VenierStormAdProps } from "../venierStormConfig";

const StormBeatOne: React.FC<{
  hook: VenierStormAdProps["hook"];
  marca: VenierStormAdProps["marca"];
}> = ({ hook, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile("assets/tormentas/scene1-tormenta-techo.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, Math.round(1.6 * fps)], [1.04, 1.16], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,6,69,0.52) 42%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          paddingTop: SAFE_ZONE.top + 115,
          paddingBottom: SAFE_ZONE.bottom + 24,
          paddingLeft: SAFE_ZONE.left + 12,
          paddingRight: SAFE_ZONE.right + 10,
          justifyContent: "center",
          gap: 24,
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
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.45)",
            opacity: interpolate(frame, [0, Math.round(0.2 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: `0px ${interpolate(frame, [0, Math.round(0.35 * fps)], [-42, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 13, stiffness: 210 }),
            })}px`,
          }}
        >
          ALERTA · {hook.etiquetaAlerta}
        </div>

        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 108,
            lineHeight: 0.96,
            letterSpacing: 1.5,
            color: "#FFFFFF",
            textTransform: "uppercase",
            textShadow: "0 12px 32px rgba(0, 0, 0, 0.72)",
            opacity: interpolate(frame, [2, Math.round(0.25 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [2, Math.round(0.45 * fps)], [1.18, 1], {
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
            fontSize: 112,
            lineHeight: 0.96,
            letterSpacing: 1.5,
            color: marca.naranja,
            textTransform: "uppercase",
            textShadow: "0 12px 32px rgba(0, 0, 0, 0.75)",
            opacity: interpolate(frame, [7, Math.round(0.35 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: `${interpolate(frame, [7, Math.round(0.48 * fps)], [-90, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 13, stiffness: 200 }),
            })}px 0px`,
          }}
        >
          {hook.linea2}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const StormBeatTwo: React.FC<{
  hook: VenierStormAdProps["hook"];
  marca: VenierStormAdProps["marca"];
}> = ({ hook, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile("assets/tormentas/scene2-filtracion-techo.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, Math.round(1.8 * fps)], [1.12, 1.02], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.58) 45%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          paddingTop: SAFE_ZONE.top + 115,
          paddingBottom: SAFE_ZONE.bottom + 30,
          paddingLeft: SAFE_ZONE.left + 12,
          paddingRight: SAFE_ZONE.right + 10,
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            backgroundColor: marca.naranja,
            padding: "28px 34px",
            borderRadius: 18,
            boxShadow: "0 20px 55px rgba(245, 155, 15, 0.4)",
            scale: interpolate(frame, [0, Math.round(0.35 * fps)], [0.76, 1], {
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
              lineHeight: 0.96,
              letterSpacing: 1.5,
              color: marca.negro,
              textTransform: "uppercase",
            }}
          >
            {hook.impactoGotera}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(0, 6, 69, 0.88)",
            borderLeft: `10px solid ${marca.naranja}`,
            borderRadius: 14,
            padding: "22px 26px",
            fontFamily: FONT_BODY,
            fontSize: 40,
            lineHeight: 1.25,
            color: "#FFFFFF",
            opacity: interpolate(frame, [4, Math.round(0.3 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: `0px ${interpolate(frame, [4, Math.round(0.45 * fps)], [45, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}px`,
          }}
        >
          {hook.bajadaImpacto}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const StormHookScene: React.FC<{
  hook: VenierStormAdProps["hook"];
  efectos: VenierStormAdProps["efectos"];
  marca: VenierStormAdProps["marca"];
}> = ({ hook, efectos, marca }) => {
  const { fps } = useVideoConfig();
  const beatOneFrames = Math.round(1.55 * fps);

  return (
    <AbsoluteFill style={{ backgroundColor: marca.negro, overflow: "hidden" }}>
      <Sequence name="Tormenta-Alerta" from={0} durationInFrames={beatOneFrames}>
        <StormBeatOne hook={hook} marca={marca} />
      </Sequence>

      <Sequence name="Tormenta-Gotera" from={beatOneFrames}>
        <StormBeatTwo hook={hook} marca={marca} />
      </Sequence>

      <RainOverlay intensity={efectos.intensidadLluvia} />
      <LightningFlash enabled={efectos.relampagosActivos} />

      {/* Diagonal superior sutil naranja */}
      <div
        style={{
          position: "absolute",
          left: -140,
          top: 90,
          width: 1400,
          height: 36,
          backgroundColor: marca.naranja,
          rotate: "-6deg",
        }}
      />

      {/* Logo oficial oscuro sobre fondo oscuro sin recuadro */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top + 8,
          left: SAFE_ZONE.left + 8,
          width: 410,
          height: 102,
        }}
      >
        <Img
          src={staticFile("assets/marca/logo-horizontal-oscuro.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mixBlendMode: "lighten",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
