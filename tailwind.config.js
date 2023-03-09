const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      yellow: {
        ...colors.yellow,
        DEFAULT: "#FEF452",
      },
      purple: {
        ...colors.purple,
        DEFAULT: "#942F70",
      },
      secondary: "#14597A",
    },
    extend: {
      backgroundImage: {
        primaryGradient: "linear-gradient(138.11deg, #FEF452 0%, #942F70 121.92%)",
      },
      spacing: {
        112: "28rem",
        128: "32rem",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "active"],
    opacity: ["hover", "focus", "active"],
    extend: {},
  },
  plugins: [],
};
