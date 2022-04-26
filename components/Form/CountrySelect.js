import React from 'react'
import { fetchCity, fetchShipping, shippingOptions } from '../../lib/redux'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useMemo, useCallback } from 'react'
import FormSelect from './FormSelect'
import { Box, HStack,VStack,Stack } from '@chakra-ui/react'
import commerce from '../../lib/commerce'

function CountrySelect({ register }) {
    const dispatch = useDispatch()
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [ship, setShip] = useState(null)
    const [loading, setLoading] = useState(false)




    const checkoutToken = useSelector(state => state.checkout)
    const shippingCountry = useSelector(state => state.countries)
    const shippingCity = useSelector(state => state.cities)
    const shippingOpt = useSelector(state => state.shippingOpt)



    const country = useMemo(() => {
        if (!shippingCountry) return []


        return Object.entries(shippingCountry).map(([code, name]) => ({ id: code, label: name }))
    }, [shippingCountry])



    const city = useMemo(() => {
        if (!shippingCity) return []


        return Object.entries(shippingCity).map(([code, name]) => ({ id: code, label: name }))
    }, [shippingCity])

    const shipping = shippingOpt?.map((elem) => (
        {
            id: elem.id,
            label: `${elem.description} - ${elem.price.formatted_with_symbol}`
        }
    ))

    useEffect(() => {
        if (checkoutToken) {
            dispatch(fetchShipping(checkoutToken.id))
        }
    }, [checkoutToken])



    useEffect(() => {
        if (selectedCountry) {
            dispatch(fetchCity(checkoutToken.id, selectedCountry))
        }
    }, [selectedCountry])



    useEffect(() => {

        if (selectedCity) {
            dispatch(shippingOptions(checkoutToken.id, selectedCountry, selectedCity))
        }
    }, [selectedCity])



    return (
        <>
        <HStack w={'full'} px={2} py={2} flexWrap={'no-wrap'}>
            <FormSelect title="Country" callback={setSelectedCountry} array={country} register={register} placeholder={'Select Country'} />
            <FormSelect title="County" array={city} callback={setSelectedCity} register={register} placeholder={'Select City'} />
            <FormSelect title="Shipping" array={shipping} callback={setShip} register={register} placeholder={'Shipping Options'} />



        </HStack>




        </>
    )
}

export default CountrySelect