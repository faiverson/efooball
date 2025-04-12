import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            import: importPlugin,
            'jsx-a11y': jsxA11y,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        settings: {
            react: {
                version: 'detect'
            },
            'import/resolver': {
                alias: {
                    map: [
                        ['@', './resources/js']
                    ],
                    extensions: ['.js', '.jsx', '.json']
                }
            }
        },
        rules: {
            // React Rules
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/react-in-jsx-scope': 'off', // Not needed in React 17+
            'react/prop-types': 'off', // If using TypeScript, we don't need prop-types
            'react/jsx-props-no-spreading': 'off',
            'react/jsx-filename-extension': ['warn', { extensions: ['.jsx'] }],

            // React Hooks Rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Import Rules
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/default': 'error',
            'import/namespace': 'error',
            'import/order': ['error', {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                alphabetize: { order: 'asc' }
            }],

            // General JavaScript Rules
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-duplicate-imports': 'error',

            // Accessibility Rules
            'jsx-a11y/anchor-is-valid': 'error',
            'jsx-a11y/click-events-have-key-events': 'error',
            'jsx-a11y/no-static-element-interactions': 'error',

            // Style Rules
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'comma-dangle': ['error', 'always-multiline'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'max-len': ['warn', { code: 120 }]
        }
    }
];
