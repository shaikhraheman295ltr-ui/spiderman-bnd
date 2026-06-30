import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        web: "var(--web)",
        red: {
          DEFAULT: "var(--red)",
          glow: "var(--red-glow)",
        },
        blue: {
          DEFAULT: "var(--blue)",
          glow: "var(--blue-glow)",
        },
        gold: "var(--gold)",
        silver: "var(--silver)",
        white: "var(--white)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        editorial: ["var(--font-editorial)"],
        mono: ["var(--font-mono)"],
      },
      zIndex: {
        content: "var(--z-content)",
        overlay: "var(--z-overlay)",
        nav: "var(--z-nav)",
        modal: "var(--z-modal)",
        cursor: "var(--z-cursor)",
      },
      transitionTimingFunction: {
        "spidey": "var(--ease-spidey)",
        "out-spidey": "var(--ease-out-spidey)",
        "web-snap": "var(--ease-web-snap)",
      },
    },
  },
  plugins: [],
};
export default config;
