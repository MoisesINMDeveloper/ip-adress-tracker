/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      fontFamily: {
        rubik: ["Rubik", "sans - serif"],
      },
      colors: {
        // Primary COLORS
        VeryDarkGray: "hsl(0, 0%, 17%)",
        DarkGray: "hsl(0, 0%, 59%)",
      },
    },
    extend: {
      backgroundImage: {
        mobile: "url('/pattern-bg-mobile.png')",
        desktop: "url('/pattern-bg-desktop.png')",
      },
    },
  },
  plugins: [],
};
