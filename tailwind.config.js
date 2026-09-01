/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hand: ['"Architects Daughter"', "cursive"],
        script: ['"Caveat"', "cursive"],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        stamp: ['"Special Elite"', "monospace"],
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        bp: {
          bg: "#fbfbf6",
          paper: "#f6f4ec",
          ink: "#1e5fa8",
          inkSoft: "#4d8bc9",
          inkFaint: "#b9d2e8",
          grid: "#d4e3f1",
          gridStrong: "#b9d2e8",
          accent: "#d9542a",
          accent2: "#2f8c4d",
          graphite: "#2a2a2a",
          yellow: "#f6e58d",
        },
      },
      letterSpacing: {
        cap: "0.18em",
        tape: "0.2em",
      },
      keyframes: {
        bpBlink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        bpBlink: "bpBlink 1s steps(2) infinite",
      },
    },
  },
  plugins: [],
};
