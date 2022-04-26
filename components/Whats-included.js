import {
    VStack,
    SimpleGrid,
    Heading,
    Icon,
    Text,
    AspectRatio,
    GridItem,
    HStack,
    useColorMode,
    Stack
  } from '@chakra-ui/react';
  
  import { IoFastFoodOutline, IoBicycleOutline } from 'react-icons/io5';
  import { HiWifi } from 'react-icons/hi';
  import { BiCar } from 'react-icons/bi';


  

  const WhatsIncluded = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const items = [
        {
          icon: IoFastFoodOutline,
          title: 'Secure Checkout',
          text: 'Everyone gets a breakfast plate every morning at the cabana behind the beach house.',
          color: `${colorMode === 'dark' ? 'green.500' : 'green.100'}`,
        },
        {
          icon: HiWifi,
          title: '14 Day Return',
          text: 'The beach house, and the wider area around it is covered by a 100mbps Wi-Fi network, free of charge.',
          color:`${colorMode === 'dark' ? 'black' : 'red.100'}`,
        },
        {
          icon: IoBicycleOutline,
          title: 'Sustainable Choice',
          text: 'There are 10 bicycles available for all guests. Also, there is a beautiful hiking trail nearby.',
          color: `${colorMode === 'dark' ? 'gray.500' : 'blue.100'}`,
        },
        {
          icon: BiCar,
          title: 'Free Return',
          text: 'There are 3 parking spots in the shared campus parking lot available for the guests.',
          color: `${colorMode === 'dark' ? 'teal.300' : 'yellow.100'}`,
        },
      ];
      

    return (
      <VStack spacing={6} alignItems="center" py={20} px={4}>

          <Heading size="lg">What's included?</Heading>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={8} w="full">
          {items.map(({ icon, color, text, title }) => (
            <GridItem key={title}>
              <AspectRatio ratio={{ base: 16 / 9, md: 1 }}>
                <VStack
                  h="full"
                  justifyContent="space-between"
                  p={6}
                  bg={color}
                  rounded="xl"
                >
                  <HStack justifyContent="flex-start" w="full">
                    <Icon as={icon} boxSize={10} />
                  </HStack>
                  <VStack
                    flex={1}
                    spacing={2}
                    alignItems="flex-start"
                    justifyContent="flex-end"
                  >
                    <Heading size="sm">{title}</Heading>
                    <Text fontSize="sm">{text}</Text>
                  </VStack>
                </VStack>
              </AspectRatio>
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    );
  };
  
  export default WhatsIncluded;