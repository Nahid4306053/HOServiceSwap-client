
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      'xl': '1260px',
      '2xl': '1460px'
    }, 
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md:'1rem',
        lg: '1rem',
        xl: '2rem',
        '2xl': '4rem',
      },
    },
    fontFamily: {
    }

  },
  plugins: [require("daisyui")],
}