/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: 'var(--dark-primary)',
          secondary: 'var(--dark-secondary)',
          grey: 'var(--dark-grey)'
        },
        light: {
          primary: 'var(--light-primary)',
          secondary: 'var(--light-secondary)',
          grey: 'var(--light-grey)',
        },
      },
      textColor: {
        dark: {
          primary: 'var(--dark-text-primary)',
          secondary: 'var(--dark-text-secondary)',
        },
        light: {
          primary: 'var(--light-text-primary)',
          secondary: 'var(--light-text-secondary)',
          hint: 'var(--light-text-hint)',
          white: 'var(--light-text-white)',
          grey: 'var(--light-text-grey)',
        },
      },
      backgroundColor: {
        dark: {
          primary: 'var(--dark-bg-primary)',
          secondary: 'var(--dark-bg-secondary)',
        },
        light: {
          primary: 'var(--light-bg-primary)',
          secondary: 'var(--light-bg-secondary)',
        },
      },
    },
  },
  plugins: [],
};
