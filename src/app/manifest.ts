import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "kesehatanku",
    short_name: "kesehatanku",
    description: "Sistem pakar diagnosa gizi buruk pada anak menggunakan metode Centainty Factory",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#18181b",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
