// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        steel: "#4B6E91",
        graphite: "#2F2F2F",
        soft: "#FAFAFA",
        amber: "#F0B429",
        teal: "#4DB6AC",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
} satisfies Config;
