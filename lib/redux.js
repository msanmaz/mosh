import { createSelector, createSlice, configureStore } from '@reduxjs/toolkit'
import commerce from './commerce'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'




const MODAL_HIDDEN = 'onClose'
const MODAL_CART = 'isOpen'
const MODAL_CHECKOUT = 2


export const COMMON_PROPS = ['categories', 'merchant']


const initialState = {
	categories: [],
	merchant: {},
	cart: null,
	modal: MODAL_HIDDEN,
	checkout: null,
	pending: false,
}



export const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
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
			s.checkout = null
			if (!payload || !payload.line_items.length) s.modal = 0
		},
		setModal: (s, { payload }) => {
			s.modal = payload
		},
		tokenGenerated: (s, { payload }) => {
			s.pending = false
			s.checkout = payload
			s.modal = 2
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

export const { setCart, setModal, setPending, setServerState } = slice.actions

//* Thunks *//

// Cart

export const loadCart = () => async dispatch => {
	try {
		commerce.cart.retrieve().then((cart) => dispatch(setCart(cart)));
	} catch (error) {
		dispatch(genericError(error))
	}
}

export const addToCart = (id, quantity, variantId) => async dispatch => {
	//if (!id || !quantity) throw Error('Invalid operation')
	dispatch(setPending(true))

	const res = await commerce.cart.add(id, quantity, variantId)
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

// Checkout

export const generateToken = () => async dispatch => {
	try {
		const id = commerce.cart.id()
		if (!id) {
			console.error('Cannot generate token without an id')
			return
		}

		dispatch(setPending(true))
		const checkout = await commerce.checkout.generateToken(id, { type: 'cart' })
		dispatch(tokenGenerated(checkout))
	} catch (error) {
		dispatch(genericError(error))
	}
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