/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      flex: {
        aside: "1 1 33%",
        chart: "2 1 67%",
      },
    },
  },
  plugins: [],
};
