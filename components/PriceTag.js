import { HStack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'



export const PriceTag = (props) => {
  const { price, currency, salePrice, rootProps, priceProps,  } = props
  return (
    <HStack spacing="1">
      <Price textProps={price}>
        
          {price}
        
      </Price>
    </HStack>
  )
}

const Price = (props) => {
  const { isOnSale, children } = props
  const defaultColor = mode('gray.700', 'gray.400')
  const onSaleColor = mode('gray.400', 'gray.700')
  const color = isOnSale ? onSaleColor : defaultColor
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
      textDecoration={isOnSale ? 'line-through' : 'none'}
   
    >
      {children}
    </Text>
  )
}

