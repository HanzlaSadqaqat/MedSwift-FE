/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0984e3",
        secondary: "#74b9ff",
      },
    },
    devServer: {
      historyApiFallback: {
        disableDotRule: true,
      },
    },
  },
  plugins: [],
};
