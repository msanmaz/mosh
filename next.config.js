// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const path = require('path')

module.exports = {
	env: {
		CUSTOMKEY: process.env.NEXT_PUBLIC_COMMERCE_LIVE,
		STRIPELIVE:process.env.STRIPE_LIVE
	  },

	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
  images: {
    domains: ['cdn.chec.io'],
  },


}