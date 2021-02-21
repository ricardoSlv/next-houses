module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "layout": '64px minmax(0, 1fr)'
      },
      maxWidth: {
        "title": '30ch'
      },
      colors: {},
    },
  },
  variants: {},
  plugins: [],
}
