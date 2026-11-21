import React from "react";
import { Composition, Folder } from "remotion";
import { PintaPlopAd } from "./PintaPlopAd";
import { VenierStormAd } from "./VenierStormAd";
import { PintaPlopAdSchema } from "./adConfig";
import varianteA from "./data/variante-a-hogar.json";
import varianteB from "./data/variante-b-obra.json";
import venierTormentas from "./data/venier-supercapa-tormentas.json";
import { VenierStormAdSchema } from "./venierStormConfig";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="PintaPlop-Reels-15s">
        <Composition
          id="PintaPlopReelA"
          component={PintaPlopAd}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
          schema={PintaPlopAdSchema}
          defaultProps={varianteA}
        />
        <Composition
          id="PintaPlopReelB"
          component={PintaPlopAd}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
          schema={PintaPlopAdSchema}
          defaultProps={varianteB}
        />
      </Folder>
      <Folder name="Campanas-Producto">
        <Composition
          id="PintaPlopVenierTormentas"
          component={VenierStormAd}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
          schema={VenierStormAdSchema}
          defaultProps={venierTormentas}
        />
      </Folder>
    </>
  );
};
