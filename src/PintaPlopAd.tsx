import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import type { PintaPlopAdProps } from "./adConfig";
import { BackgroundAudio } from "./components/BackgroundAudio";
import { SafeZoneOverlay } from "./components/SafeZoneOverlay";
import { ensureBrandFonts } from "./fonts";
import { CtaScene } from "./scenes/CtaScene";
import { HookScene } from "./scenes/HookScene";
import { ShowcaseScene } from "./scenes/ShowcaseScene";

export const PintaPlopAd: React.FC<PintaPlopAdProps> = (props) => {
  ensureBrandFonts();
  const { fps } = useVideoConfig();

  // Total con transiciones solapadas:
  // 98 + 248 + 120 - 8 - 8 = 450 frames exactos (15.0s a 30 fps)
  const transitionFrames = 8;
  const hookFrames = Math.round(3 * fps) + transitionFrames; // 98
  const showcaseFrames = Math.round(8 * fps) + transitionFrames; // 248
  const ctaFrames = Math.round(4 * fps); // 120

  return (
    <AbsoluteFill style={{ backgroundColor: props.marca.negro }}>
      <BackgroundAudio
        enabled={props.medios.musicaActiva}
        volume={props.medios.volumenMusica}
      />

      <TransitionSeries>
        <TransitionSeries.Sequence name="01-Gancho-0a3s" durationInFrames={hookFrames}>
          <HookScene hook={props.hook} marca={props.marca} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />

        <TransitionSeries.Sequence
          name="02-Desarrollo-3a11s"
          durationInFrames={showcaseFrames}
        >
          <ShowcaseScene
            catalogo={props.catalogo}
            beneficios={props.beneficios}
            precio={props.precio}
            medios={props.medios}
            marca={props.marca}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom-left" })}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />

        <TransitionSeries.Sequence name="03-Cierre-CTA-11a15s" durationInFrames={ctaFrames}>
          <CtaScene cta={props.cta} marca={props.marca} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {props.mostrarZonaSegura ? <SafeZoneOverlay /> : null}
    </AbsoluteFill>
  );
};
