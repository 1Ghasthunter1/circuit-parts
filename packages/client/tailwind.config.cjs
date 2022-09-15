/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        '600': '600px',
      },
      scale: {
        '102': "1.02"
      },
      colors: {
        "primary": {
          "50": "#FDECF5",
          "100": "#FCDAEB",
          "200": "#F8B4D6",
          "300": "#F58ABF",
          "400": "#F164AB",
          "500": "#EE3E96",
          "600": "#DC1378",
          "700": "#A40E59",
          "800": "#700A3D",
          "900": "#38051F"
        }
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['even'],
      display: ["group-hover"],
    }
  },
  plugins: []
}
