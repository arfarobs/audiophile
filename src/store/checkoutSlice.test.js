import { configureStore } from '@reduxjs/toolkit';
import checkoutSlice, {
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
	toggleFormIsSubmitting,
	resetForm,
	addOrder
} from './checkoutSlice';

const store = configureStore({
	reducer: {
		checkout: checkoutSlice,
	},
});

describe('checkoutSlice', () => {
	const createPayload = (value, valid = true) => {
		return {
			value,
			error: !valid,
			message: '',
			valid: valid
		};
	};

	afterEach(() => {
		store.dispatch(resetForm());
	});

	it('sets payment method', () => {
		store.dispatch(setPaymentMethod('e-money'));
		expect(store.getState().checkout.paymentMethod).toBe('e-money');
	});

	it('updates name', () => {
		const payload = createPayload('John Doe');

		store.dispatch(updateName(payload));
		expect(store.getState().checkout.name).toBe(payload);
	});

	it('updates email', () => {
		const payload = createPayload('john@email.com');

		store.dispatch(updateEmail(payload));
		expect(store.getState().checkout.email).toBe(payload);
	});

	it('updates tel', () => {
		const payload = createPayload('123456789');

		store.dispatch(updateTel(payload));
		expect(store.getState().checkout.tel).toBe(payload);
	});

	it('updates address', () => {
		const payload = createPayload('123 Main St');

		store.dispatch(updateAddress(payload));
		expect(store.getState().checkout.address).toBe(payload);
	});

	it('updates zip', () => {
		const payload = createPayload('12345');

		store.dispatch(updateZip(payload));
		expect(store.getState().checkout.zip).toBe(payload);
	});

	it('updates city', () => {
		const payload = createPayload('New York');

		store.dispatch(updateCity(payload));
		expect(store.getState().checkout.city).toBe(payload);
	});

	it('updates country', () => {
		const payload = createPayload('United States');

		store.dispatch(updateCountry(payload));
		expect(store.getState().checkout.country).toBe(payload);
	});

	it('updates e-number', () => {
		const payload = createPayload('123456789');

		store.dispatch(updateENumber(payload));
		expect(store.getState().checkout.eNumber).toBe(payload);
	});

	it('updates pin', () => {
		const payload = createPayload('1234');

		store.dispatch(updatePin(payload));
		expect(store.getState().checkout.pin).toBe(payload);
	});


	it('sets formIsValid to a truthy value when paymentMethod = e-money and form is actually valid', async () => {
		const payload = createPayload('123456789');

		store.dispatch(setPaymentMethod('e-money'));
		store.dispatch(updateName(payload));
		store.dispatch(updateEmail(payload));
		store.dispatch(updateTel(payload));
		store.dispatch(updateAddress(payload));
		store.dispatch(updateZip(payload));
		store.dispatch(updateCity(payload));
		store.dispatch(updateCountry(payload));
		store.dispatch(updateENumber(payload));
		store.dispatch(updatePin(payload));
		store.dispatch(validateOnSubmit());

		expect(store.getState().checkout.formIsValid).toBe(1);
	});

	it('sets formIsValid to a truthy value when paymentMethod = cash and form is actually valid', async () => {
		const payload = createPayload('123456789');

		store.dispatch(setPaymentMethod('cash'));
		store.dispatch(updateName(payload));
		store.dispatch(updateEmail(payload));
		store.dispatch(updateTel(payload));
		store.dispatch(updateAddress(payload));
		store.dispatch(updateZip(payload));
		store.dispatch(updateCity(payload));
		store.dispatch(updateCountry(payload));
		store.dispatch(validateOnSubmit());

		expect(store.getState().checkout.formIsValid).toBe(1);
	});

	it('sets formIsValid to a falsy value when paymentMethod = e-money and form is not valid', async () => {
		const payload = createPayload('123456789', false);

		store.dispatch(setPaymentMethod('e-money'));
		store.dispatch(updateName(payload));
		store.dispatch(updateEmail(payload));
		store.dispatch(updateTel(payload));
		store.dispatch(updateAddress(payload));
		store.dispatch(updateZip(payload));
		store.dispatch(updateCity(payload));
		store.dispatch(updateCountry(payload));
		store.dispatch(updateENumber(payload));
		store.dispatch(updatePin(payload));
		store.dispatch(validateOnSubmit());

		expect(store.getState().checkout.formIsValid).toBe(0);
	});

	it('sets formIsValid to a falsy value when paymentMethod = cash and form is not valid', async () => {
		const payload = createPayload('123456789', false);

		store.dispatch(setPaymentMethod('cash'));
		store.dispatch(updateName(payload));
		store.dispatch(updateEmail(payload));
		store.dispatch(updateTel(payload));
		store.dispatch(updateAddress(payload));
		store.dispatch(updateZip(payload));
		store.dispatch(updateCity(payload));
		store.dispatch(updateCountry(payload));
		store.dispatch(validateOnSubmit());

		expect(store.getState().checkout.formIsValid).toBe(0);
	});

	it('toggles formIsSubmitting', () => {
		store.dispatch(toggleFormIsSubmitting());
		expect(store.getState().checkout.formIsSubmitting).toBe(true);

		store.dispatch(toggleFormIsSubmitting());
		expect(store.getState().checkout.formIsSubmitting).toBe(false);
	});

	it('resets form', () => {
		const payload = createPayload('123456789');
		const emptyPayload = {value: '', error: false, message: '', valid: false};

		store.dispatch(setPaymentMethod('cash'));
		store.dispatch(updateName(payload));
		store.dispatch(updateEmail(payload));
		store.dispatch(updateTel(payload));
		store.dispatch(updateAddress(payload));
		store.dispatch(updateZip(payload));
		store.dispatch(updateCity(payload));
		store.dispatch(updateCountry(payload));
		store.dispatch(updateENumber(payload));
		store.dispatch(updatePin(payload));
		store.dispatch(validateOnSubmit());
		store.dispatch(toggleFormIsSubmitting());
		store.dispatch(resetForm());

		expect(store.getState().checkout.paymentMethod).toBe('e-money');
		expect(store.getState().checkout.name).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.email).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.tel).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.address).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.zip).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.city).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.country).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.eNumber).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.pin).toStrictEqual(emptyPayload);
		expect(store.getState().checkout.formIsValid).toBe(false);
		expect(store.getState().checkout.formIsSubmitting).toBe(false);
	});

	it('adds order to state', () => {
		const fixedDate = new Date('2023-05-09T14:06:45Z');
		const originalDate = Date;
		global.Date = jest.fn(() => fixedDate);
		global.Date.now = jest.fn(() => fixedDate.getTime());

		const payload = {
			cart: {
				items: 'some items'
			},
			checkoutData: {
				data: 'some checkout data'
			},
			cost: {
				total: 'some total'
			}
		};

		const expectedOrder = {
			cart: {
				items: 'some items'
			},
			form: {
				data: 'some checkout data',
				paymentMethod: 'e-money'
			},
			cost: {
				total: 'some total'
			},
			date: fixedDate.toUTCString()
		};

		store.dispatch(addOrder(payload));
		expect(store.getState().checkout.order).toStrictEqual(expectedOrder);

		global.Date = originalDate;
	});
});