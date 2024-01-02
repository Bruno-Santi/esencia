/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1423",
        secondary: "#D07380",
        tertiary: "#E5E5E5",
        quaternary: "#372549",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],

        manrope: ["Manrope", "sans-serif"],
      },
      screens: {
        sm: "360px",
        md: "800px",
        lg: "1600px",
      },
    },
  },
  plugins: [],
};
