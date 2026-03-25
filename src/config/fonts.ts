import { Manrope, Newsreader } from "next/font/google";
import localFont from "next/font/local";

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const coolvetica = localFont({
  variable: "--font-coolvetica",
  display: "swap",
  src: [
    {
      path: "../../public/Coolvetica/Coolvetica Rg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Coolvetica/Coolvetica Rg It.otf",
      weight: "400",
      style: "italic",
    },
  ],
});

export const appFontVariables = `${manrope.variable} ${newsreader.variable} ${coolvetica.variable}`;
