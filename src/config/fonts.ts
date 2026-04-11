import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export const appFontVariables = `${poppins.variable} ${coolvetica.variable}`;
