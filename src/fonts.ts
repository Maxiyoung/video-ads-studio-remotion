import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_DISPLAY = "OswaldPintaPlop";
export const FONT_BODY = "OpenSansPintaPlop";

let fontsLoaded = false;

export const ensureBrandFonts = () => {
  if (fontsLoaded) {
    return;
  }
  fontsLoaded = true;

  void Promise.all([
    loadFont({
      family: FONT_DISPLAY,
      url: staticFile("assets/fonts/Oswald-Bold.ttf"),
      weight: "700",
      style: "normal",
    }),
    loadFont({
      family: FONT_BODY,
      url: staticFile("assets/fonts/OpenSans-Bold.ttf"),
      weight: "700",
      style: "normal",
    }),
    loadFont({
      family: FONT_BODY,
      url: staticFile("assets/fonts/OpenSans-Bold.ttf"),
      weight: "400",
      style: "normal",
    }),
  ]);
};
