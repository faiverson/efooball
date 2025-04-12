const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
        './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
    ],

    darkMode: 'media',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Primary Colors - Blue
                primary: {
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                    950: 'var(--color-primary-950)',
                },
                // Secondary Colors - Purple
                secondary: {
                    50: 'var(--color-secondary-50)',
                    100: 'var(--color-secondary-100)',
                    200: 'var(--color-secondary-200)',
                    300: 'var(--color-secondary-300)',
                    400: 'var(--color-secondary-400)',
                    500: 'var(--color-secondary-500)',
                    600: 'var(--color-secondary-600)',
                    700: 'var(--color-secondary-700)',
                    800: 'var(--color-secondary-800)',
                    900: 'var(--color-secondary-900)',
                    950: 'var(--color-secondary-950)',
                },
                // Accent Colors - Yellow
                accent: {
                    50: 'var(--color-accent-50)',
                    100: 'var(--color-accent-100)',
                    200: 'var(--color-accent-200)',
                    300: 'var(--color-accent-300)',
                    400: 'var(--color-accent-400)',
                    500: 'var(--color-accent-500)',
                    600: 'var(--color-accent-600)',
                    700: 'var(--color-accent-700)',
                    800: 'var(--color-accent-800)',
                    900: 'var(--color-accent-900)',
                    950: 'var(--color-accent-950)',
                },
                // Neutral Colors - Gray
                neutral: {
                    50: 'var(--color-neutral-50)',
                    100: 'var(--color-neutral-100)',
                    200: 'var(--color-neutral-200)',
                    300: 'var(--color-neutral-300)',
                    400: 'var(--color-neutral-400)',
                    500: 'var(--color-neutral-500)',
                    600: 'var(--color-neutral-600)',
                    700: 'var(--color-neutral-700)',
                    800: 'var(--color-neutral-800)',
                    900: 'var(--color-neutral-900)',
                    950: 'var(--color-neutral-950)',
                },
            },
            maxWidth: {
                '8xl': '88rem',
            },
            spacing: {
                '18': '4.5rem',
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@material-tailwind/react/utils/withMT')
    ],
});
