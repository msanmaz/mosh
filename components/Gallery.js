import {
    AspectRatio,
    GridItem,
    Image,
    Grid,
    Text,
    Button,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  
  const Gallery = () => {
    const [pictures,SetPictures] = useState('/images/1.jpg')


    
    const images = [1, 2, 3,4,5,6].map(
      (index) => `/images/${index}.jpg`
    );
  
    const nextTwo = [images[0],images[1], images[2]];
  
    return (
      <Grid
        templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
        templateRows={{ base: 'repeat(4, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={3}
        px={10}
        w={{base:'100%', md:'50%',xl:'55%'}}
      >
        <GridItem colSpan={3} rowSpan={3}>
          <AspectRatio ratio={1}>
            <Image
              objecjfit= "cover"
              rounded={{ base: 'xl', md: '3xl' }}
              src={pictures}
              alt="Beach House Photo"
            />
          </AspectRatio>
        </GridItem>
        {nextTwo.map((image, index) => (
          <GridItem
            key={image}
            colSpan={1}
            rowSpan={1}
            colStart={{ base: index + 1, md: 4 }}
            rowStart={{ base: 4, md: index + 1 }}
          >
            <AspectRatio ratio={1}>
              <Image cursor={'pointer'} onClick={ () => SetPictures(image)}
                rounded={{ base: 'xl', md: '3xl' }}
                src={image}
                alt="Beach House Photo"
              />
            </AspectRatio>
          </GridItem>
        ))}

      </Grid>
    );
  };
  
  export default Gallery;