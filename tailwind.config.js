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
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)', },
          '50%': { transform: 'translateY(-5%)', },
        }
      }
      
    },
  },
  plugins: [],
}
