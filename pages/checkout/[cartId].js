import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import commerce from '../../lib/commerce'
import { Box, Container, Flex } from '@chakra-ui/react'

export default function Checkout() {
  const [liveObject, setLiveObject] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { cartId } = router.query

  useEffect(() => {
    const fetchCheckout = async (cartId) => {
      try {
        let checkout = await commerce.checkout.generateToken(cartId, {
          type: 'cart'
        })
        setLoading(false)
        setTokenId(checkout.id)
        setLiveObject(checkout.live)
      } catch (error) {
        console.log('ERROR', error.message)
      }
    }

    fetchCheckout(cartId)
  }, [cartId])

  if (loading) {
    return <h1>Loading......</h1>
  }

  if (!tokenId) {
    return <h1>Something went wrong</h1>
  }

  return (
      <Flex h={'100vh'}>
        <Box my={20}>
        <h1>Checkout Token: {tokenId}</h1>
      <h1>Cart ID Token: {cartId}</h1>
      <h1>LiveCart Total: {liveObject?.total.formatted_with_symbol} </h1>
        </Box>

      </Flex>

  )
}