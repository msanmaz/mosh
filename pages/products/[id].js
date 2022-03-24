import { React, useCallback, useState } from 'react'
import {
	VStack, Heading, Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Stack,
	Button,
	Container,
	Box,
	Text,
	Flex,
	useToast,
	useColorModeValue,
	StackDivider,
	ListItem,
	List,
	SimpleGrid,
} from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { readCache } from '../../lib/cache'
import { setServerState, wrapper } from '../../lib/redux'
import Link from 'next/link'
import Gallery from '../../components/Gallery';
import { addToCart } from '../../lib/redux'
import { useDispatch } from 'react-redux';
import WhatsIncluded from '../../components/Whats-included';



const Test = ({ product }) => {

	const dispatch = useDispatch()
	const toast = useToast()



	const [quantity, setQuantity] = useState(0)
	const [variantId, setVariantId] = useState(null)

	const handleVariant = e => {
		e.preventDefault();
		setVariantId(e.target.id)
	}


	const onAddToCart = useCallback(() => {

		if (quantity > 0 ) {
			dispatch(addToCart(product.id, quantity, variantId))
			toast({
				title: 'Product Added To Cart.',
				description: "We've added the product to your cart for you.",
				status: 'success',
				duration: 9000,
				isClosable: true,
			})

		}
		if (quantity <= 0) {
			toast({
				title: `Can't Added Product In The Cart`,
				description: "Place Choose Size and Quantity",
				status: 'error',
				duration: 9000,
				isClosable: true
			})
		}


	}, [quantity])



	const description = product.description.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");


	return (
		<>
			<Container maxW='container.2xl'>

				<VStack px={10}>
					<BreadCrumb product={product} />
				</VStack>


				<Stack direction={{ base: 'column', md: 'row', xl: 'row' }}>
					<Gallery />
					<Stack w={{ base: '100%', md: '50%', xl: '45%' }} justify={'center'} >

						<Box as={'header'}>
							<Heading
								lineHeight={1.1}
								fontWeight={600}
								fontSize={{ base: '2xl', sm: '4xl', lg: '4xl' }}>
								{product.name}
							</Heading>
							<Text
								color={useColorModeValue('gray.900', 'gray.400')}
								fontWeight={300}
								py={4}
								fontSize={'2xl'}>
								{product.price.formatted_with_symbol}
							</Text>
						</Box>

						<Stack
							spacing={{ base: 4, sm: 6 }}
							direction={'column'}
							divider={
								<StackDivider
									borderColor={useColorModeValue('gray.200', 'gray.600')}
								/>
							}>
							<VStack spacing={{ base: 4, sm: 6 }}>



								<Text fontSize={'lg'}>
									{description}
								</Text>
							</VStack>


							<Box>
								<Text
									fontSize={{ base: '16px', lg: '18px' }}
									color={useColorModeValue('yellow.500', 'yellow.300')}
									fontWeight={'500'}
									textTransform={'uppercase'}
									mb={'4'}>
									Features
								</Text>

								<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
									<List spacing={2}>
										<ListItem>Chronograph</ListItem>
										<ListItem>Master Chronometer Certified</ListItem>{' '}
									</List>
									<List spacing={2}>
										<ListItem>Anti‑magnetic</ListItem>
										<ListItem>Chronometer</ListItem>
									</List>
								</SimpleGrid>
							</Box>

						</Stack>



						<Flex  w={'full'} py={6} >

							<Flex w={'50%'}>

								<Stack w={'full'} px={{ base: 0, md: 20, lg: 14 }}>
									<Text>Quantity:</Text>
									<Box display={'flex'}>
										<Button onClick={() => setQuantity(quantity + 1)}>+</Button>

										<Box px={4} mt={2}>{quantity} </Box>

										<Button onClick={() => {
											if (quantity > 0) {
												setQuantity(quantity - 1)
											}
										}} disabled={quantity == 0 ? true : false}>-</Button>

									</Box>

								</Stack>


							</Flex>

							<Stack w={'50%'} px={10}>
								<Text>Sizes:</Text>
								<Flex>
									{product.variant_groups.length === 0 ? <div>No Sizes</div> : product.variant_groups[0].options?.map((variant) =>
										<Button onClick={handleVariant} id={variant.id} mx={2} >{variant.name}</Button>
									)
									
								
								}
									

								</Flex>

							</Stack>



						</Flex>
						

						<Box  w={'full'} display={'flex'}>
								<Button onClick={onAddToCart} w={'100%'} bgColor={'teal.500'}>Add To Cart</Button>

							</Box>


					</Stack>


				</Stack>


				<WhatsIncluded />






			</Container>


		</>
	)
}



const BreadCrumb = ({ product }) => {
	return (
		<>
			<Stack
				direction={{ base: 'column', md: 'row' }}
				justifyContent="space-between"
				alignItems={{ base: 'center', md: 'flex-end' }}
				w="full"
				h='9rem'
				mb={'2rem'}
			>
				<Link href="/">
					<Button leftIcon={<IoIosArrowBack />} variant="outline" rounded="full">
						Go home
					</Button>
				</Link>

				<Breadcrumb
					spacing={2}
					separator={<IoIosArrowForward size={18} color="gray.500" />}
					color="gray.500"
					fontWeight="semibold"
				>
					<BreadcrumbItem>
						<BreadcrumbLink as={'span'}><Link href="/">Home</Link></BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<BreadcrumbLink as={'span'}><Link href="/products">Products</Link></BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink as={'span'} color="brand.500">{product.name}</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</Stack>
		</>
	)
}


export const getStaticPaths = async () => {
	const { products } = await readCache()
	return {
		paths: products.map(product => ({
			params: {
				id: product.id,
			},
		})),
		fallback: false,
	}
}


export const getStaticProps = wrapper.getStaticProps(store => async ({ params }) => {
	const { products, ...props } = await readCache()
	store.dispatch(setServerState(props))

	const { id } = params

	const product = products.find(p => p.id === id)

	return {
		props: { ...props, product, title: product.name }
	}
})


export default Test