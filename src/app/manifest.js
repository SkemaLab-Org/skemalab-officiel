import { siteConfig } from "@/data/content";

export default function manifest() {
  return {
    name: "Skemalab | Studio Digital",
    short_name: "Skemalab",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080c0e",
    theme_color: "#080c0e",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
