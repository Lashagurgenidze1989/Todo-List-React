/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgMobileLight: "url('/images/bg-mobile-light.jpg')",
        bgMobileDark: "url('/images/bg-mobile-dark.jpg')",
        bgDesktopLight: "url('/images/bg-desktop-light.jpg')",
        bgDesktopDark: "url('/images/bg-desktop-dark.jpg')",
      },
      boxShadow: {
        boxShadow: "0 35px 50px -15px rgba(194, 195, 214, 0.50)",
        darkBoxShadow: "0px 35px 50px -15px rgba(0, 0, 0, 0.50)",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
