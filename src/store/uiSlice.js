import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	menuIsOpen: false,
	cartIsOpen: false,
	showConfirmation: false,
	showInvalidMessage: false,
	isLoading: true,
	showSubmissionError: false
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleMenuIsOpen (state) {
			state.menuIsOpen = !state.menuIsOpen;
			if (state.cartIsOpen) {
				state.cartIsOpen = !state.cartIsOpen;
			}
		},
		toggleCartIsOpen (state) {
			state.cartIsOpen = !state.cartIsOpen;
			if (state.menuIsOpen) {
				state.menuIsOpen = !state.menuIsOpen;
			}
		},
		toggleConfirmation (state) {
			state.showConfirmation = !state.showConfirmation;
		},
		toggleShowInvalidMessage (state) {
			state.showInvalidMessage = !state.showInvalidMessage;
		},
		setIsLoading (state, action) {
			state.isLoading = action.payload;
		},
		toggleShowSubmissionError (state) {
			state.showSubmissionError = !state.showSubmissionError;
		}
	}
});

export const { 
	toggleMenuIsOpen, 
	toggleCartIsOpen, 
	toggleConfirmation, 
	toggleShowInvalidMessage, 
	setIsLoading, 
	toggleShowSubmissionError 
} = uiSlice.actions;

export default uiSlice.reducer;