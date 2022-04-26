import React from 'react'
import {
    useColorModeValue,useColorMode,Flex, Text,Box,Heading
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { changeItemQuantity, removeFromCart } from '../lib/redux'


function CheckoutSide() {
    const cart = useSelector(state => state.cart)
    const checkoutToken = useSelector(state => state.checkout)
    const { colorMode, toggleColorMode } = useColorMode();
    const dispatch = useDispatch()

    
    const handleUpdateCartQty = (productId, quantity) => {
        dispatch(changeItemQuantity(productId, quantity))
    }

    const handleRemoveFromCart = productId => {
        dispatch(removeFromCart(productId))
    }


    return (
        <Flex
            bg={useColorModeValue("#F9FAFB", "gray.750")}
            w={{ base: '100%', md: '40%' }}
            px={{ base: 6, md: 'auto' }}
            alignItems="center"
            justifyContent="center"
            flexWrap={{ base: 'wrap' }}
            direction={{ base: 'row', md: 'column', lg: 'column' }}
        >
             <div className=''>
                            <div className='flow-root mb-6'>
                                <ul role='list' className='divide-y divide-gray-500'>
                                    {cart?.line_items  ?         cart.line_items.map(item => (
                                        <li className='py-6 flex' key={item.id}>
                                              <div className='flex-shrink-0 w-[10rem] h-[7rem] rounded-md overflow-hidden'>
                                                  <img
                                                      src={item.image.url}
                                                      alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
                                                      className='w-full bg-gray-200 h-full object-center object-cover'
                                                  />
                                              </div>
  
                                              <div className='ml-4 flex-1 flex flex-col'>
                                                  <div>
                                                      <div className='flex justify-between text-base font-medium'>
                                                          <h3 className={colorMode === "dark" ? "text-white" : "text-gray-700"}>
                                                              <a href='#'>{item.name}</a>
                                                          </h3>
                                                          <p className='ml-4 dark:text-gray-200'>{item.line_total.formatted_with_symbol}</p>
                                                      </div>
                                                      <p className='mt-1 text-sm text-gray-500'></p>
                                                  </div>
                                                  <div className='flex-1 flex items-end justify-between text-sm'>
                                                      <button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
                                                          -
                                                      </button>
                                                      <p className='text-gray-500 dark:text-white'>{item.quantity}</p>
                                                      <button onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>
                                                          +
                                                      </button>
  
                                                      <div className='flex'>
                                                          <button
                                                              type='button'
                                                              className='font-medium text-indigo-600 hover:text-indigo-500'
                                                              onClick={() => handleRemoveFromCart(item.id)}
                                                          >
                                                              Remove
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>))
                                    

                                    :                                        <Box textAlign="center" py={10} px={2}>
                                    <Heading as="h3" size="xl" mt={6} mb={2}>
                                   There Is No Product
                                  </Heading>
                                  <Text color={'gray.500'}>
                                    Your Cart Is Empty
                                  </Text>
                                    </Box>
                                    

 }
                                </ul>
                            </div>
                        </div>


                        <div className='py-6 px-4 sm:px-6 w-full'>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                                <p className={colorMode === "dark" ? "text-white" : "text-gray-600"}>Subtotal</p>
                                <div className={colorMode === "dark" ? "text-white" : "text-gray-600"}>{cart?.subtotal.formatted_with_symbol || '---'}</div>
                            </div>
                            <div className='flex justify-between'>
                            <p className='mt-0.5 text-sm text-gray-500'>Shipping cost :</p>{checkoutToken?.live.shipping.available_options[0].price.formatted_with_symbol || '---' }

                            </div>
                            <div className='mt-6 flex justify-center text-sm text-center text-gray-500'>
                                <p>
                                    or{' '}
                                    <button type='button' className='text-indigo-600 font-medium hover:text-indigo-500'>
                                        Continue Shopping<span aria-hidden='true'> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>


        </Flex>
    )
}

export default CheckoutSide