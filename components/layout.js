import Head from 'next/head'
import Cart from './Cart'
import Navbar from './Navbar'
import { Box, Flex, VStack } from '@chakra-ui/react'
import Footer from '../components/Footer'

const Layout = ({ Component, pageProps, props }) => {
	// If a page will export a static property 'title' it will be added to the website title
	const { title } = pageProps
	let combined_title = `The Mola`
	if (title) combined_title += ` - ${title}`

	return (
		<VStack 	
		>
			<Head>
				<title>{combined_title}</title>
				<meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar/>
			<Component {...pageProps} />

			<Footer/>
		</VStack>
	)
}

export default Layout