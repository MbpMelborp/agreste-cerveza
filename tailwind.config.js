module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ag_brown: "#c1aa82",
        ag_cof: "3D332A",
        ag_red: "#A74519",
        ag_bg: "#313029",
        ag_form: "#b0ab8e",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
