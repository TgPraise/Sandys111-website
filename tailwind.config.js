/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#14110F",
        "charcoal-800": "#1C1815",
        "charcoal-700": "#26201B",
        cream: "#F6F1E6",
        "cream-dim": "#EAE1CD",
        ink: "#1E1913",
        "ink-dim": "#5B5145",
        "paper-dim": "#B9AF9C",
        gold: "#C2924A",
        "gold-light": "#E4BC7E",
        "gold-deep": "#96702F",
        olive: "#4B5A3E",
        "olive-light": "#6B7C56",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "sans-serif"],
        accent: ["'Bodoni Moda'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 44px -10px rgba(194,146,74,0.5)",
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
