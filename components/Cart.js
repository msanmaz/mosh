import {
    useColorModeValue,
    useColorMode
} from '@chakra-ui/react';

import { React, useRef } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { changeItemQuantity, removeFromCart, selectCart } from '../lib/redux'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'



const Cart = ({ isOpenReportModal, onCloseReportModal }) => {
	const dispatch = useDispatch()
    const { colorMode, toggleColorMode } = useColorMode();

	const { subtotal, line_items,id } = useSelector(selectCart)

    const btnRef = useRef()


	const handleUpdateCartQty = (productId, quantity) => {
		dispatch(changeItemQuantity(productId, quantity))
	}

	const handleRemoveFromCart = productId => {
		dispatch(removeFromCart(productId))
	}

	return (	



		<>
		            <Drawer
                isOpen={isOpenReportModal}
                placement='right'
                onClose={onCloseReportModal}
                finalFocusRef={btnRef}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Shopping Cart</DrawerHeader>

                    <DrawerBody>
                        <div className='mt-8'>
                            <div className='flow-root'>
                                <ul role='list' className='-my-6 divide-y divide-gray-200'>
                                    {line_items?.map(item => (
                                        <li className='py-6 flex' key={item.id}>
                                            <div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
                                                <img
                                                    src={item.image.url}
                                                    alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
                                                    className='w-full h-full object-center object-cover'
                                                />
                                            </div>

                                            <div className='ml-4 flex-1 flex flex-col'>
                                                <div>
                                                    <div className='flex justify-between text-base font-medium'>
                                                        <h3 className={colorMode === "dark" ? "text-white" : "text-gray-700" }>
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
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </DrawerBody>

                    <DrawerFooter>
                        <div className='border-t border-gray-200 py-6 px-4 sm:px-6 w-full'>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                                <p className={colorMode === "dark" ? "text-white" : "text-gray-600" }>Subtotal</p>
                                <div className={colorMode === "dark" ? "text-white" : "text-gray-600" }>{subtotal?.formatted_with_symbol || '---'}</div>
                            </div>
                            <p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
                            <Link href={`/checkout/${id}`} className='mt-6'>
                                <div className='flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
                                    Checkout
                                </div>
                            </Link>
                            <div className='mt-6 flex justify-center text-sm text-center text-gray-500'>
                                <p>
                                    or{' '}
                                    <button type='button' className='text-indigo-600 font-medium hover:text-indigo-500'>
                                        Continue Shopping<span aria-hidden='true'> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


		</>
		
	)
}

export default Cart