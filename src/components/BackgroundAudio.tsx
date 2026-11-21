import { Audio } from "@remotion/media";
import React from "react";
import { interpolate, staticFile, useVideoConfig } from "remotion";

interface BackgroundAudioProps {
  enabled: boolean;
  volume: number;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  enabled,
  volume,
}) => {
  const { fps, durationInFrames } = useVideoConfig();

  if (!enabled) {
    return null;
  }

  return (
    <Audio
      src={staticFile("assets/audio/musica-fondo-16lufs.mp3")}
      volume={(f) => {
        const fadeIn = interpolate(f, [0, Math.round(0.4 * fps)], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(
          f,
          [durationInFrames - Math.round(0.9 * fps), durationInFrames],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );
        return volume * fadeIn * fadeOut;
      }}
    />
  );
};
