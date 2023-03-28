import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	paymentMethod: 'e-money',
	name: {value: '', error: false, message: '', valid: false},
	email: {value: '', error: false, message: '', valid: false},
	tel: {value: '', error: false, message: '', valid: false},
	address: {value: '', error: false, message: '', valid: false},
	zip: {value: '', error: false, message: '', valid: false},
	city: {value: '', error: false, message: '', valid: false},
	country: {value: '', error: false, message: '', valid: false},
	eNumber: {value: '', error: false, message: '', valid: false},
	pin: {value: '', error: false, message: '', valid: false},
	formIsValid: false,
	formIsSubmitting: false,
	order: {
		cart: [],
		form: {},
		cost: {},
		date: ''
	}
};

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		setPaymentMethod (state, action) {
			state.paymentMethod = action.payload;
		},
		updateName (state, action) {
			state.name = action.payload;
		},
		updateEmail (state, action) {
			state.email = action.payload;
		},
		updateTel (state, action) {
			state.tel = action.payload;
		},
		updateAddress (state, action) {
			state.address = action.payload;
		},
		updateZip (state, action) {
			state.zip = action.payload;
		},
		updateCity (state, action) {
			state.city = action.payload;
		},
		updateCountry (state, action) {
			state.country = action.payload;
		},
		updateENumber (state, action) {
			state.eNumber = action.payload;
		},
		updatePin (state, action) {
			state.pin = action.payload;
		},
		validateOnSubmit (state) {
			if (state.paymentMethod === 'e-money') {
				state.formIsValid = state.name.valid & state.email.valid & state.tel.valid & state.address.valid & state.zip.valid & state.city.valid & state.country.valid & state.eNumber.valid & state.pin.valid;
			} else {
				state.formIsValid = state.name.valid & state.email.valid & state.tel.valid & state.address.valid & state.zip.valid & state.city.valid & state.country.valid;
			}
		},
		toggleFormIsSubbmitting (state) {
			state.formIsSubmitting = !state.formIsSubmitting;
		},
		resetForm () {
			return initialState;
		},
		addOrder (state, action) {
			const {cart, checkoutData, cost} = action.payload;
			state.order.cart = cart;
			state.order.form = checkoutData;
			state.order.cost = cost;
			state.order.form.paymentMethod = state.paymentMethod;
			state.order.date = Date();
		}
	}
});

export const { 
	setPaymentMethod, 
	updateName, 
	updateEmail, 
	updateTel, 
	updateAddress,
	updateZip,
	updateCity, 
	updateCountry, 
	updateENumber, 
	updatePin,
	validateOnSubmit,
	toggleFormIsSubbmitting,
	resetForm,
	addOrder
} = checkoutSlice.actions;

export default checkoutSlice.reducer;