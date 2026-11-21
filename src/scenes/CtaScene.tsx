import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { PintaPlopAdProps } from "../adConfig";
import { SAFE_ZONE } from "../components/SafeZoneOverlay";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";

const PulsingCtaButton: React.FC<{
  label: string;
  accentColor: string;
  textColor: string;
}> = ({ label, accentColor, textColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulsePhase = Math.sin((frame / fps) * Math.PI * 3.2);

  return (
    <div
      style={{
        backgroundColor: accentColor,
        color: textColor,
        padding: "30px 38px",
        borderRadius: 20,
        textAlign: "center",
        fontFamily: FONT_DISPLAY,
        fontSize: 54,
        letterSpacing: 1.8,
        textTransform: "uppercase",
        boxShadow: "0 20px 55px rgba(245, 155, 15, 0.45)",
        scale:
          interpolate(frame, [8, 8 + Math.round(0.45 * fps)], [0.75, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12, stiffness: 200 }),
          }) *
          (1 + pulsePhase * 0.028),
      }}
    >
      {label}
    </div>
  );
};

export const CtaScene: React.FC<{
  cta: PintaPlopAdProps["cta"];
  marca: PintaPlopAdProps["marca"];
}> = ({ cta, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: marca.negro, overflow: "hidden" }}>
      {/* Fondo radial sutil de marca sin datos sensibles */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 82% 48%, rgba(245,155,15,0.22) 0%, rgba(0,6,69,0.45) 38%, rgba(0,0,0,1) 74%)",
          scale: interpolate(frame, [0, 4 * fps], [1, 1.08], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Diagonal naranja PintaPlop */}
      <div
        style={{
          position: "absolute",
          left: -180,
          top: 1560,
          width: 1500,
          height: 150,
          backgroundColor: marca.naranja,
          rotate: "-7deg",
        }}
      />

      <AbsoluteFill
        style={{
          paddingTop: SAFE_ZONE.top + 30,
          paddingBottom: SAFE_ZONE.bottom + 36,
          paddingLeft: SAFE_ZONE.left + 12,
          paddingRight: SAFE_ZONE.right + 12,
          justifyContent: "space-between",
        }}
      >
        {/* Logo oficial sobre fondo oscuro integrado sin recuadro */}
        <div
          style={{
            width: 560,
            height: 142,
            mixBlendMode: "lighten",
            opacity: interpolate(frame, [0, Math.round(0.3 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: `0px ${interpolate(frame, [0, Math.round(0.45 * fps)], [-35, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 14, stiffness: 180 }),
            })}px`,
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

        {/* Titular y botón CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 96,
              lineHeight: 0.98,
              letterSpacing: 1.5,
              color: "#FFFFFF",
              textTransform: "uppercase",
              opacity: interpolate(frame, [4, 4 + Math.round(0.3 * fps)], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: `0px ${interpolate(frame, [4, 4 + Math.round(0.45 * fps)], [45, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}px`,
            }}
          >
            {cta.titular}
          </div>

          <PulsingCtaButton
            label={cta.boton}
            accentColor={marca.naranja}
            textColor={marca.azulMarino}
          />
        </div>

        {/* Zócalo de contacto (demo sanitizado) */}
        <div
          style={{
            backgroundColor: "rgba(0, 6, 69, 0.9)",
            border: `3px solid ${marca.naranja}`,
            borderRadius: 18,
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: interpolate(frame, [14, 14 + Math.round(0.35 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 36,
              letterSpacing: 1.2,
              color: marca.naranja,
              textTransform: "uppercase",
            }}
          >
            ENVÍO GRATIS EN CÓRDOBA CAPITAL
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 28,
              color: "#FFFFFF",
              lineHeight: 1.35,
            }}
          >
            {cta.direccion} · {cta.horario}
          </div>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 26,
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            WhatsApp {cta.whatsapp} · {cta.instagram} · pintaplop.com
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
