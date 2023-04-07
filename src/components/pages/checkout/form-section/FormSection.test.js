import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import FormSection from './FormSection';
import { billingDetailsInputs, eMoneyInputs, radioInputs, shippingInfoInputs } from '../../../../data/inputs';
import { configureStore } from '@reduxjs/toolkit';
import checkoutReducer from '../../../../store/checkoutSlice';

const mockStore = configureMockStore();

const createMockStore = (paymentMethod) => {
	const store = mockStore({
		checkout: {
			paymentMethod: paymentMethod || 'e-money',
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
		}
	});

	store.dispatch = jest.fn();

	return store;
};

const createStore = () => {
	const store = configureStore({
		reducer: {
			checkout: checkoutReducer,
		}
	});

	return store;
}

const renderFormSection = (store, legend, inputs, radios) => {
	return {
		...render(
			<Provider store={store} >
				<FormSection legend={legend} inputs={inputs} radios={radios} />
			</Provider>
		),
		store,
	};
};

describe('billing details', () => {
	test('should render the billing details FormSection component correctly', () => {
		renderFormSection(createMockStore(), 'billing details', billingDetailsInputs);

		const fieldset = screen.getByRole('group');
		const legend = screen.getByText(/billing details/i);
		const nameInput = screen.getByLabelText(/name/i);
		const emailInput = screen.getByLabelText('Email Address');
		const telInput = screen.getByLabelText(/phone number/i);

		expect(fieldset).toBeInTheDocument();
		expect(legend).toBeInTheDocument();
		expect(nameInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(telInput).toBeInTheDocument();
	});

	it('should not display other inputs when legend = billing details', () => {
		renderFormSection(createMockStore(), 'billing details', billingDetailsInputs);

		const addressInput = screen.queryByLabelText('Address');
		const zipInput = screen.queryByLabelText(/zip code/i);
		const cityInput = screen.queryByLabelText(/city/i);
		const countryInput = screen.queryByLabelText(/country/i);
		const radio = screen.queryByRole('radio');
		const eNumberInput = screen.queryByLabelText(/e-number/i);
		const pinInput = screen.queryByLabelText(/pin/i);

		expect(addressInput).not.toBeInTheDocument();
		expect(zipInput).not.toBeInTheDocument();
		expect(cityInput).not.toBeInTheDocument();
		expect(countryInput).not.toBeInTheDocument();
		expect(radio).not.toBeInTheDocument();
		expect(eNumberInput).not.toBeInTheDocument();
		expect(pinInput).not.toBeInTheDocument();
	});

	
});

describe('shipping info', () => {
	test('should render the shipping info FormSection component correctly', () => {
		renderFormSection(createMockStore(), 'shipping info', shippingInfoInputs);

		const fieldset = screen.getByRole('group');
		const legend = screen.getByText(/shipping info/i);
		const addressInput = screen.getByLabelText(/address/i);
		const zipInput = screen.getByLabelText(/zip code/i);
		const cityInput = screen.getByLabelText(/city/i);
		const countryInput = screen.getByLabelText(/country/i);

		expect(fieldset).toBeInTheDocument();
		expect(legend).toBeInTheDocument();
		expect(addressInput).toBeInTheDocument();
		expect(zipInput).toBeInTheDocument();
		expect(cityInput).toBeInTheDocument();
		expect(countryInput).toBeInTheDocument();
	});

	it('should not display other inputs when legend = shipping info', () => {
		renderFormSection(createMockStore(), 'shipping info', shippingInfoInputs);

		const nameInput = screen.queryByLabelText(/name/i);
		const emailInput = screen.queryByLabelText('Email Address');
		const telInput = screen.queryByLabelText(/phone number/i);
		const radio = screen.queryByRole('radio');
		const eNumberInput = screen.queryByLabelText(/e-number/i);
		const pinInput = screen.queryByLabelText(/pin/i);

		expect(nameInput).not.toBeInTheDocument();
		expect(emailInput).not.toBeInTheDocument();
		expect(telInput).not.toBeInTheDocument();
		expect(radio).not.toBeInTheDocument();
		expect(eNumberInput).not.toBeInTheDocument();
		expect(pinInput).not.toBeInTheDocument();
	});
});

describe('payment details', () => {
	it('should render the payment details FormSection component correctly when payment method = eMoney', () => {
		renderFormSection(createMockStore(), 'payment details', eMoneyInputs, radioInputs);

		const fieldset = screen.getByRole('group');
		const legend = screen.getByText(/payment details/i);
		const heading = screen.getByRole('heading', {name: /payment method/i});
		const eNumberInput = screen.getByLabelText(/e-money number/i);
		const pinInput = screen.getByLabelText(/e-money pin/i);
		const [eMoneyRadio, cashRadio] = screen.getAllByRole('radio');
		const cashImg = screen.queryByTestId(/cashImg/i);
		const cashMessage = screen.queryByTestId(/cashMessage/i);

		expect(fieldset).toBeInTheDocument();
		expect(legend).toBeInTheDocument();
		expect(heading).toBeInTheDocument();
		expect(eNumberInput).toBeInTheDocument();
		expect(pinInput).toBeInTheDocument();
		expect(eMoneyRadio).toBeInTheDocument();
		expect(cashRadio).toBeInTheDocument();
		expect(cashImg).not.toBeInTheDocument();
		expect(cashMessage).not.toBeInTheDocument();
	});

	it('should render the payment details FormSection component correctly when payment method = cash', () => {
		renderFormSection(createMockStore('cash'), 'payment details', eMoneyInputs, radioInputs);

		const fieldset = screen.getByRole('group');
		const legend = screen.getByText(/payment details/i);
		const heading = screen.getByRole('heading', {name: /payment method/i});
		const eNumberInput = screen.queryByLabelText(/e-money number/i);
		const pinInput = screen.queryByLabelText(/e-money pin/i);
		const [eMoneyRadio, cashRadio] = screen.getAllByRole('radio');
		const cashImg = screen.getByTestId(/cashImg/i);
		const cashMessage = screen.getByTestId(/cashMessage/i);

		expect(fieldset).toBeInTheDocument();
		expect(legend).toBeInTheDocument();
		expect(heading).toBeInTheDocument();
		expect(eNumberInput).not.toBeInTheDocument();
		expect(pinInput).not.toBeInTheDocument();
		expect(eMoneyRadio).toBeInTheDocument();
		expect(cashRadio).toBeInTheDocument();
		expect(cashImg).toBeInTheDocument();
		expect(cashMessage).toBeInTheDocument();
	});

	it('should not display other inputs when legend = payment details', () => {
		renderFormSection(createMockStore(), 'payment details', eMoneyInputs, radioInputs);

		const nameInput = screen.queryByLabelText(/name/i);
		const emailInput = screen.queryByLabelText('Email Address');
		const telInput = screen.queryByLabelText(/phone number/i);
		const addressInput = screen.queryByLabelText('Address');
		const zipInput = screen.queryByLabelText(/zip code/i);
		const cityInput = screen.queryByLabelText(/city/i);
		const countryInput = screen.queryByLabelText(/country/i);

		expect(nameInput).not.toBeInTheDocument();
		expect(emailInput).not.toBeInTheDocument();
		expect(telInput).not.toBeInTheDocument();
		expect(addressInput).not.toBeInTheDocument();
		expect(zipInput).not.toBeInTheDocument();
		expect(cityInput).not.toBeInTheDocument();
		expect(countryInput).not.toBeInTheDocument();
	});

	it('should have the selected class when a payment method is selected', async () => {
		const user = userEvent.setup();

		renderFormSection(createStore(), 'payment details', eMoneyInputs, radioInputs);

		const [eMoneyRadioContainer, cashRadioContainer] = screen.getAllByTestId('radioContainer');

		expect(eMoneyRadioContainer).toHaveClass('selected');
		expect(cashRadioContainer).not.toHaveClass('selected');

		await user.click(cashRadioContainer);

		expect(eMoneyRadioContainer).not.toHaveClass('selected');
		expect(cashRadioContainer).toHaveClass('selected');

		await user.click(eMoneyRadioContainer);

		expect(eMoneyRadioContainer).toHaveClass('selected');
		expect(cashRadioContainer).not.toHaveClass('selected');
	});

	it('should dispatch setPaymentMethod with the correct payload when a radio is clicked', async () => {
		const user = userEvent.setup();

		const { store} = renderFormSection(createMockStore(), 'payment details', eMoneyInputs, radioInputs);

		const [eMoneyRadioContainer, cashRadioContainer] = screen.getAllByTestId('radioContainer');

		await user.click(cashRadioContainer);

		expect(store.dispatch).toHaveBeenCalledWith({type: 'checkout/setPaymentMethod', payload: 'cash'});

		await user.click(eMoneyRadioContainer);

		expect(store.dispatch).toHaveBeenCalledWith({type: 'checkout/setPaymentMethod', payload: 'e-money'});
	});
});