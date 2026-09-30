/** @type {import('tailwindcss').Config} */
const config = {
  safelist: ["row-span-1", "row-span-2"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        scrollX: "scrollX 30s linear infinite",
        "rotate-cover": "rotate-cover linear both",
      },
      keyframes: {
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "rotate-cover": {
          "0%": {
            transform: "translateX(-100%) scale(0.75)",
            "z-index": 1,
          },
          "35%": {
            transform: "translateX(0) scale(0.875)",
            "z-index": 2,
          },
          "50%": {
            transform: "translateZ(1em)",
            "z-index": 100,
          },
          "65%": {
            transform: "translateX(0) scale(0.825)",
            "z-index": 2,
          },
          "100%": {
            transform: "translateX(100%) scale(0.75)",
            "z-index": 1,
          },
        },
      },
    },
  },
  variants: {
    extend: {
      scrollSnapAlign: ["center"],
    },
  },
  darkMode: "class",
};

export default config;
