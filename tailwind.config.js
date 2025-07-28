// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",     // white
        foreground: "hsl(240, 10%, 10%)",   // dark gray
        border: "hsl(240, 6%, 90%)",        // light gray
      },
    },
  },
  plugins: [],
};

