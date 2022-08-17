const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'media',
    theme: {
        extend: {
          colors: {
            "blue": "var(--blue)",
            "blue-dark": "var(--blue-dark)",
            "blue-light": "var(--blue-light)",
            "blue-alternative": "var(--blue-alternative)",
            "blue-dark-alternative": "var(--blue-dark-alternative)",
            "yellow": "var(--yellow)",
            "yellow-dark": "var(--yellow-dark)",
            "yellow-light": "var(--yellow-light)",
            "yellow-alternative": "var(--yellow-alternative)",
            "yellow-dark-alternative": "var(--yellow-dark-alternative)",
            "orange": "var(--orange)",
            "orange-dark": "var(--orange-dark)",
            "orange-light": "var(--orange-light)",
            "orange-alternative": "var(--orange-alternative)",
            "orange-dark-alternative": "var(--orange-dark-alternative)",
            "white": "var(--white)",
            "black": "var(--black)",
          },
          fontFamily: {
              sans: ['Nunito', ...defaultTheme.fontFamily.sans],
          },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
    important: '#root',
    corePlugins: {
      // Remove Tailwind CSS's preflight style so it can use the MUI's preflight instead (CssBaseline).
      preflight: false,
    },
}
