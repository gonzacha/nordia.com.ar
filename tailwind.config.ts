import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        nordia: {
          DEFAULT: "#00ff88",
          dim: "#00cc6a",
          dark: "#00331b"
        }
      }
    }
  },
  plugins: []
};
export default config;
