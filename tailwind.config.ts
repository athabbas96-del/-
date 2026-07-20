import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2A1E3B",        // البنفسجي الحبري الأساسي
        ground: "#EAE9E9",     // الأرضية الفاتحة
        paper: "#EEEFED",      // أبيض النصوص
        night: "#201C1C",      // الحبر الداكن
        violet: "#4C3B6C",     // البنفسجي المساعد
        satin: {
          900: "#151313",
          800: "#231932",
          700: "#392A50",
          500: "#55406F",
          300: "#85729D",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        arabic: ["var(--font-arabic)", "IBM Plex Sans Arabic", "sans-serif"],
        script: ["var(--font-script)", "Great Vibes", "cursive"],
      },
      letterSpacing: { widest2: "0.35em" },
    },
  },
  plugins: [],
};
export default config;
