import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link'

export default function HeroSecond() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLargerThan680] = useMediaQuery('(min-width: 650px)')

  return (
    <Container maxW={'7xl'} overflow='hidden'>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              color={useColorModeValue('black', 'white')}
              _after={{
                content: "''",
                width: 'full',
                height: '50%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal.400',
                zIndex: -1,
              }}>
              Buy once,
            </Text>
            <br />
            <Text as={'span'} color={useColorModeValue('black', 'white')}
            >
              use everywhere!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Snippy is a rich coding snippets app that lets you create your own
            code snippets, categorize them, and even sync them in the cloud so
            you can use them anywhere. All that is free!
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}>
              <Link href="/products">
              <Button
              rounded={'full'}
              color={useColorModeValue('white', 'white')}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'blue'}
              bg={'teal.400'}
              _hover={{ bg: 'teal.200' }}>
              Shop Now
            </Button>
              </Link>

            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
            >
              New Arrivals
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
>
          <Blob
            w={'200%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            overflow='hidden'
            color={useColorModeValue('teal.300', 'red.300')}
          />
          <Box
            position={'relative'}
            height={'22rem'}
            maxWidth={'100%'}>
              <World colorMode={colorMode} isLargerThan680={isLargerThan680}/>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}



export const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

export const World = ({colorMode}) => {
  return(
    <section className='relative'>
      <div className=" mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="py-auto">

          {/* World illustration */}
          <div className="flex flex-col items-center px-auto">
            <div className="relative">
              {/* Halo effect */}
              <svg className="absolute inset-0 left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" width='800' height="800" viewBox="0 0 800 800" style={{ maxWidth: '200%' }} xmlns="http://www.w3.org/2000/svg">
                <g className={`fill-current opacity-75 ${colorMode === 'light' ? 'text-gray-700' : 'text-gray-800' }`}>
                  <circle className="pulse" cx="400" cy="400" r="200" />
                  <circle className="pulse pulse-1" cx="400" cy="400" r="200" />
                  <circle className="pulse pulse-2" cx="400" cy="400" r="200" />
                </g>
              </svg>
              {/* Globe image */}
              <img className="relative rounded-full -top-10 md:-top-20 shadow-sm" src={`${colorMode === 'light' ? '/blacktshirt-removebg-preview.png' : '/whitetshirt-removebg-preview.png' }`} width="400" height="400" alt="Planet" />
              {/* Static dots */}
              <svg className="absolute top-0 w-full h-auto" viewBox="0 0 400 400" style={{ left: '12%' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter x="-41.7%" y="-34.2%" width="183.3%" height="185.6%" filterUnits="objectBoundingBox" id="world-ill-a">
                    <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.439215686 0 0 0 0 0.956862745 0 0 0 0.32 0" in="shadowBlurOuter1" />
                  </filter>
                  <filter x="-83.3%" y="-68.5%" width="266.7%" height="271.2%" filterUnits="objectBoundingBox" id="world-ill-c">
                    <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.439215686 0 0 0 0 0.956862745 0 0 0 0.32 0" in="shadowBlurOuter1" />
                  </filter>
                  <filter x="-7.3%" y="-23.8%" width="114.5%" height="147.6%" filterUnits="objectBoundingBox" id="world-ill-e">
                    <feGaussianBlur stdDeviation="2" in="SourceGraphic" />
                  </filter>
                  <ellipse id="world-ill-b" cx="51" cy="175.402" rx="24" ry="23.364" />
                  <ellipse id="world-ill-d" cx="246" cy="256.201" rx="12" ry="11.682" />
                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="world-ill-f">
                    <stop stopColor="#0070F4" stopOpacity="0" offset="0%" />
                    <stop stopColor="#0070F4" stopOpacity=".64" offset="52.449%" />
                    <stop stopColor="#0070F4" stopOpacity="0" offset="100%" />
                  </linearGradient>
                </defs>
                <g transform="translate(0 -.818)" fill="none" fillRule="evenodd">
                  <use fill="#000" filter="url(#world-ill-a)" xlinkHref="#world-ill-b" />
                  <use fill="#0070F4" xlinkHref="#world-ill-b" />
                  <use fill="#000" filter="url(#world-ill-c)" xlinkHref="#world-ill-d" />
                  <use fill="#0070F4" xlinkHref="#world-ill-d" />
                  <ellipse fillOpacity=".32" fill="#0070F4" cx="293" cy="142.303" rx="8" ry="7.788" />
                  <ellipse fillOpacity=".64" fill="#0070F4" cx="250" cy="187.083" rx="6" ry="5.841" />
                  <ellipse fillOpacity=".64" fill="#0070F4" cx="13" cy="233.811" rx="2" ry="1.947" />
                  <ellipse fill="#0070F4" cx="29" cy="114.072" rx="2" ry="1.947" />
                  <path d="M258 256.2l87-29.204" stroke="#666" strokeWidth="2" opacity=".16" filter="url(#world-ill-e)" />
                  <path d="M258 251.333c111.333-40.237 141-75.282 89-105.136M136 103.364c66.667 4.543 104.667 32.45 114 83.72" stroke="url(#world-ill-f)" strokeWidth="2" strokeDasharray="2" />
                </g>
              </svg>
              {/* Dynamic dots */}
              <svg className="absolute max-w-full" width="48" height="48" viewBox="0 0 48 48" style={{ width: '12%', top: '45%', left: '50%' }} xmlns="http://www.w3.org/2000/svg">
                <g className="fill-current text-blue-600">
                  <circle className="pulse pulse-mini pulse-1" cx="24" cy="24" r="8" />
                  <circle className="pulse pulse-mini pulse-2" cx="24" cy="24" r="8" />
                  <circle cx="24" cy="24" r="8" />
                </g>
              </svg>
              <svg className="absolute max-w-full" width="48" height="48" viewBox="0 0 48 48" style={{ width: '12%', top: '19%', left: '46%' }} xmlns="http://www.w3.org/2000/svg">
                <g className="fill-current text-blue-600">
                  <circle className="pulse pulse-mini" cx="24" cy="24" r="8" />
                  <circle className="pulse pulse-mini pulse-2" cx="24" cy="24" r="8" />
                  <circle cx="24" cy="24" r="8" />
                </g>
              </svg>
            

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}