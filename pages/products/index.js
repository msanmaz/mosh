import { React, useState, useMemo } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import { setServerState, wrapper } from '../../lib/redux'
import { readCache } from '../../lib/cache'
import ProductCard from '../../components/ProductCard'
import {
	Button
} from '@chakra-ui/react';
import Newsletter from '../../components/Newsletter'
import {
	Flex,
	Stack,
	Heading,
	Text,
	useColorModeValue,
	Select,
	useColorMode,
	Box

} from '@chakra-ui/react';
import Error from '../../components/404'





// Main Component

const ProductPage = ({ products, categories }) => {

	const [isLargerThan680] = useMediaQuery('(min-width: 680px)')

	const [currentCategory, setCurrentCategory] = useState('all')
	const [dropFilter, setDropFilter] = useState('all')


	const { colorMode, toggleColorMode } = useColorMode();

	// this function returns products filtered by category
	const categoryProducts = useMemo(() => {
		// if there aren't any products return an empty array, which in the rendering function will turn into 0 product divs
		if (!products) return []

		// if currentCategory is not set (if you forgot default value for example) return all products
		// also if currentCategory is 'all' skip filtering the products because we obviously return all of them
		if (!currentCategory) return products


		// here we return any product who's categories include one with the slug equaling the value of 'currentCategory'
		return products.filter(p => p.categories.findIndex(category => category.slug === currentCategory) !== -1)
	}, [products, currentCategory])


	const onCategoryClick = e => {
		// console.log('set current category:', e.target.id)
		setCurrentCategory(e.target.id)
	}



	// memoized mapping from categories to category buttons



	const categoryButtons = useMemo(
		() =>
			categories
				? categories.map(({ slug, name }) => (
					<Button
						id={slug}
						onClick={onCategoryClick}
						rounded={'15px'}
						size={'sm'}
						fontWeight={'normal'}
						px={6}
						mx={2}
						my={2}
						key={slug}
						colorScheme={'gray'}
						bg={'teal.500'}
						_hover={{ bg: 'teal.200' }}
						isActive={slug === currentCategory ? true : false}
					>
						{name}
					</Button>
				))
				: null,

		[categories, currentCategory, setCurrentCategory]
	)


	// this function returns products filtered by category for SELECT
	const categorySelect = useMemo(() => {
		if (!products) return []

		if (!dropFilter) return products

		return products.filter(p => p.categories.findIndex(category => category.slug === dropFilter) !== -1)
	}, [products, dropFilter])


	//handler for dropdown
	const handleDrop = e => {
		setDropFilter(e.target.value)
	}



	// memoized mapping from the filtered "categoryProducts" to product cards
	const productCards = useMemo(
		() => categoryProducts.map(product => <ProductCard product={product} id={product.name} key={product.id} />),
		[categoryProducts, currentCategory]
	)


	// memoized mapping from the filtered "categorySELECT" to product cards
	const productCardsSelect = useMemo(
		() => categorySelect.map(product => <ProductCard product={product} id={product.name} key={product.id} />),
		[categorySelect, dropFilter]
	)







	return (
		<>
			<div className='flex flex-wrap pt-[4rem]' data-aos-id-blocks>
				<div className='md:w-1/4 hidden h-full md:flex flex-wrap'>
					<div className='w-full h-[350px] p-4 shadow-md rounded-lg'>
						<Flex
							minH={'30vh'}
							align={'center'}
							justify={'center'}
							py={0}
							bg={useColorModeValue('gray.50', 'gray.800')}>


							<Stack
								boxShadow={'2xl'}
								bg={useColorModeValue('white', 'gray.700')}
								rounded={'xl'}
								w={'full'}
								p={10}
								spacing={8}
							>


								<Stack align={'center'} spacing={2}>

									<Heading
										textTransform={'uppercase'}
										fontSize={'3xl'}
										color={useColorModeValue('gray.800', 'gray.200')}>
										Filter
									</Heading>

									<Text fontSize={'lg'} color={'white'}>
										Woman/Men
									</Text>
									<Select placeholder='Select option'>
										<option value='option1'>Men</option>
										<option value='option2'>Women</option>
									</Select>

								</Stack>


								<Stack align={'center'} spacing={2}>



									<Text fontSize={'lg'} color={'white'}>
										Price Range
									</Text>
									<Select placeholder='Select option' >
										<option value='50'>0-50€</option>
										<option value='100'>50-100€</option>
										<option value='200'>100-200€</option>
									</Select>

								</Stack>


							</Stack>
						</Flex>
					</div>


					<div className='md:flex hidden p-4'>

						<div className='w-full rounded-lg'>
							<Newsletter />
						</div>
					</div>
				</div>
				<div className='md:w-3/4 w-full h-full flex px-4 flex-wrap'>
					<div className='w-full flex px-3 h-[15rem]'>
						<div className='bg-productsbg bg-cover bg-left-top flex relative w-full rounded-lg'>
							<h1 className='text-3xl font-bold text-white font-sans absolute top-8 left-2'>Products</h1>
						</div>
					</div>

					<Flex w={'full'}
						px={4}
						py={4}
						align={'center'}
						justify={'center'}>
						{isLargerThan680 ? [categoryButtons] : <Select onClick={handleDrop} placeholder='Filter By' bgColor={'teal.500'}>
							{categories.map(({ slug, name }) => (
								<option id={slug} key={slug} value={slug}>{name}</option>

							))}
						</Select>}


					</Flex>


					<Box position="relative" w={'100%'} px={4} h={'full'}>

						
						{(productCards.length === 0) ?

							<div className='w-full h-[48rem]'>
								<Error headline={'Theres No Product'} error={'Sorry This Category Is Out Of Stock'} />

							</div>
							:
							<div className='grid grid-cols-2 gap-y-10 gap-x-1 lg:grid-cols-5 lg:gap-x-5'>
								{isLargerThan680 ? [productCards] : [productCardsSelect]}

							</div>


						}



					</Box>


				</div>
			</div>



		</>

	)
}

export default ProductPage

// Static

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
	const props = await readCache()
	dispatch(setServerState(props))
	props.title = 'Products'
	return {
		props,
	}
})