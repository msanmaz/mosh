import { setServerState, wrapper } from '../lib/redux'
import { readCache } from '../lib/cache'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { useMemo, useState } from 'react'
import { Heading, Image, useColorModeValue, } from '@chakra-ui/react'
import { Box, Text, Stack, Flex, Spacer } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { ChevronRightIcon } from '@chakra-ui/icons'

import SwiperCore, { Navigation } from "swiper";


// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";



SwiperCore.use([Navigation]);

export default function Home({ products, categories }) {

  const [currentCategory, setCurrentCategory] = useState('all')

  const swiperRef = React.useRef(null)
  const swiperRef2 = React.useRef(null)


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


  // const categoryButtons = useMemo(
  //   () =>
  //     categories
  //       ? categories.map(({ slug, name }) => (
  //         <Button
  //           id={slug}
  //           key={slug}
  //           onClick={onCategoryClick}
  //           rounded={'15px'}
  //           size={'lg'}
  //           fontWeight={'normal'}
  //           px={6}
  //           my={2}
  //           mx={2}
  //           colorScheme={'gray'}
  //           bg={'teal.400'}
  //           _hover={{ bg: 'teal.500' }}
  //           isActive={slug === currentCategory ? true : false}
  //         >
  //           {name}
  //         </Button>
  //       ))
  //       : null,

  //   [categories, currentCategory, setCurrentCategory]
  // )
  return (
    <div className='w-full'>

      <Hero />

      {/* first swiper */}
      <Box my={'4rem'} pl={{ base: 4, md: 10 }}>

        <Flex>

          <Box>
            <Heading as={'h3'} lineHeight={10} fontSize={{ base: 'xl', md: 'xl' }}>Community Favourites</Heading>
            <Text color={'gray.500'} mb={4}>Top picks from the shop</Text>
          </Box>

          <Spacer />

          <Box px={4} display={{ base: 'none', md: 'flex' }}>
            <IconButton id="previousButton" mr={2} rounded={'3xl'} icon={<ChevronLeftIcon />} onClick={() => swiperRef.current.swiper.slidePrev()} />
            <IconButton id="nextButton" rounded={'3xl'} icon={<ChevronRightIcon />} onClick={() => swiperRef.current.swiper.slideNext()} />
          </Box>

        </Flex>


        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          ref={swiperRef}
          grabCursor={true}
        >
          {categoryProducts.map(product => <SwiperSlide key={product.id}> <ProductCard product={product} key={product.id} /> </SwiperSlide>)}


        </Swiper>
      </Box>


  {/* second swiper */}
      <Box my={{base:'1rem',md:4}} pl={{ base: 4, md: 10 }}>

        <Flex>

          <Box>
            <Heading as={'h3'} lineHeight={10} fontSize={{ base: 'xl', md: 'xl' }}>Styled By Us</Heading>
            <Text color={'gray.500'} mb={4}>We pick the GOAT</Text>
          </Box>

          <Spacer />

          <Box px={4} display={{ base: 'none', md: 'flex' }}>
            <IconButton id="previousButton" mr={2} rounded={'3xl'} icon={<ChevronLeftIcon />} onClick={() => swiperRef2.current.swiper.slidePrev()} />
            <IconButton id="nextButton" rounded={'3xl'} icon={<ChevronRightIcon />} onClick={() => swiperRef2.current.swiper.slideNext()} />
          </Box>

        </Flex>


        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          ref={swiperRef2}
          grabCursor={true}
        >
          {categoryProducts.map(product => <SwiperSlide key={product.id}> <ProductCard product={product} key={product.id} /> </SwiperSlide>)}


        </Swiper>
      </Box>




  {/* banner */}
      <Flex
        flexWrap={'wrap'}
        align={'center'}
        px={{ base: 4, md: 9 }}
        py={{base:4,md:10}}
        justify={'center'}>
        <Box w={'full'} bgColor={useColorModeValue('black', 'white')}>

          <Stack direction={{ base: 'column', md: 'row' }}>

            <Box px={4} pl={'12%'} py={2} display={{ base: 'none', md: 'flex' }}>
              <Image w={'4rem'} h={'5rem'} color={useColorModeValue('white', 'black')} src='/images/t-shirt-with-short-sleeves-svgrepo-com.svg' />

            </Box>

            <Box display={'flex'} align={'center'} justify={'center'}>
              <Text fontSize={{base:'sm',md:'large'}} px={10} fontWeight={{base:'light', md: 'thin'}} color={useColorModeValue('white', 'black')} py={8}>HAVE A DESIGN IDEA? HEAD TO OUR CAMPAIGN BUILDER TO CREATE YOUR OWN CUSTOM PRODUCTS TO SELL.</Text>
            </Box>


          </Stack>
        </Box>
      </Flex>


  {/* bottom content */}
      <div className="md:px-[2.25rem] pl-[2.25rem] py-4 flex flex-row items-stretch justify-start md:flex-nowrap -ml-[2rem] flex-wrap">

        <div className='lg:w-[16rem] px-[2rem]'>
          <div className='hidden lg:block'>
            <div to='true'>
              <div className='flex-grid flex-row justify-start -mx-0 flex-wrap'>
                <div className='w-100 px-0'>
                  <div className='mb-1'>
                    <div className='bg-cover bg-center pb-[140%] h-0' style={{ backgroundImage: `url("https://d3fc22kf489ohb.cloudfront.net/assets/a92401f74905773f1eebada37cf3313f4337c98a/static/media/made-with-love.7c18d075.gif")` }}>

                    </div>
                  </div>

                  <div className='w-100 px-0'>
                    <div className='_3tExS h-100 flex flex-col justify-between'>
                      <span className='heading uppercase text-xs'>
                        Made with love in our IE production facility
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className='w-full sm:w-full md:w-full lg:w-[83.33%] px-4 md:px-[2rem]'>
          <div className='flex flex-row items-stretch justify-start -mx-2 flex-wrap'>
            <div className=' sm:w-[41.6667%] px-2'>
              <div className='pb-[2rem] sm:pb-0'>
                <img src="https://everpress.imgix.net/assets/a92401f74905773f1eebada37cf3313f4337c98a/static/media/mission.20307e52.jpg?w=826&h=1064&auto=format&bg=F7F8F9&fit=fill 1x,
                    https://everpress.imgix.net/assets/a92401f74905773f1eebada37cf3313f4337c98a/static/media/mission.20307e52.jpg?w=826&h=1064&auto=format&bg=F7F8F9&fit=fill&q=80&dpr=2"/>
              </div>
            </div>
            <div className='w-full sm:w-[58.33%] px-4 md:px-[2rem]'>

              <div className='mb-[1rem] sm:mb-[2rem] md:mb-[3rem]'>
                <span className='heading leading-none text-[2.5rem] sm:text-[2.66rem] md:text-[2.66rem] lg:text-[5.5rem]'>WE'RE CHANGING THE WAY THINGS GET MADE</span>
              </div>

              <div className='flex flex-row items-center justify-start -ml-[2rem] flex-wrap md:flex-nowrap'>
                <div className='w-full sm:w-1/2 px-[2rem]'>
                  <div className='mb-[2rem] sm:mb-0'>
                  <div className='mb-[1rem] uppercase font-semibold text-[1.2rem] md:text-[1.5rem]'>MISSION</div>
                      <p className='text-[1rem] inline pr-1'>
                        We're on a mission to empower creative independence in a commercial world.
                      </p>
                      <button className='_3mEi7 p-1 uppercase text-center relative border-none outline-none bg-transparent cursor-pointer rounded-md _16ruh _2pNei text-[0.6rem] default _2Feen'>
                        more
                      </button>
                  </div>
                </div>
                <div className='w-full sm:w-1/2 px-[2rem]'>
                  <div className='mb-[2rem] sm:mb-0'>
                    <div className='mb-[1rem]  uppercase font-semibold text-[1.2rem] md:text-[1.5rem]'>SUSTAINABILITY</div>
                      <p className='text-[1rem] inline pr-1'>
                        We're on a mission to empower creative independence in a commercial world.
                      </p>
                      <button className='_3mEi7 p-1 uppercase text-center relative border-none outline-none bg-transparent cursor-pointer rounded-md _16ruh _2pNei text-[0.6rem] default _2Feen'>
                        more
                      </button>
                    
                  </div>
                </div>

              </div>

            </div>
          </div>
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





// const Feature = ({ title, text, icon }) => {
//   return (
//     <Stack>
//       <Flex
//         w={16}
//         h={16}
//         align={'center'}
//         justify={'center'}
//         color={'white'}
//         rounded={'full'}
//         bg={'gray.100'}
//         mb={1}
//         mx={{ base: '8rem', sm: '18rem', md: '5rem', lg: '11rem', xl: '12rem', '2xl': '17rem' }}>
//         {icon}
//       </Flex>
//       <Center>
//         <Text fontWeight={600}>{title}</Text>
//       </Center>
//       <Center>
//         <Text color={'gray.600'}>{text}</Text>

//       </Center>
//     </Stack>
//   );
// };

// function SimpleThreeColumns() {
//   return (
//     <Box p={10}>
//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
//         <Feature
//           icon={<Icon as={FcAssistant} w={10} h={10} />}
//           title={'Lifetime Support'}
//           text={
//             'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
//           }
//         />
//         <Feature
//           icon={<Icon as={FcDonate} w={10} h={10} />}
//           title={'Unlimited Donations'}
//           text={
//             'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
//           }
//         />
//         <Feature
//           icon={<Icon as={FcInTransit} w={10} h={10} />}
//           title={'Instant Delivery'}
//           text={
//             'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
//           }
//         />
//       </SimpleGrid>
//     </Box>
//   );
// }