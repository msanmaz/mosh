import { createSelector, createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import commerce from './commerce'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'




const MODAL_HIDDEN = 0
const MODAL_VISIBLE = 1


export const COMMON_PROPS = ['categories', 'merchant']


const initialState = {
	categories: [],
	merchant: {},
	cart: null,
	modal: MODAL_VISIBLE,
	checkout: null,
	pending: false,
	countries: [],
	cities:[],
	divisons:[],
	shippingOpt:null
}



export const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		updateVal(state,{payload: {val,key}}) {
			state[key] = val
		},
		setServerState: (s, { payload }) => {
			if (!payload) return
			for (const [key, value] of Object.entries(payload)) {
				if (COMMON_PROPS.includes(key)) s[key] = value
			}
		},
		setPending: (s, { payload }) => {
			s.pending = payload
		},
		setCart: (s, { payload }) => {
			s.pending = false
			s.cart = payload
		},
		setModal: (s, { payload }) => {
			s.modal = payload
		},
		tokenGenerated: (s, { payload }) => {
			s.checkout = payload
		},
		setCountries: (s, { payload }) => {
			s.countries = payload
		},
		setCities: (s, { payload }) => {
			s.cities = payload
		},
		setShipping : (s,{payload}) => {
				s.shippingOpt = payload
		},
		setLive: (s, { payload }) => {
			if (!s.checkout) {
				console.error('Cant update live object checkout')
				return
			}
			s.pending = false
			s.checkout.live = payload
		},
	},
	extraReducers: {
		// Called on client, payload contains entire server state
		[HYDRATE]: (s, { payload }) => {
			if (!payload) return
			for (const [key, value] of Object.entries(payload)) {
				if (COMMON_PROPS.includes(key)) s[key] = value
			}
		},
	},
})

//* Actions *//

export const { setCart, setModal, setPending, setServerState,tokenGenerated,setCountries, updateVal,setCities, setShipping } = slice.actions

//* Thunks *//

// Cart

export const loadCart = () => async dispatch => {
	try {
		commerce.cart.retrieve().then((cart) => dispatch(setCart(cart)))

	} catch (error) {
		dispatch(genericError(error))
	}
}

export const addToCart = (id, quantity, variant={}) => async dispatch => {
	console.log(id,quantity,variant)
	dispatch(setPending(true))

	const res = await commerce.cart.add(id, quantity, {...variant})
	dispatch(setCart(res.cart))
}



export const changeItemQuantity = (id, quantity) => async dispatch => {
	dispatch(setPending(true))
	const res = await commerce.cart.update(id, { quantity })
	dispatch(setCart(res.cart))
}

export const removeFromCart = id => async dispatch => {
	dispatch(setPending(true))
	const res = await commerce.cart.remove(id)
	dispatch(setCart(res.cart))
}

export const emptyCart = () => async dispatch => {
	dispatch(setPending(true))
	const res = await commerce.cart.empty()
	dispatch(setCart(res.cart))
}

export const removeCart = () => async dispatch => {
	locookie.remove('commercejs_cart_id')
	dispatch(setCart(null))
}

export const refreshCart = () => async dispatch => {
	const res = await commerce.cart.refresh()
	dispatch(setCart(res.cart))
}

// Checkout

export const generateToken = () => async dispatch => {
	try {
		const id = commerce.cart.id()
		if (!id) {
			console.error('Cannot generate token without an id')
			return
		}
		const checkout = await commerce.checkout.generateToken(id, { type: 'cart' })
		dispatch(tokenGenerated(checkout))
	} catch (error) {
		console.log(error)
	}
}

export const fetchShipping = (tokenId) => async dispatch => {
	if(!tokenId){
		console.log('no token id')
	}
	const {countries}  = await commerce.services.localeListShippingCountries(tokenId)
	dispatch(setCountries(countries))
}

export const fetchCity = (tokenId,countryId) => async dispatch => {
	if(!countryId){
		console.log('no countryCode')
	}
	const cities  = await commerce.services.localeListShippingSubdivisions(tokenId,countryId)
	dispatch(setCities(cities.subdivisions))
}

export const shippingOptions = (tokenId,countryId, cityId) => async dispatch => {
	if(!tokenId){
		console.log('shippin parameter error')
	}

	const ship  = await commerce.checkout.getShippingOptions(tokenId,{country:countryId,region:cityId})
	dispatch(setShipping(ship))

}


export const loadGdpr = () => async dispatch => {
	dispatch(set)
}



//* Selectors *//

export const selectPending = s => s.pending

export const selectCart = s => s.cart ?? {}

export const selectNumCartItems = s => s.cart?.line_items.length ?? 0

export const selectModal = s => s.modal

export const selectCheckout = s => s.checkout

export const selectLive = s => s.checkout?.live ?? null

export const selectCategories = s => s.categories

export const selectMerchant = s => s.merchant

// Export

// export default slice.reducer
const { reducer } = slice

const makeStore = () =>
	configureStore({
		reducer,
	})

export const wrapper = createWrapper(makeStore)