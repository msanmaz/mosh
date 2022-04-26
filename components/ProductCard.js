import { addToCart } from '../lib/redux'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useToast } from '@chakra-ui/react'
import {
	AspectRatio,
	Box,
	Button,
	Image,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
  } from '@chakra-ui/react'
  import { FavouriteButton } from './FavouriteButton'
  import { PriceTag } from './PriceTag'
  import Link from 'next/link'
  



export default function ProductCard({product}) {
	const dispatch = useDispatch()
	const onAddToCart = useCallback(() => {
		dispatch(addToCart(product.id, 1))

		toast({
			title: 'Product Added To Cart.',
			description: "We've added the product to your cart for you.",
			status: 'success',
			duration: 9000,
			isClosable: true,
		})

	}, [])
	const toast = useToast()
	const { id, name, image } = product
	return (
	  <Stack
		spacing={useBreakpointValue({
		  base: '4',
		  md: '5',
		})}
	  >
		<Box position="relative" bgColor={useColorModeValue('gray.50','gray.100')} rounded={'10px'}>
		  <AspectRatio ratio={4 / 5}>
			<Image
			  src={image.url}
			  alt={name}
			  draggable="false"
			  fallback={<Skeleton />}
			  borderRadius={useBreakpointValue({
				base: 'md',
				md: 'xl',
			  })}
			/>
		  </AspectRatio>
		  <FavouriteButton
			position="absolute"
			top="4"
			right="4"
			aria-label={`Add ${name} to your favourites`}
		  />
		</Box>
		<Stack>
		  <Stack spacing="1">
		  <PriceTag price={product.price.formatted_with_symbol} currency="EUR" />

			<Text fontWeight="large" color={useColorModeValue('gray.900', 'gray.200')}>
			  {name.substring(0,15)}
			</Text>
		  </Stack>
		</Stack>
		<Stack align="center">
		<Link href={`/products/${id}`}>
		  <Button bgColor={useColorModeValue('gray.200', 'gray.700')} 		_hover={{ bg:useColorModeValue('gray.300', 'gray.600')}} isFullWidth>
			View Details
		  </Button>
		  </Link>
		  {/* <Link
			href={`/products/${id}`}
		  >
			View Details
		  </Link> */}
		</Stack>
	  </Stack>
	)
}



