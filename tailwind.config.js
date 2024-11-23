/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005CAA",
        secondary: "#F6FBFF",
        tertiary: "#E2F2FF",
        success: "#2CC907",
        info: "#00b0ff",
        warning: "#FFAE00",
        danger: "#DA2834",
        dark100: "#EAEAEA",
        primaryDark: "#3A3A3A",
        secondaryDark: "#4A4A4A",
        tertiaryDark: "#3A3A3A",
        dark700: "#9A9A9A",
        dark800: "#2A2A2A",
        dark600: "#5A5A5A",
        dark500: "#707070",
        dark200: "#EAEAEA",
        lightGreen: "#C9FFBC",
        green100: "#F4FFF2",
        gray100: "#F3F3F3",
        pink600: "#FF7E87",
      },
      dropShadow: {
        primary: "0 2px 4px rgba(0, 92, 170, 0.1)",
      },
      backgroundPosition: {
        "en-dropdown-icon": "calc(100% - 1.3em) center",
        "ar-dropdown-icon": "calc(1.3em) center",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  plugins: [],
}

