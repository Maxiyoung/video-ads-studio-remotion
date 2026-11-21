import { Video } from "@remotion/media";
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

const CategoryPill: React.FC<{
  label: string;
  index: number;
  accentColor: string;
  textColor: string;
}> = ({ label, index, accentColor, textColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = index * 5;

  return (
    <div
      style={{
        backgroundColor: accentColor,
        color: textColor,
        padding: "12px 26px",
        borderRadius: 999,
        fontFamily: FONT_DISPLAY,
        fontSize: 34,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        boxShadow: "0 10px 24px rgba(0, 6, 69, 0.16)",
        opacity: interpolate(frame, [start, start + Math.round(0.25 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [start, start + Math.round(0.45 * fps)], [0.7, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 13, stiffness: 200 }),
        }),
      }}
    >
      {label}
    </div>
  );
};

const ProductPackshot: React.FC<{
  src: string;
  delay: number;
  left: number;
  bottom: number;
  size: number;
  rotateDeg: number;
}> = ({ src, delay, left, bottom, size, rotateDeg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        left,
        bottom,
        width: size,
        height: size,
        opacity: interpolate(frame, [delay, delay + Math.round(0.3 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0px ${interpolate(frame, [delay, delay + Math.round(0.55 * fps)], [120, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 14, stiffness: 165 }),
        })}px`,
        scale: interpolate(frame, [delay, delay + Math.round(3.6 * fps)], [0.96, 1.05], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        rotate: `${rotateDeg}deg`,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 24px 36px rgba(0, 6, 69, 0.24))",
        }}
      />
    </div>
  );
};

const CatalogBeat: React.FC<{
  catalogo: PintaPlopAdProps["catalogo"];
  marca: PintaPlopAdProps["marca"];
}> = ({ catalogo, marca }) => {
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
      {/* Franja diagonal naranja característica de PintaPlop */}
      <div
        style={{
          position: "absolute",
          top: -110,
          left: -120,
          width: 1400,
          height: 290,
          backgroundColor: marca.naranja,
          rotate: "-5deg",
        }}
      />

      {/* Logo oficial sobre fondo claro integrado sin recuadro */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top - 10,
          left: SAFE_ZONE.left + 8,
          width: 340,
          height: 112,
        }}
      >
        <Img
          src={staticFile("assets/marca/logo-horizontal-claro.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Bloque superior de texto en zona segura */}
      <div
        style={{
          position: "absolute",
          top: SAFE_ZONE.top + 118,
          left: SAFE_ZONE.left + 8,
          right: SAFE_ZONE.right + 4,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 94,
            lineHeight: 0.98,
            letterSpacing: 1.5,
            color: marca.azulMarino,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, Math.round(0.25 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: `0px ${interpolate(frame, [0, Math.round(0.45 * fps)], [50, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 14, stiffness: 185 }),
            })}px`,
          }}
        >
          {catalogo.titulo}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {catalogo.categorias.map((cat, idx) => (
            <CategoryPill
              key={cat}
              label={cat}
              index={idx}
              accentColor={idx === 1 ? marca.naranja : marca.azulMarino}
              textColor={idx === 1 ? marca.negro : "#FFFFFF"}
            />
          ))}
        </div>
      </div>

      {/* Escenario visual de baldes + rodillo */}
      <ProductPackshot
        src="assets/productos/albalatex-20l-cutout.png"
        delay={4}
        left={58}
        bottom={SAFE_ZONE.bottom + 150}
        size={430}
        rotateDeg={-4}
      />
      <ProductPackshot
        src="assets/productos/venier-supercapa-20kg.png"
        delay={10}
        left={430}
        bottom={SAFE_ZONE.bottom + 145}
        size={440}
        rotateDeg={4}
      />

      {/* Sello circular de rodillo / aplicación */}
      <div
        style={{
          position: "absolute",
          right: SAFE_ZONE.right + 12,
          top: 660,
          width: 210,
          height: 210,
          borderRadius: 999,
          overflow: "hidden",
          border: `8px solid ${marca.naranja}`,
          boxShadow: "0 18px 40px rgba(0, 6, 69, 0.25)",
          scale: interpolate(frame, [14, 14 + Math.round(0.45 * fps)], [0.5, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12, stiffness: 190 }),
          }),
          opacity: interpolate(frame, [14, 14 + Math.round(0.25 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Img
          src={staticFile("assets/productos/scene3-rodillo-membrana.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Banda de primeras marcas dentro de la zona segura */}
      <div
        style={{
          position: "absolute",
          left: SAFE_ZONE.left + 8,
          right: SAFE_ZONE.right + 8,
          bottom: SAFE_ZONE.bottom + 16,
          backgroundColor: marca.azulMarino,
          borderLeft: `10px solid ${marca.naranja}`,
          borderRadius: 14,
          padding: "20px 26px",
          opacity: interpolate(frame, [18, 18 + Math.round(0.35 * fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `0px ${interpolate(frame, [18, 18 + Math.round(0.45 * fps)], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 30,
            letterSpacing: 1.6,
            color: "#FFFFFF",
            lineHeight: 1.3,
          }}
        >
          {catalogo.marcas}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BenefitCard: React.FC<{
  titulo: string;
  detalle: string;
  index: number;
  marca: PintaPlopAdProps["marca"];
}> = ({ titulo, detalle, index, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = index * 10;

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.72)",
        borderLeft: `10px solid ${marca.naranja}`,
        borderRadius: 16,
        padding: "22px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        boxShadow: "0 14px 32px rgba(0, 0, 0, 0.32)",
        opacity: interpolate(frame, [delay, delay + Math.round(0.28 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `${interpolate(frame, [delay, delay + Math.round(0.5 * fps)], [-95, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 14, stiffness: 185 }),
        })}px 0px`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 42,
          lineHeight: 1.05,
          letterSpacing: 1.1,
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

const PriceHighlightBadge: React.FC<{
  precio: PintaPlopAdProps["precio"];
  marca: PintaPlopAdProps["marca"];
}> = ({ precio, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!precio.mostrar) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 8,
        backgroundColor: marca.coralOferta,
        border: `4px solid #FFFFFF`,
        borderRadius: 18,
        padding: "18px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        boxShadow: "0 16px 36px rgba(0, 0, 0, 0.35)",
        scale: interpolate(frame, [28, 28 + Math.round(0.45 * fps)], [0.78, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 12, stiffness: 200 }),
        }),
        opacity: interpolate(frame, [28, 28 + Math.round(0.25 * fps)], [0, 1], {
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
          fontSize: 64,
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

const BenefitsBeat: React.FC<{
  beneficios: PintaPlopAdProps["beneficios"];
  precio: PintaPlopAdProps["precio"];
  medios: PintaPlopAdProps["medios"];
  marca: PintaPlopAdProps["marca"];
}> = ({ beneficios, precio, medios, marca }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hasClip = Boolean(medios.clipFondoOpcional?.trim());

  return (
    <AbsoluteFill style={{ backgroundColor: marca.azulMarino, overflow: "hidden" }}>
      {hasClip ? (
        <>
          <Video
            src={staticFile(medios.clipFondoOpcional!.trim())}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(0,6,69,0.82) 0%, rgba(0,0,0,0.68) 55%, rgba(0,6,69,0.92) 100%)",
            }}
          />
        </>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              right: -240,
              top: 380,
              width: 920,
              height: 920,
              borderRadius: 999,
              backgroundColor: marca.naranja,
              opacity: 0.16,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -30,
              bottom: SAFE_ZONE.bottom - 60,
              width: 520,
              height: 620,
              opacity: interpolate(frame, [6, 6 + Math.round(0.4 * fps)], [0, 0.32], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: `${interpolate(frame, [6, 6 + Math.round(0.6 * fps)], [90, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}px 0px`,
            }}
          >
            <Img
              src={staticFile("assets/marca/pintor-pintaplop.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </>
      )}

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

      <AbsoluteFill
        style={{
          paddingTop: SAFE_ZONE.top + 10,
          paddingBottom: SAFE_ZONE.bottom + 24,
          paddingLeft: SAFE_ZONE.left + 8,
          paddingRight: SAFE_ZONE.right + 8,
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 78,
            lineHeight: 0.98,
            letterSpacing: 1.5,
            color: "#FFFFFF",
            textTransform: "uppercase",
            marginBottom: 6,
            opacity: interpolate(frame, [0, Math.round(0.25 * fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ¿POR QUÉ ELEGIR{" "}
          <span style={{ color: marca.naranja }}>PINTAPLOP</span>?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {beneficios.map((item, idx) => (
            <BenefitCard
              key={item.titulo}
              titulo={item.titulo}
              detalle={item.detalle}
              index={idx}
              marca={marca}
            />
          ))}
        </div>

        <PriceHighlightBadge precio={precio} marca={marca} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ShowcaseScene: React.FC<{
  catalogo: PintaPlopAdProps["catalogo"];
  beneficios: PintaPlopAdProps["beneficios"];
  precio: PintaPlopAdProps["precio"];
  medios: PintaPlopAdProps["medios"];
  marca: PintaPlopAdProps["marca"];
}> = ({ catalogo, beneficios, precio, medios, marca }) => {
  const { fps } = useVideoConfig();
  const catalogFrames = Math.round(3.85 * fps);

  return (
    <AbsoluteFill>
      <Sequence name="Catalogo-Productos" from={0} durationInFrames={catalogFrames}>
        <CatalogBeat catalogo={catalogo} marca={marca} />
      </Sequence>
      <Sequence name="Beneficios-Prueba" from={catalogFrames}>
        <BenefitsBeat
          beneficios={beneficios}
          precio={precio}
          medios={medios}
          marca={marca}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
