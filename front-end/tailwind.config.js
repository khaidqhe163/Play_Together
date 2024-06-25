/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMain: "#13131a",
        bgSecondary: "#20202b",
        bgButton: "#8d68f2",
        bgButtonHover: "#7b47ff",
        bgSecondButton:"#bcbeff1f",
        textSecondary:"#ADADAD",
        textDetail: "#adadbf",
      }
    },
    fontFamily: {
      poppins: ['Poppins'],
    },
  },
  plugins: [],
}