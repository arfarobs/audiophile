import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productQuantity: 1
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		handleProductQuantity (state, action) {
			const { payload } = action;

			switch (payload) {
			case 'up':
				state.productQuantity += 1;
				break;
			case 'down':
				if (state.productQuantity > 1) {
					state.productQuantity -= 1;
				}
				break;
			default:
				break;
			}
		},
		resetQuantity (state) {
			state.productQuantity = 1;
		}
	}
});

export const { handleProductQuantity, resetQuantity } = productSlice.actions;

export default productSlice.reducer;