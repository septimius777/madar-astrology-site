import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Named token system — see design brief. Six celestial stops
        // covering the day → night journey, used everywhere instead
        // of ad-hoc hex values.
        dawn: {
          white: "#FBF3E7",
          blue: "#9FC1D9",
        },
        gold: "#F2A94D",
        ember: "#E1552E",
        dusk: "#2A2560",
        night: {
          navy: "#070B22",
          DEFAULT: "#070B22",
        },
        moon: "#F1ECE2",
        star: "#FDFBF7",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
} satisfies Config;
