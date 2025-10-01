// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-orbitron)", "sans-serif"],
      },
      keyframes: {
        slideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(var(--slide-distance))" },
        },
      },
      animation: {
        slideLeft: "slideLeft 30s linear infinite",
      },
      fontFamily: {
        "neue-haas": ['"Neue Haas Grotesk Text Pro"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
