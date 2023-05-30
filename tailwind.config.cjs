const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "media",
  mode: "jit",
  content: ["./docs/index.html", "./src/**/*.svelte"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
