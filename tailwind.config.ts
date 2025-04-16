import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0e0e0e",
        foreground: "#ffffff",
        accent: "#66e0ff",
      },
      backgroundColor: {
        background: "#0e0e0e",
      },
      textColor: {
        foreground: "#ffffff",
        accent: "#66e0ff",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
