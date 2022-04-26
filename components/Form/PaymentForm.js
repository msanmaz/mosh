import { React, useEffect, useState } from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { Button, Heading, Text, Spinner, VStack, FormLabel, Spacer,Box, Flex } from '@chakra-ui/react';
import { refreshCart } from '../../lib/redux';
import commerce from '../../lib/commerce'




const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '14px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}
const appearance = {
  // If you are planning to extensively customize rules, use the "none"
  // theme. This theme provides a minimal number of rules by default to avoid
  // interfering with your custom rule definitions.
  theme: 'minimal',
  hidePostalCode: true,

};

function PaymentForm({ shippingData, secret,prevStep }) {
  const stripePromise = new loadStripe(secret);


  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(false)
  const [error, setError] = useState(false)
  const checkoutToken = useSelector(state => state.checkout)




  const dispatch = useDispatch()



  async function payNow(event, elements, stripe) {
    event.preventDefault()

    if (!stripe || !elements) return;

    const orderDetails = {
      line_items: checkoutToken.live.line_items,
      customer: {
        email: shippingData.email,
        firstname: shippingData.firstName,
        lastname: shippingData.lastName
      },
      shipping: {
        name: "Primary",
        street: shippingData.address,
        country_state: shippingData.County,
        town_city: shippingData.town,
        postal_zip_code: shippingData.postCode,
        country: shippingData.Country
      },
      fulfillment: {
        shipping_method: shippingData['Shipping']
      },
      billing: {
        name: shippingData.firstName,
        surname: shippingData.lastName,
        street: shippingData.address,
        town_city: shippingData.town,
        county_state: shippingData.County,
        postal_zip_code: shippingData.postCode,
        country: shippingData.Country,
      },

    }

    const cardElement = elements.getElement('card')
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })
    if (error) {
      setError(error.message)
      console.log(error)
    } else {
      setLoading(true)
      setError(false)
      try{
        await commerce.checkout.capture(checkoutToken.id, {
          ...orderDetails,
          payment: {
            gateway: 'stripe',
            stripe: {
              payment_method_id: paymentMethod.id
  
            }
            // card: {
            //   number: carddata.Number,
            //   expiry_month: carddata.Expiry_Month,
            //   expiry_year: carddata.Expiry_Year,
            //   cvc: carddata.CVC,
            //   postal_zip_code: carddata.Postal_ZIP_Code,
  
            // }
          }
        }).then((res) => {
          setOrder(res)
          setLoading(false)
          dispatch(refreshCart())
        })

      }catch (response) {
        // We can check if the error is not related to additional payment steps being required
        if (response.statusCode !== 402 || response.data.error.type !== 'requires_verification') {
          // Handle the error as usual because it's not related to 3D secure payments
          setError(response.data.error.message)
          return;
        }
      
        // Otherwise we need to continue with the 3DS process. We can use the Stripe SDK to show a modal to the customer.
        // Commerce.js provides us the "param" attribute that refers to a PaymentIntent that was created with Stripe by the
        // Chec API.
        const cardActionResult = await stripe.handleCardAction(response.data.error.param)
      
        if (cardActionResult.error) {
          // The customer failed to authenticate themselves with their bank and the transaction has been declined
          setError(cardActionResult.error.message);
          return;
        }
      
        // Now we can try to capture the order again, this time passing the payment intent ID:
        try {
          const order = await commerce.checkout.capture(checkoutToken.id, {
            ...orderDetails,
            payment: {
              gateway: 'stripe',
              stripe: {
                payment_intent_id: cardActionResult.paymentIntent.id,
              },
            },
          });
      
          setOrder(order)
          setLoading(false)
          setError(false)
          return;
        } catch (response) {
          console.log(response);
          setError(response.message);
        }
      }
     

    }

  }


  return (
    <>
      {error && <VStack w={{ base: '90%', md: 'full' }} py={4}><Text color="red">Error:{error}</Text></VStack>}
      {order && <VStack w={{ base: '90%', md: 'full' }} py={4}>{" "} <Heading>Your Order Has Been Succesfully Placed</Heading>  <Text fontSize={'md'}>Thanks for ordering</Text> <Text fontSize={'xl'}>Your Order Reference : {order.customer_reference}</Text>  </VStack>}
      {loading && (<VStack w={{ base: '90%', md: 'full' }} py={4}><Text> Wait while we processing your payment... </Text>  <Spinner my={4} size='md' /> </VStack>)}
      <VStack w='full' mr={4}>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form className='md:w-[40rem] w-[20rem]' onSubmit={(event) => payNow(event, elements, stripe)}>
                <FormLabel>Card Number</FormLabel>
                <CardElement options={cardStyle} className='rounded-xl p-3 border border-indigo-900 border-opacity-10 max-h-11 w-[100%] bg-white text-sm' />
                <br />
                  <Flex>
                  <Button bgColor={'purple.600'} _hover={{ bg: 'purple.500' }} type='submit' variant="contained" disabled={loading} color="primary">
                    {order ? (
                      'Payment successful ✔️'
                    ) : loading ? (
                      <Spinner size={"md"} />
                    ) : (
                      `Pay €${checkoutToken.live.subtotal.raw + checkoutToken.live.shipping.available_options[0].price.raw}`
                    )}
                  </Button>
                  <Spacer/>
                  <Button onClick={prevStep}>Back</Button>
                  </Flex>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </VStack>


      {/* <form onSubmit={handleSubmit(payNow)}>
          <FormInput param={{ name: "Number", type: 'number', alias: 'Card Number' }} register={register} />
          <FormInput param={{ name: "Expiry_Month", type: 'number', alias: 'Expiry Month' }} register={register} />
          <FormInput param={{ name: "Expiry_Year", type: 'number', alias: 'Expiry Year' }} register={register} />
          <FormInput param={{ name: "CVC", type: 'number', alias: 'CVC' }} register={register} />
          <FormInput param={{ name: "Postal_ZIP_Code", type: 'number', alias: 'Postal Code' }} register={register} />
          <Text fontSize={'md'}>Total:{checkoutToken?.live.total.formatted_with_symbol} + Shipping {shippingCharges.price.formatted_with_symbol}  </Text>
          <Button type="submit">{loading ? <Spinner size='md' /> : "Pay Now"}</Button>



        </form> */}



    </>
  )
}

export default PaymentForm