/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      animation: {
        click: "click 100ms linear",
      },
      keyframes: {
        click: {
          "0%, 100%": {transform: "scale(1)"},
          "50%": {transform: "scale(1.1)"}
        }
      }
    },
  },
  plugins: [],
}
