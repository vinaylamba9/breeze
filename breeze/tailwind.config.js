/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}
