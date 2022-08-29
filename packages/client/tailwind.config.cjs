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
