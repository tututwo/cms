/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'buttonHeader':[
          'Georgia',
        ],
        'header':['Georgia'],
      }
    }
  },
  plugins: []
};