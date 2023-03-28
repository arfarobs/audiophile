import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './uiSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import checkoutReducer from './checkoutSlice';

import { initialCartState } from './cartSlice';

export const store = configureStore({
	reducer: {
		ui: uiReducer,
		cart: cartReducer,
		product: productReducer,
		checkout: checkoutReducer
	},
	preloadedState: {
		cart: initialCartState
	}
});