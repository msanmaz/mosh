import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateToken, loadCart } from '../../lib/redux'
import {
  Flex, Container,
  Stack,
  Heading,
  Center,
  VStack,
  Button
} from '@chakra-ui/react'
import { Step, Steps, useSteps } from "chakra-ui-steps"
import AddressForm from '../../components/Form/AddressForm'
import PaymentForm from '../../components/Form/PaymentForm'
import CheckoutSide from '../../components/CheckoutSide'
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;




function checkout(props) {
  const dispatch = useDispatch()
  const checkoutToken = useSelector(state => state.checkout)




  const [shippingData, setShippingData] = useState()


  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })


  useEffect(() => {
    dispatch(generateToken())
    dispatch(loadCart())
  }, [])





  const steps = [<AddressForm setShippingData={(data) => {
    setShippingData(data);
    nextStep();
  }} prevStep={prevStep} activeStep={activeStep} checkoutToken={checkoutToken} />, <PaymentForm secret={props.secret} shippingData={shippingData} prevStep={prevStep} />];

  const stepsLabel = [{ label: "Contact Details" }, { label: "Payment Details" }]


  return (

    <Container maxW={'container.2xl'} pt={20}>
      <Center>
        <Heading>Checkout</Heading>

      </Center>

      {checkoutToken !== null ? <Stack w={'full'} direction={{ base: 'column', md: 'row' }}>



        <Flex flexDir="column" h={'full'} px={{ base: '0', md: 4 }} width={{ base: "100%", md: "100%" }} pt={10}>
          <Steps activeStep={activeStep}>
            {stepsLabel.map(({ label }, index) => (
              <Step label={label} key={label}>
                {steps[index]}
              </Step>
            ))}
          </Steps>
        </Flex>



        <CheckoutSide />




      </Stack> : <Stack h={'50vh'}><VStack py={40}><BounceLoader color={"#ffffff"} css={override} size={50} /></VStack>  </Stack>}




    </Container>
  )
}

export default checkout


export const getStaticProps = async () => {
  return {
   props: {
    secret: process.env.STRIPE_LIVE
   }
  }
 }