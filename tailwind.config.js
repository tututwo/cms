/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'buttonHeader':[
          'Noto Sans'
        ],
        'header':['PT Sans Narrow'],
      }
    }
  },
  plugins: []
};