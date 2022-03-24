import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { setServerState, wrapper } from '../lib/redux'
import { readCache } from '../lib/cache'
import HeroSecond from '../components/HeroSecond'
import ProductCard from '../components/ProductCard'
import { useMemo,useState } from 'react'
import { Button,Center,useColorMode, } from '@chakra-ui/react'
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

export default function Home({products, categories}) {

  // const variants = products.variantGroups.map(({options,name})=> ({
  //   name,
  //   options: options.map((option) => option.name)

  // }))

	const {colorMode,toggleColorMode} =useColorMode();

  const [currentCategory, setCurrentCategory] = useState('all')


  const onCategoryClick = e => {
    // console.log('set current category:', e.target.id)
    setCurrentCategory(e.target.id)

}



	const categoryProducts = useMemo(() => {
		// if there aren't any products return an empty array, which in the rendering function will turn into 0 product divs
		if (!products) return []

		// if currentCategory is not set (if you forgot default value for example) return all products
		// also if currentCategory is 'all' skip filtering the products because we obviously return all of them
		if (!currentCategory) return products

		// here we return any product who's categories include one with the slug equaling the value of 'currentCategory'
		return products.filter(p => p.categories.findIndex(category => category.slug === currentCategory) !== -1)
	}, [products, currentCategory])


  const productCards = useMemo(
		() => categoryProducts.map(product => <ProductCard product={product} key={product.id} />),
		[categoryProducts, currentCategory]
	)


  const categoryButtons = useMemo(
		() =>
			categories
				? categories.map(({ slug, name }) => (
          <Button
          id={slug}
          key={slug}
          onClick={onCategoryClick}
          rounded={'15px'}
          size={'lg'}
          fontWeight={'normal'}
          px={6}
          my={2}
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
  return (
    <div className={styles.container}>

      <HeroSecond/> 
      <Flex align={'center'}>
      <SimpleThreeColumns/>
      </Flex>

      <div className='flex justify-center text-2xl my-12 font-extrabold tracking-tight'>
      <p>Categories</p>
      </div>
      <Flex 
      flexWrap={'wrap'}
       align={'center'}
        justify={'center'}>
      {categoryButtons}

      </Flex>



        <div className='max-w-2xl py-14 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
								<div className='grid grid-cols-2 gap-y-10 gap-x-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-1'>
									{productCards}
								</div>
							</div>

     
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
	const props = await readCache()
	store.dispatch(setServerState(props))
	return {
		props,
	}
})





const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
        mx={{ base: '8rem',sm:'18rem',md:'5rem',lg:'11rem', xl: '12rem', '2xl': '17rem' }}>
        {icon}
      </Flex>
      <Center>
      <Text fontWeight={600}>{title}</Text>
      </Center>
      <Center>
      <Text color={'gray.600'}>{text}</Text>

      </Center>
    </Stack>
  );
};

 function SimpleThreeColumns() {
  return (
    <Box p={10}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Lifetime Support'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Unlimited Donations'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'Instant Delivery'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
      </SimpleGrid>
    </Box>
  );
}