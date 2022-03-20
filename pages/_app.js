import { wrapper } from '../lib/redux'
import Layout from '../components/layout'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'


const App = ({ Component, pageProps }) => <ChakraProvider theme={theme}>
    <Layout Component={Component} pageProps={pageProps} />
</ChakraProvider>

const withRedux = wrapper.withRedux(App, { debug: false })

export default withRedux