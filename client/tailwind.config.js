/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/tw-elements-react/dist/js/**/*.js"],
  darkMode: "class",
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
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        sm: "360px",
        tablet: "600px",
        md: "1200px",
        lg: "1890px",
      },
    },
  },
  plugins: ["tw-elements-react/dist/plugin.cjs"],
};
