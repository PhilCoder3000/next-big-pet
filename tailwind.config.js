/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#EFFF04',
          secondary: '#242424',
          grey: '#979797'
        },
        light: {
          primary: '#3786FB',
          secondary: '#E6F1FF',
        },
      },
      textColor: {
        dark: {
          primary: '#111111',
          secondary: '#979797',
        },
        light: {
          primary: '#FFFFFF',
          secondary: '#3786FB',
          hint: '#4D515B',
          white: '#FFFFFF',
          grey: '#676A73',
        },
      },
      backgroundColor: {
        dark: {
          primary: '#EFFF04',
          secondary: '#242424',
        },
        light: {
          primary: '#3786FB',
          secondary: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};
