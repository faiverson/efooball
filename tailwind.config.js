const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
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
                "main-violet": "var(--violet)",
                "violet-dark": "var(--violet-dark)",
                "violet-light": "var(--violet-light)",
                "violet-alternative": "var(--violet-alternative)",
                "violet-dark-alternative": "var(--violet-dark-alternative)",
                "main-orange": "var(--orange)",
                "orange-dark": "var(--orange-dark)",
                "orange-light": "var(--orange-light)",
                "orange-alternative": "var(--orange-alternative)",
                "orange-dark-alternative": "var(--orange-dark-alternative)",
            },
            spacing: {
                '88': '352px',
                '90': '360px',
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
});
