const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = withMT({
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'media',
    theme: {
        extend: {
          colors: {
            "main-blue": "var(--blue)",
            "blue-dark": "var(--blue-dark)",
            "blue-light": "var(--blue-light)",
            "blue-alternative": "var(--blue-alternative)",
            "blue-dark-alternative": "var(--blue-dark-alternative)",
            "main-yellow": "var(--yellow)",
            "yellow-dark": "var(--yellow-dark)",
            "yellow-light": "var(--yellow-light)",
            "yellow-alternative": "var(--yellow-alternative)",
            "yellow-dark-alternative": "var(--yellow-dark-alternative)",
            "main-orange": "var(--orange)",
            "orange-dark": "var(--orange-dark)",
            "orange-light": "var(--orange-light)",
            "orange-alternative": "var(--orange-alternative)",
            "orange-dark-alternative": "var(--orange-dark-alternative)",
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
});
