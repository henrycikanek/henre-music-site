import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0e0c",
        foreground: "#ffffff",
        accent: "#D4A574",
        "accent-light": "#E2BA8E",
        gray: {
          50: "#faf9f7",
          100: "#f0eeea",
          200: "#e0ddd6",
          300: "#c8c3b8",
          400: "#a9a295",
          500: "#8a8275",
          600: "#6e675c",
          700: "#514c43",
          800: "#1e1c18",
          900: "#151310",
          950: "#0c0b09",
        },
      },
      backgroundColor: {
        background: "#0f0e0c",
      },
      textColor: {
        foreground: "#ffffff",
        accent: "#D4A574",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
