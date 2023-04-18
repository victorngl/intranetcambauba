/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      current: 'currentColor',
      'primary': '#1d4ed8',
      'primary-hover': '#1d4ed8',
      'secondary': '#52525b',
      'text-primary': '#0e7490',
    },
    extend: {
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

