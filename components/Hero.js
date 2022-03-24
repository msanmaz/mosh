import react from "react";
import Link from 'next/link'

const Hero = () => {
    return (
        <div
            className=' bg-blue-200 flex overflow-hidden bg-cover rounded-2xl lg:inset-y-0 mx-10 lg:max-w-8xl mt-4'
            style={{
                maxHeight: '65vh',
            }}
        >
            <div className='w-1/2 mx-auto'>
                <div className='relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
                    <svg
                        className='hidden absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
                        fill='currentColor'
                        viewBox='0 0 100 100'
                        preserveAspectRatio='none'
                        aria-hidden='true'
                    >
                        <polygon points='50,0 100,0 50,100 0,100' />
                    </svg>

              

                    <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-4 lg:px-8 xl:mt-10'>
                        <div className='sm:text-center lg:text-left'>
                            <h1 className='text-4xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl'>
                                <span className='block xl:inline'>A place of elegance </span>
                                <span className='block text-white xl:inline'>and seduction</span>
                            </h1>
                            <p className='mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                                We offer you erotic and fantasy costumes that will give you exciting and colorful nights. Do something for
                                yourself and your relationship today!{' '}
                            </p>
                            <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                                <Link href='/categories/all'>
                                    <div className='cursor-pointer flex shadow items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-500 md:py-4 md:text-lg md:px-10'>
                                        Shop Now
                                    </div>
                                </Link>
                                <div className='mt-3 sm:mt-0 sm:ml-3'>
                                    <a
                                        href='#'
                                        className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'
                                    >
                                        About Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>


            <div className='w-1/2 mx-auto bg-green-500 bg-cover'
                        style={{
                            backgroundImage: 'url(/multipleglasses.jpg)',
                        }}
            >
            
            </div>

        </div>
    )
}

export default Hero