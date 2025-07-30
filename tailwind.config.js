import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import ('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["text-secondary"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["var(--font-urbanist)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#EFEFEF",
        secondary: "#FF6F61",
        tertiary: "#262621",
        worries: "#667085",
        backLog: "#FF6F61",
        bg: {
          primarybg: "#DAEBFF",
        },
        border: {
          primary: "#EFF7FF",
        },
      },
    },
  },
  plugins: [scrollbar],
};
