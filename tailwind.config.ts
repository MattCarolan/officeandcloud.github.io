import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#07080D",
        surface: "#0C0E16",
        panel: "#11131D",
        elevate: "#171A26",
        line: "#1E2230",
        ink: "#EDEEF4",
        muted: "#8A8FA3",
        faint: "#565C72",
        brand: {
          DEFAULT: "#6D5EF6",
          400: "#8B7BFF",
          500: "#6D5EF6",
          600: "#5B4BE0",
          700: "#4A3CC4",
        },
        accent: {
          DEFAULT: "#2DD4E8",
          400: "#4FE0F0",
          500: "#2DD4E8",
        },
        signal: {
          DEFAULT: "#F5B544",
          400: "#FBC861",
          500: "#F5B544",
        },
        ok: "#3ED598",
        danger: "#FF6B6B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(109,94,246,0.55)",
        "glow-accent": "0 0 80px -24px rgba(45,212,232,0.5)",
        panel: "0 24px 60px -24px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-line": {
          "0%": { strokeDashoffset: "200", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 7s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
