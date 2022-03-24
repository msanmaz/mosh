module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
				productsbg: "url('/multipleglasses.jpg')",
			}),
      inset:{
        '339':'-100px'
      },
      colors:{
        blush: '#2596be'
      },
      width:{
        98:'98%',
      }
    },
  },
  plugins: [],
}
