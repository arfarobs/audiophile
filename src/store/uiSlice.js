import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	menuIsOpen: false,
	cartIsOpen: false,
	showConfirmation: false,
	showInvalidMessage: false,
	isLoading: true,
	showSubmissionError: false,
	showSignIn: false,
	showMessage: false
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
		},
		toggleShowSignIn (state) {
			state.showSignIn = !state.showSignIn;
		},
		toggleShowMessage (state, action) {
			state.showMessage = action.payload;
		}
	}
});

export const { 
	toggleMenuIsOpen, 
	toggleCartIsOpen, 
	toggleConfirmation, 
	toggleShowInvalidMessage, 
	setIsLoading, 
	toggleShowSubmissionError,
	toggleShowSignIn,
	toggleShowMessage
} = uiSlice.actions;

export default uiSlice.reducer;