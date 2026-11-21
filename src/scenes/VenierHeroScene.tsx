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
import { SAFE_ZONE } from "../components/SafeZoneOverlay";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";
import type { VenierStormAdProps } from "../venierStormConfig";

const FeatureBadge: React.FC<{
  label: string;
  index: number;
  bgColor: string;
  textColor: string;
}> = ({ label, index, bgColor, textColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 10 + index * 6;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: "11px 22px",
        borderRadius: 999,
        fontFamily: FONT_DISPLAY,
        fontSize: 32,
        letterSpacing: 1.4,
        textTransform: "uppercase",
        boxShadow: "0 10px 24px rgba(0, 6, 69, 0.18)",
        opacity: interpolate(frame, [delay, delay + Math.round(0.22 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [delay, delay + Math.round(0.45 * fps)], [0.68, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 13, stiffness: 205 }),
        }),
      }}
    >
      {label}
    </div>
  );
};

const VenierBucketHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        bottom: SAFE_ZONE.bottom + 135,
        width: 590,
        height: 590,
        opacity: interpolate(frame, [4, Math.round(0.35 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0px ${interpolate(frame, [4, Math.round(0.6 * fps)], [150, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 13, stiffness: 165 }),
        })}px`,
        scale: interpolate(frame, [10, Math.round(4.6 * fps)], [0.97, 1.07], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Img
        src={staticFile("assets/productos/venier-supercapa-20kg.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 28px 44px rgba(0, 6, 69, 0.34))",
        }}
      />
    </div>
  );
};

export const VenierHeroScene: React.FC<{
  producto: VenierStormAdProps["producto"];
  marca: VenierStormAdProps["marca"];
}> = ({ producto, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: marca.fondoClaro,
        backgroundImage:
          "radial-gradient(rgba(0, 6, 69, 0.08) 2px, transparent 2px)",
        backgroundSize: "28px 28px",
        overflow: "hidden",
      }}
    >
      {/* Mitad superior con fotografía real de rodillo aplicando membrana */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 670,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("assets/tormentas/scene3-rodillo-membrana.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: interpolate(frame, [0, Math.round(4.8 * fps)], [1.02, 1.12], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(0,6,69,0.78) 0%, rgba(0,6,69,0.48) 65%, rgba(249,247,244,1) 100%)",
          }}
        />
      </div>

      {/* Diagonal naranja PintaPlop separando la foto del producto */}
      <div
        style={{
          position: "absolute",
          left: -140,
          top: 605,
          width: 1450,
          height: 70,
          backgroundColor: marca.naranja,
          rotate: "-4.5deg",
        }}
      />

      {/* Logo oficial oscuro en la banda superior azul oscura */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top + 4,
          left: SAFE_ZONE.left + 8,
          width: 340,
          height: 88,
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

      {/* Encabezado de producto dentro de zona segura */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top + 104,
          left: SAFE_ZONE.left + 10,
          right: SAFE_ZONE.right + 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 44,
            letterSpacing: 4,
            color: marca.naranja,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, Math.round(0.25 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          LA SOLUCIÓN DEFINITIVA · {producto.marcaProducto}
        </div>

        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 122,
            lineHeight: 0.92,
            letterSpacing: 2,
            color: "#FFFFFF",
            textTransform: "uppercase",
            textShadow: "0 12px 30px rgba(0, 0, 0, 0.45)",
            scale: interpolate(frame, [2, Math.round(0.45 * fps)], [0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 13, stiffness: 200 }),
            }),
          }}
        >
          {producto.nombreProducto}
        </div>

        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 34,
            letterSpacing: 1.5,
            color: "#FFFFFF",
            backgroundColor: marca.azulMarino,
            alignSelf: "flex-start",
            padding: "8px 18px",
            borderRadius: 10,
            marginTop: 6,
          }}
        >
          {producto.presentacion}
        </div>
      </div>

      {/* Pills técnicas debajo de la diagonal */}
      <div
        style={{
          position: "absolute",
          top: 710,
          left: SAFE_ZONE.left + 8,
          right: SAFE_ZONE.right + 8,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {producto.badges.map((badge, idx) => (
          <FeatureBadge
            key={badge}
            label={badge}
            index={idx}
            bgColor={idx === 0 ? marca.naranja : marca.azulMarino}
            textColor={idx === 0 ? marca.negro : "#FFFFFF"}
          />
        ))}
      </div>

      {/* Balde héroe Venier Supercapa 20kg */}
      <VenierBucketHero />

      {/* Sello flotante 20 KG a la derecha del balde */}
      <div
        style={{
          position: "absolute",
          right: SAFE_ZONE.right + 12,
          top: 970,
          width: 215,
          height: 215,
          borderRadius: 999,
          backgroundColor: marca.azulMarino,
          border: `8px solid ${marca.naranja}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 18px 36px rgba(0, 6, 69, 0.3)",
          scale: interpolate(frame, [16, 16 + Math.round(0.45 * fps)], [0.4, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12, stiffness: 200 }),
          }),
          rotate: "-7deg",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 74,
            lineHeight: 0.95,
            color: marca.naranja,
          }}
        >
          20 KG
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 26,
            letterSpacing: 1.5,
            color: "#FFFFFF",
          }}
        >
          BALDE 20 L
        </div>
      </div>

      {/* Frase de cierre del bloque producto en zona segura */}
      <div
        style={{
          position: "absolute",
          left: SAFE_ZONE.left + 8,
          right: SAFE_ZONE.right + 8,
          bottom: SAFE_ZONE.bottom + 14,
          backgroundColor: marca.azulMarino,
          borderLeft: `10px solid ${marca.naranja}`,
          borderRadius: 14,
          padding: "18px 24px",
          opacity: interpolate(frame, [18, 18 + Math.round(0.35 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `0px ${interpolate(frame, [18, 18 + Math.round(0.45 * fps)], [38, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 30,
            color: "#FFFFFF",
            lineHeight: 1.25,
          }}
        >
          {producto.fraseClima}
        </div>
      </div>
    </AbsoluteFill>
  );
};
