/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef1f8",
          100: "#d5dcee",
          200: "#aab9dd",
          300: "#7f96cc",
          400: "#5473bb",
          500: "#2950aa",
          600: "#1e3d80",
          700: "#1a2e5a",
          800: "#152444",
          900: "#0f1a30",
        },
      },
    },
  },
  plugins: [],
};
