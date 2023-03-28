import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart (state, action) {
			const productIndex = state.cart.findIndex(product => product.productName === action.payload.productName);

			if (productIndex === -1) {
				const newCartItem = action.payload;
				state.cart.push(newCartItem);
			} else {
				const cartItem = state.cart[productIndex];
				cartItem.quantity = cartItem.quantity + action.payload.quantity;
			}
			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		handleCartQuantity (state, action) {
			const productIndex = state.cart.findIndex(product => product.productName === action.payload.productName);
			const productToChange = state.cart[productIndex];

			if (action.payload.direction === 'up') {
				productToChange.quantity += 1;
			} else if (action.payload.direction === 'down' && productToChange.quantity > 1) {
				productToChange.quantity -= 1;
			} else {
				state.cart.splice(productIndex, 1);
			}
			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		removeAll (state) {
			state.cart = [];
			localStorage.clear();
		}
	}
});

export const initialCartState = {
	cart: JSON.parse(localStorage.getItem('cart')) || []
};

export const { addToCart, handleCartQuantity, removeAll } = cartSlice.actions;

export default cartSlice.reducer;