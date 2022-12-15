/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#0B3779",
          "dark": "#072249",
        },
        gray: {
          DEFAULT: "#CCCCCC",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },

      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      fontSize: {
        bigger: "1.5rem",
        large: "2rem",
      },
      boxShadow: {
        DEFAULT: "0px 4px 14px 2px rgba(0, 0, 0, 0.15)",
      },
      margin: {
        60: "3.75rem",
      },  
    },
  },
  plugins: [],
}