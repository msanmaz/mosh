import {
  Box,
    Image,
    Grid,
    AspectRatio,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  
  const Gallery = (props) => {
    const [pictures,SetPictures] = useState('/images/1.jpg')


    
    const images = [1,2,3].map(
      (index) => `/images/${index}.jpg`
    );
  
    const nextTwo = [images[0],images[1], images[2]];
  
    return (

      <Box w={{base:'full',md:'58.33%', lg:'66%'}}px={{base:0, md:'2rem', sm:'1rem'}} >
      <Box mb={{base:'3rem', md:'6rem'}} mt={{base:0}} ml={{md:'-5rem'}}>
        <Box position='relative'>

          <Box w={'auto'}>
            <Box backgroundColor="rgb(247, 248, 249)">
              <Box position="relative">
                <AspectRatio ratio={4/3}>
                <Image w={'full'} src={`${props.image}`}/>
                </AspectRatio>
              </Box>
            </Box>
          </Box>

          
          <Box w="auto">
            <Box  backgroundColor="rgb(247, 248, 249)">
              <Box position={'relative'}>
                <Image w='full' src={`${props.image}`} />
              </Box>
            </Box>
          </Box>



        </Box>

      </Box>
    </Box>
    );
  };
  
  export default Gallery;