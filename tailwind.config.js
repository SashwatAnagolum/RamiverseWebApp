/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'white': '#fafafa',
      'lightgrey': '#e4e4e7',
      'darkgrey': '#52525b',
      'black': '#03020c',
      'lightblue': '#e0f2fe',
      'mediumblue': '#0ea5e9',
      'darkblue': '#0369a1',
      'midnightblue': '#082f49',
      'lightgreen': '#d1fae5',
      'mediumgreen': '#34d399',
      'darkgreen': '#065f46',
      'lightred': '#fee2e2',
      'mediumred': '#ef4444',
      'darkred': '#7f1d1d',
    },
    extend: {},
  },
  plugins: [],
}
