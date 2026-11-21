import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { BackgroundAudio } from "./components/BackgroundAudio";
import { SafeZoneOverlay } from "./components/SafeZoneOverlay";
import { ensureBrandFonts } from "./fonts";
import { CtaScene } from "./scenes/CtaScene";
import { StormHookScene } from "./scenes/StormHookScene";
import { VenierBenefitsScene } from "./scenes/VenierBenefitsScene";
import { VenierHeroScene } from "./scenes/VenierHeroScene";
import type { VenierStormAdProps } from "./venierStormConfig";

export const VenierStormAd: React.FC<VenierStormAdProps> = (props) => {
  ensureBrandFonts();
  const { fps } = useVideoConfig();

  // Total con 3 transiciones solapadas de 8 frames:
  // 98 + 143 + 129 + 104 - 8 - 8 - 8 = 450 frames exactos (15.00s a 30 fps)
  const transitionFrames = 8;
  const hookFrames = Math.round(3 * fps) + transitionFrames; // 98
  const heroFrames = Math.round(4.5 * fps) + transitionFrames; // 143
  const benefitsFrames = Math.round(4.03 * fps) + transitionFrames; // 129
  const ctaFrames = 450 - (hookFrames + heroFrames + benefitsFrames - transitionFrames * 3); // 104

  return (
    <AbsoluteFill style={{ backgroundColor: props.marca.negro }}>
      <BackgroundAudio
        enabled={props.efectos.musicaActiva}
        volume={props.efectos.volumenMusica}
      />

      <TransitionSeries>
        <TransitionSeries.Sequence
          name="01-Alerta-Tormenta-0a3s"
          durationInFrames={hookFrames}
        >
          <StormHookScene
            hook={props.hook}
            efectos={props.efectos}
            marca={props.marca}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />

        <TransitionSeries.Sequence
          name="02-Venier-Supercapa-3a7.5s"
          durationInFrames={heroFrames}
        >
          <VenierHeroScene producto={props.producto} marca={props.marca} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />

        <TransitionSeries.Sequence
          name="03-Beneficios-Tormenta-7.5a11.5s"
          durationInFrames={benefitsFrames}
        >
          <VenierBenefitsScene
            beneficios={props.beneficios}
            precio={props.precio}
            efectos={props.efectos}
            marca={props.marca}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom-left" })}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />

        <TransitionSeries.Sequence
          name="04-Cierre-CTA-11.5a15s"
          durationInFrames={ctaFrames}
        >
          <CtaScene cta={props.cta} marca={props.marca} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {props.mostrarZonaSegura ? <SafeZoneOverlay /> : null}
    </AbsoluteFill>
  );
};
