/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#ffffff",
        background: "#121214",
        primary: "#7400a8",
        secondary: "#3f2052",
        accent: "#9c4dff",
      },
    },
  },
  plugins: [],
}
