/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMain: "#13131a",
        bgSecondary: "#20202b",
        bgButton: "#8d68f2",
        textSecondary:"#ADADAD"
      }
    },
  },
  plugins: [],
}