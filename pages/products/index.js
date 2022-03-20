import { React, useState, useEffect, useMemo, forwardRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
	Select

} from '@chakra-ui/react';
import Error from '../../components/404'





// Main Component

const ProductPage = ({ products, categories }) => {
	const router = useRouter()
	const [currentCategory, setCurrentCategory] = useState('all')
	const [product, setProduct] = useState()

	// TODO: determine current category by route instead of SPA
	// const { asPath } = useRouter()
	// const current_category = useMemo(() => {
	// 	console.log('current path:', asPath)
	// 	const slug = asPath.replace(/^\//, '')
	// }, [asPath])

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
						color={useColorModeValue('gray.800', 'white')}
						rounded={'15px'}
						size={'sm'}
						fontWeight={'normal'}
						px={6}
						mx={2}
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

	// memoized mapping from the filtered "categoryProducts" to product cards
	const productCards = useMemo(
		() => categoryProducts.map(product => <ProductCard product={product} key={product.id} />),
		[categoryProducts, currentCategory]
	)

	return (
		<>
			<div className='flex flex-wrap mt-20' data-aos-id-blocks>
				<div className='md:w-1/4 hidden md:flex flex-wrap'>
					<div className='w-full h-[300px] p-4 shadow-md rounded-lg'>
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
									<Select placeholder='Select option'>
										<option value='option1'>0-50€</option>
										<option value='option2'>50-100€</option>
										<option value='option3'>100-200€</option>
									</Select>

								</Stack>


							</Stack>
						</Flex>
					</div>


					<div className='md:flex hidden p-4'>

						<div className='w-full shadow-md rounded-lg'>
							<Newsletter />
						</div>
					</div>
				</div>
				<div className='md:w-3/4 w-full flex flex-wrap'>
					<div className='w-full flex p-4 h-[15rem]'>
						<div className='bg-productsbg bg-cover bg-left-top flex relative w-full rounded-lg'>
							<h1 className='text-3xl font-bold text-white font-sans absolute top-8 left-2'>Products</h1>
						</div>
					</div>

					<div className='flex w-full px-4 mb-[50px]' data-aos-id-blocks>
						<div className='md:px-1'>{categoryButtons}</div>
					</div>

					<div className='relative w-[90%] left-2'>
						{productCards.length === 0 &&

							<div className='w-full h-[48rem]'>
								<Error headline={'Theres No Product'} error={'Sorry This Category Is Out Of Stock'} />

							</div>
						}

						<div className='grid grid-cols-2 gap-y-10 gap-x-1 lg:grid-cols-4 xl:gap-x-1 h-[full]'>
							{productCards}
						</div>


					</div>


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