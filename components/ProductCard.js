import { addToCart } from '../lib/redux'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { FiShoppingCart } from 'react-icons/fi';
import { useToast } from '@chakra-ui/react'
import {
	AspectRatio,
	Box,
	Button,
	HStack,
	Image,
	Link,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { Rating } from './Rating'
  import { FavouriteButton } from './FavouriteButton'
  import { PriceTag } from './PriceTag'
  



export default function ProductCard({product }) {
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
	const { id, name, inventory, image, permalink,price, variant_groups, variants, lookup } = product
	return (
	  <Stack
		spacing={useBreakpointValue({
		  base: '4',
		  md: '5',
		})}
	  >
		<Box position="relative" bgColor={'white'} rounded={'10px'}>
		  <AspectRatio ratio={4 / 3}>
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
			<Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
			  {name.substring(0,15)}
			</Text>
			<PriceTag price={product.price.formatted_with_symbol} currency="EUR" />
		  </Stack>
		  <HStack>
			<Rating defaultValue={Rating} size="sm" />
			<Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
			  12 Reviews
			</Text>
		  </HStack>
		</Stack>
		<Stack align="center">
		  <Button colorScheme="blue" isFullWidth onClick={onAddToCart}>
			Add to cart
		  </Button>
		  <Link
			textDecoration="underline"
			fontWeight="medium"
			color={useColorModeValue('gray.600', 'gray.400')}
		  >
			Quick shop
		  </Link>
		</Stack>
	  </Stack>
	)
}



