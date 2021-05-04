const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DIN Condensed", ...fontFamily.sans],
      },
      width: {
        double: "200%",
      },
      inset: {
        15: "15%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
