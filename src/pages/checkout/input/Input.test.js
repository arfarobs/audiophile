import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Input, { validate } from './Input';

import { 
	updateName, 
	updateAddress, 
	updateCity, 
	updateCountry, 
	updateENumber, 
	updateEmail, 
	updatePin, 
	updateTel, 
	updateZip 
} from '../../../../store/actions';

const mockStore = configureMockStore();

const createMockStore = () => {
	const state = {
		checkout: {
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
		},
	};

	const store = mockStore(state);

	store.dispatch = jest.fn();

	return store;
};

const mockProps = {
	name: 'name',
	label: 'label',
	type: 'text',
	placeholder: 'Enter your name'
};

const renderInput = (store, props) => {
	return {
		...render(
			<Provider store={store}>
				<Input {...props} />
			</Provider>
		),
		store
	};
};

describe('Input rendering tests', () => {
	it('renders input without crashing', () => {
		renderInput(createMockStore(), mockProps);
	});

	it('renders the correct input when type = text', () => {
		renderInput(createMockStore(), mockProps);

		const textBox = screen.getByRole('textbox');
		const label = screen.getByText('label');

		expect(textBox).toBeInTheDocument();
		expect(textBox).toHaveClass('input');
		expect(textBox).toHaveAttribute('type', 'text');
		expect(textBox).toHaveAttribute('id', 'name');
		expect(textBox).toHaveAttribute('name', 'name');
		expect(textBox).toHaveAttribute('placeholder', 'Enter your name');
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute('for', 'name');
	});

	it('renders the correct input when type = radio', () => {
		const props = {
			type: 'radio',
			name: 'e-money',
			label: 'label',
		};

		renderInput(createMockStore(), props);

		const radio = screen.getByRole('radio');
		const label = screen.getByText('label');

		expect(radio).toBeInTheDocument();
		expect(radio).toHaveClass('radio');
		expect(radio).toHaveAttribute('type', 'radio');
		expect(radio).toHaveAttribute('id', 'e-money');
		expect(radio).toHaveAttribute('name', 'e-money');
		expect(radio).toHaveAttribute('value', 'e-money');
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute('for', 'e-money');
	});

	it('gives the label the invalidLabel class when inputsState.error = true', () => {
		const store = createMockStore();

		store.getState().checkout.name.error = true;

		renderInput(store, mockProps);

		const label = screen.getByText('label');

		expect(label).toHaveClass('invalidLabel');
	});

	it('gives the label the address class when name = address', () => {
		const props = {
			name: 'address',
			label: 'Address',
			type: 'text',
			placeholder: 'Enter your address'
		};

		renderInput(createMockStore(), props);

		const label = screen.getByText(/address/i);

		expect(label).toHaveClass('address');
	});

	it('gives the label the eNumber class when name = eNumber', () => {
		const props = {
			name: 'eNumber',
			label: 'E-Money Number',
			type: 'text',
			placeholder: 'Enter your E-Money number'
		};

		renderInput(createMockStore(), props);

		const label = screen.getByText(/e-money number/i);

		expect(label).toHaveClass('eNumber');
	});

	it('renders an error message when inputsState.error = true', () => {
		const store = createMockStore();

		store.getState().checkout.name.error = true;
		store.getState().checkout.name.message = 'error message';

		renderInput(store, mockProps);

		const error = screen.getByText('error message');

		expect(error).toBeInTheDocument();
	});

	it('gives the textbox the correct class when inputsState.error = true', () => {
		const store = createMockStore();

		store.getState().checkout.name.error = true;

		renderInput(store, mockProps);

		const textBox = screen.getByRole('textbox');

		expect(textBox).toHaveClass('input invalidInput');
	});

	it('gives the input the correct value based on inputsState.value', () => {
		const store = createMockStore();

		store.getState().checkout.name.value = 'monkey';

		renderInput(store, mockProps);

		const textBox = screen.getByRole('textbox');

		expect(textBox).toHaveValue('monkey');
	});

	it('ensures that the e-money radio is checked when paymentMethod = e-money', () => {
		const store = createMockStore();

		store.getState().checkout.paymentMethod = 'e-money';

		const props = {
			type: 'radio',
			name: 'e-money',
			label: 'label',
		};

		renderInput(store, props);

		const radio = screen.getByRole('radio');

		expect(radio).toBeChecked();
	});

	it('ensures that the cash radio is checked when paymentMethod = cash', () => {
		const store = createMockStore();

		store.getState().checkout.paymentMethod = 'cash';

		const props = {
			type: 'radio',
			name: 'cash',
			label: 'label',
		};

		renderInput(store, props);

		const radio = screen.getByRole('radio');

		expect(radio).toBeChecked();
	});
});

describe('Redux', () => {
	it('dispatches the correct action when input changes', async () => {
		const user = userEvent.setup();

		const { store } = renderInput(createMockStore(), mockProps);

		const textBox = screen.getByRole('textbox');

		await user.type(textBox, 'm');

		expect(store.dispatch).toHaveBeenCalledWith(updateName('m', 'change'));
		
		await user.click(document.body);

		expect(store.dispatch).toHaveBeenCalledWith(updateName('m', 'blur'));
	});
});

describe('validate function', () => {
	it('dispatches the correct action when input changes', async () => {
		const dispatch = jest.fn();

		validate('name', 'monkey', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateName('monkey', 'change'));

		validate('name', 'monkey', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateName('monkey', 'blur'));

		validate('email', 'monkey@jungle.com', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateEmail('monkey@jungle.com', 'change'));

		validate('email', 'monkey@jungle.com', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateEmail('monkey@jungle.com', 'blur'));

		validate('tel', '1234567890', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateTel('1234567890', 'change'));

		validate('tel', '1234567890', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateTel('1234567890', 'blur'));

		validate('address', '123 Monkey Street', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateAddress('123 Monkey Street', 'change'));

		validate('address', '123 Monkey Street', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateAddress('123 Monkey Street', 'blur'));

		validate('zip', '12345', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateZip('12345', 'change'));

		validate('zip', '12345', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateZip('12345', 'blur'));

		validate('city', 'Monkey City', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateCity('Monkey City', 'change'));

		validate('city', 'Monkey City', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateCity('Monkey City', 'blur'));

		validate('country', 'Monkey Country', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateCountry('Monkey Country', 'change'));

		validate('country', 'Monkey Country', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateCountry('Monkey Country', 'blur'));

		validate('eNumber', '1234567890', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateENumber('1234567890', 'change'));

		validate('eNumber', '1234567890', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updateENumber('1234567890', 'blur'));

		validate('pin', '1234', 'change', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updatePin('1234', 'change'));

		validate('pin', '1234', 'blur', dispatch);

		expect(dispatch).toHaveBeenCalledWith(updatePin('1234', 'blur'));
	});

	it('does not dispatch an action when no name is passed', () => {
		const dispatch = jest.fn();

		validate('', 'monkey', 'change', dispatch);

		expect(dispatch).not.toHaveBeenCalled();
	});
});