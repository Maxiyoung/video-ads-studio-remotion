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
import { RainOverlay } from "../components/StormEffects";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";
import type { VenierStormAdProps } from "../venierStormConfig";

const BenefitItem: React.FC<{
  titulo: string;
  detalle: string;
  index: number;
  marca: VenierStormAdProps["marca"];
}> = ({ titulo, detalle, index, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = index * 10;

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.76)",
        borderLeft: `10px solid ${marca.naranja}`,
        borderRadius: 16,
        padding: "22px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        boxShadow: "0 16px 34px rgba(0, 0, 0, 0.38)",
        opacity: interpolate(frame, [delay, delay + Math.round(0.25 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `${interpolate(frame, [delay, delay + Math.round(0.48 * fps)], [-95, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 14, stiffness: 190 }),
        })}px 0px`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 42,
          lineHeight: 1.05,
          letterSpacing: 1.2,
          color: marca.naranja,
          textTransform: "uppercase",
        }}
      >
        ✓ {titulo}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 28,
          lineHeight: 1.25,
          color: "#FFFFFF",
        }}
      >
        {detalle}
      </div>
    </div>
  );
};

const OptionalPriceBanner: React.FC<{
  precio: VenierStormAdProps["precio"];
  marca: VenierStormAdProps["marca"];
}> = ({ precio, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!precio.mostrar) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 6,
        backgroundColor: marca.coralOferta,
        border: "4px solid #FFFFFF",
        borderRadius: 18,
        padding: "18px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        boxShadow: "0 16px 38px rgba(0, 0, 0, 0.42)",
        scale: interpolate(frame, [26, 26 + Math.round(0.42 * fps)], [0.76, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 12, stiffness: 205 }),
        }),
        opacity: interpolate(frame, [26, 26 + Math.round(0.22 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 26,
          letterSpacing: 2,
          color: marca.negro,
          textTransform: "uppercase",
        }}
      >
        {precio.etiqueta}
      </div>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 66,
          lineHeight: 1,
          color: "#FFFFFF",
          textTransform: "uppercase",
        }}
      >
        {precio.valor}
      </div>
      {precio.aclaracion ? (
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 24,
            color: marca.negro,
          }}
        >
          {precio.aclaracion}
        </div>
      ) : null}
    </div>
  );
};

export const VenierBenefitsScene: React.FC<{
  beneficios: VenierStormAdProps["beneficios"];
  precio: VenierStormAdProps["precio"];
  efectos: VenierStormAdProps["efectos"];
  marca: VenierStormAdProps["marca"];
}> = ({ beneficios, precio, efectos, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: marca.azulMarino, overflow: "hidden" }}>
      <Img
        src={staticFile("assets/tormentas/scene1-tormenta-techo.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          scale: interpolate(frame, [0, Math.round(4.5 * fps)], [1.05, 1.14], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,6,69,0.92) 0%, rgba(0,6,69,0.78) 55%, rgba(0,0,0,0.94) 100%)",
        }}
      />

      <RainOverlay intensity={efectos.intensidadLluvia * 0.45} />

      {/* Balde sutil anclando el producto en el fondo derecho */}
      <div
        style={{
          position: "absolute",
          right: -40,
          bottom: SAFE_ZONE.bottom - 55,
          width: 440,
          height: 440,
          opacity: interpolate(frame, [4, 4 + Math.round(0.35 * fps)], [0, 0.34], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          rotate: "6deg",
        }}
      >
        <Img
          src={staticFile("assets/productos/venier-supercapa-20kg.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Franja superior naranja */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 18,
          backgroundColor: marca.naranja,
        }}
      />

      {/* Logo oficial en cabecera para equilibrar el encuadre vertical */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top + 8,
          left: SAFE_ZONE.left + 8,
          width: 360,
          height: 92,
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

      <AbsoluteFill
        style={{
          paddingTop: SAFE_ZONE.top + 110,
          paddingBottom: SAFE_ZONE.bottom + 24,
          paddingLeft: SAFE_ZONE.left + 10,
          paddingRight: SAFE_ZONE.right + 10,
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 78,
            lineHeight: 0.96,
            letterSpacing: 1.5,
            color: "#FFFFFF",
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, Math.round(0.25 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          PROTECCIÓN REAL{" "}
          <span style={{ color: marca.naranja }}>CONTRA TORMENTAS</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {beneficios.map((item, idx) => (
            <BenefitItem
              key={item.titulo}
              titulo={item.titulo}
              detalle={item.detalle}
              index={idx}
              marca={marca}
            />
          ))}
        </div>

        <OptionalPriceBanner precio={precio} marca={marca} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
