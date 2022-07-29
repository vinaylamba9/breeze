/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        "primaryColorWithOpacity": "var(--primary-colorWithOpacity)",
        "secondary-color": "var(--secondary-color)",
        "warning-color": "var(--warning-color)",
        "danger-color": "var(--danger-color)",
        "dangerColorWithOpacity": "var(--danger-colorWithOpacity)",
        "info-color": "var(--info-color)",
        "muted-color": "var(--muted-color)",
        "success-color": "var(--success-color)",
        "text-color-purity": "var(--text-color-purity)",
        "text-color-dark": "var(--text-color-dark)",
        "background-color-light": "var(--background-color-light)",
        "background-color-dark": "var(--background-color-dark)",
        "background-color-ebony": "var(--background-color-ebony)",
        "background-color-metal": "var(--background-color-metal)",
        "background-color-jade": "var(--background-color-jade)",
        "background-color-raven": "var(--background-color-raven)",
        "background-color-leather": "var(--background-color-leather)",
        "background-color-pulp": "var(--background-color-pulp)",
        "color-darkTeal": "var(--color-darkTeal)",
        "color-champagne": "var(--color-champagne)",
        'color-TealWithOpacity': "var(--color-TealWithOpacity)"
      },

      fontSize: {
        "fontsize-strong": "var(--fontsize-strong)",
        "fontsize-tough": "var(--fontsize-tough)",
        "fontsize-pearl": "var(--fontsize-pearl)",
        "fontsize-trim": "var(--fontsize-trim)",
        "fontsize-glossy": "var(--fontsize-glossy)",
        "fontsize-virgin": "var(--fontsize-virgin)",
        "fontsize-brittle": "var(--fontsize-brittle)",
      },
      backgroundImage: {
        'hero-image': "url('./assets/images/home.png')",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        "70%": "70%",
        '80%': "80%",
        '16': '4rem',
        '90%': '90%'
      },
      width: {
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%'
      },
      basis: {
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%'
      }
    },
  },
  plugins: [],
}
