import React from 'react'
import { Select, FormLabel, FormControl,useColorModeValue } from '@chakra-ui/react'

function FormSelect({title,array,register,callback,placeholder}) {


  return (
      <>
      <FormControl isRequired>
      <FormLabel htmlFor={title} >{title}</FormLabel>
    <Select autoComplete='false' mb={2} placeholder={placeholder} bg={useColorModeValue('gray.100', 'gray.700')}
                    _placeholder={{
                        color: 'gray.400'}} id={title}  {...register(title)} onChange={(e) => {
        e.preventDefault()
        callback(e.target.value)
    }}>
          {array ? array.map((c) => (
            <option key={c.id} id={c.label} value={c.id}>{c.label}</option>
          )) :  <option>Loading....</option>
          }

    </Select>

      </FormControl>

    </>
  )
}

export default FormSelect