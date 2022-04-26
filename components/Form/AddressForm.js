import { VStack, Stack,FormControl,FormErrorMessage } from '@chakra-ui/react'
import { useState } from 'react'
import {
  Button,Flex
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import FormInput from './FormInput'
import CountrySelect from './CountrySelect'
import { css } from "@emotion/react";



const addressParams = [
  { name: "firstName", type: 'text', alias: 'First Name',style:'33%', minLength:3, pattern:/^[A-Za-z]+$/i },
  { name: "lastName", type: 'text', alias: 'Last Name',style:'33%', },
  { name: "email", type: 'text', alias: 'Email' ,style:'33%',pattern: /^\S+@\S+$/i, length:80},
  { name: "phoneNumber", type: 'tel', alias: 'Phone Number' ,style:'33%'},
  {name:"postCode", type:'text',alias:"Postal Code",style:'33%'},
  {name:"town", type:'text',alias:"Town",style:'33%'},
  {name:"address", type:'text',alias:"Address", style:'50%'},
]

const errMessage = [
  {
    type: "manual",
    name: "firstName",
    message: "Name should be greatear than 3 characters"
  },
  {
    type: "manual",
    name: "email",
    message: "Invalid Email"
  }
]


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function AddressForm({ setShippingData }) {
  const { handleSubmit, register, setValue,setError, formState:{errors} } = useForm()

  const [disabled,setDisabled] = useState(true)

  const submitData = (data) => {
    setShippingData(data)
    console.log(data)
  }
  console.log(errors)
  return (
    <VStack w="full">

          <form style={{width:'100%', display:"flex",flexWrap:"wrap"}} onSubmit={handleSubmit(submitData)}>

            {addressParams.map((param) => {
              return <Stack mx={2} w={{base:"100%",md:"48%"}} key={param.name} flexGrow={1}> <FormInput key={param.name} param={param} register={register} />
               </Stack>
            })}
             
          <CountrySelect setDisabled={setDisabled} register={register} setValue={setValue}/>
          <Flex w="100%"  justify="flex-end">
          <Button mx={2} size={'sm'}  bgColor={'green.600'} type="submit" 
           onClick={() => {
      errMessage.forEach(({ name, type, message }) =>
              setError(name, { type,message })
            );
          }}
          >Next</Button>

          </Flex>
          </form>








    </VStack>
  )
}

export default AddressForm