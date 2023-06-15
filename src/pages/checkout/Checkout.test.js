import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Checkout from './Checkout';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../../store/uiSlice';
import cartReducer from '../../store/cartSlice';
import checkoutReducer from '../../store/checkoutSlice';
import userReducer from '../../store/userSlice';

const mockStore = configureMockStore();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate
}));

const mockCart = [
	{
		productName: 'Test Product',
		price: 100,
		quantity: 1,
		image: 'test-product.jpg',
		slug: 'test-product',
	}
];

const invalidCheckout = {
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

const validCheckout = {
	paymentMethod: 'e-money',
	name: {value: 'Test Name', error: false, message: '', valid: true},
	email: {value: 'test@email.com', error: false, message: '', valid: true},
	tel: {value: '123456789', error: false, message: '', valid: true},
	address: {value: 'Test Address', error: false, message: '', valid: true},
	zip: {value: '12345', error: false, message: '', valid: true},
	city: {value: 'Test City', error: false, message: '', valid: true},
	country: {value: 'Test Country', error: false, message: '', valid: true},
	eNumber: {value: '123456789', error: false, message: '', valid: true},
	pin: {value: '1234', error: false, message: '', valid: true},
	formIsValid: true,
	formIsSubmitting: false,
	order: {
		cart: [],
		form: {},
		cost: {},
		date: ''
	}
};

const renderCheckout = (cart, checkout, isSignedIn = true, showSignIn = false) => {
	const store = mockStore({
		cart: {
			cart: cart || [],
		},
		checkout: checkout || invalidCheckout,
		ui: {
			showConfirmation: false,
			showInvalidMessage: false,
			isLoading: false,
			showSubmissionError: false,
			showSignIn
		},
		user: {
			isSignedIn
		}
	});
	

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<Checkout />
			</Provider>, { wrapper: MemoryRouter }
		),
		store
	};
};

describe('Checkout rendering', () => {
	it('renders without crashing', () => {
		renderCheckout(mockCart);
	});

	it('dispatches setIsLoading with the correct value when the component mounts', () => {
		const { store } = renderCheckout(mockCart);

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/setIsLoading', payload: false });
	});
});

describe('Checkout form submission', () => {
	it('calls handleSubmit when the form is submitted', async () => {
		const user = userEvent.setup();

		const { store } = renderCheckout(mockCart);

		const button = screen.getByRole('button', { name: /continue & pay/i });
		await user.click(button);

		expect(store.dispatch).toHaveBeenCalled();
	});

	it('dispatches setIsLoading with the correct value when the form is submitted', async () => {
		const user = userEvent.setup();

		const { store } = renderCheckout(mockCart);

		const button = screen.getByRole('button', { name: /continue & pay/i });
		await user.click(button);

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/setIsLoading', payload: true });
	});

	it('submits the addOrder, validateOnSubmit, and toggleFormIsSubmitting actions when the form is submitted', async () => {
		const addOrderPayload = {
			cart: [
				{
					image: 'test-product.jpg',
					price: 100,
					productName: 'Test Product',
					quantity: 1,
					slug: 'test-product',
				},
			],
			checkoutData: {
				address: 'Test Address',
				city: 'Test City',
				country: 'Test Country',
				'e-money': 'e-money',
				eNumber: '123456789',
				email: 'test@email.com',
				name: 'Test Name',
				pin: '1234',
				tel: '123456789',
				zip: '12345',
			},
			cost: {
				grandTotal: '$ 170',
				shipping: '$ 50',
				total: '$ 100',
				vat: '$ 20',
			},
		};

		const user = userEvent.setup();

		const { store } = renderCheckout(mockCart, validCheckout);


		const button = screen.getByRole('button', { name: /continue & pay/i });
		await user.click(button);

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'checkout/addOrder', payload: addOrderPayload });
		expect(store.dispatch).toHaveBeenCalledWith({ type: 'checkout/validateOnSubmit' });
		expect(store.dispatch).toHaveBeenCalledWith({ type: 'checkout/toggleFormIsSubmitting'});
	});
});

describe('submitOrder function', () => {
	let fetchMock;

	beforeEach(() => {
		fetchMock = jest.spyOn(global, 'fetch');
	});

	afterEach(() => {
		fetchMock.mockRestore();
	});

	const submitValidForm = async () => {
		const user = userEvent.setup();

		const initialCartState = {
			cart: [
				{
					productName: 'Test Product',
					price: 100,
					quantity: 1,
					image: 'test-product.jpg',
					slug: 'test-product',
				}
			]
		};
		
		const store = configureStore({
			reducer: {
				cart: cartReducer,
				checkout: checkoutReducer,
				ui: uiReducer,
				user: userReducer
			},
			preloadedState: {
				cart: initialCartState
			}
		});
		


		render(
			<Provider store={store}>
				<Checkout />
			</Provider>, { wrapper: MemoryRouter } 
		);

		const inputs = screen.getAllByRole('textbox');
		const radios = screen.getAllByRole('radio');

		await user.type(inputs[0], 'Test Name');
		await user.type(inputs[1], 'test@email.com');
		await user.type(inputs[2], '123456789');
		await user.type(inputs[3], 'Test Address');
		await user.type(inputs[4], '12345');
		await user.type(inputs[5], 'Test City');
		await user.type(inputs[6], 'Test Country');
		await user.type(inputs[7], '12345678');
		await user.type(inputs[8], '1234');
		await user.click(radios[0]);

		const button = screen.getByRole('button', { name: /continue & pay/i });
		await user.click(button);
	};

	it('is called with the correct parameters when the form is valid and submitting', async () => {
		fetchMock.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({ message: 'Order submitted successfully', cart: [] }),
			})
		);

		await submitValidForm();

		await waitFor(() => expect(fetchMock).toHaveBeenCalled());

		const actualDate = JSON.parse(fetchMock.mock.calls[0][1].body).date;

		const expectedOrder = {
			cart: [
				{
					productName: 'Test Product',
					price: 100,
					quantity: 1,
					image: 'test-product.jpg',
					slug: 'test-product'
				}
			],
			form: {
				name: 'Test Name',
				email: 'test@email.com',
				tel: '123456789',
				address: 'Test Address',
				zip: '12345',
				city: 'Test City',
				country: 'Test Country',
				'e-money': 'e-money',
				eNumber: '12345678',
				pin: '1234',
				paymentMethod: 'e-money'
			},
			cost: {
				total: '$ 100',
				vat: '$ 20',
				shipping: '$ 50',
				grandTotal: '$ 170'
			},
			date: actualDate
		};

		const expectedFetchParams = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(expectedOrder),
		};

		expect(fetchMock).toHaveBeenCalledWith(
			'https://europe-west3-audiophile-faa70.cloudfunctions.net/submitOrder',
			expectedFetchParams
		);
	});

	it('displays confirmation on successful API response', async () => {
		fetchMock.mockImplementation(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({ message: 'Order submitted successfully', cart: [] }),
			})
		);

		await submitValidForm();

		await waitFor(() => expect(fetchMock).toHaveBeenCalled());

		const confirmationHeding = await screen.findByRole('heading', { name: /thank you for your order/i });

		expect(confirmationHeding).toBeInTheDocument();
	});

	it('displays invalid form message when API responds with a 422 status', async () => {
		fetchMock.mockImplementation(() =>
			Promise.resolve({
				ok: false,
				status: 422,
				json: () => Promise.resolve({ message: 'Invalid data' }),
			})
		);

		await submitValidForm();

		await waitFor(() => expect(fetchMock).toHaveBeenCalled());

		const errorHeading = await screen.findByRole('heading', { name: /uh oh!/i });
		const errorMessage = await screen.findByText(/There seem to be some problems with your form./i);

		expect(errorHeading).toBeInTheDocument();
		expect(errorMessage).toBeInTheDocument();
	});

	it('displays a message stating that there was an issue with submission when API responds with a 500 status', async () => {
		fetchMock.mockImplementation(() =>
			Promise.resolve({
				ok: false,
				status: 500,
				json: () => Promise.resolve({ message: 'Server error' }),
			})
		);

		await submitValidForm();

		await waitFor(() => expect(fetchMock).toHaveBeenCalled());

		const errorHeading = await screen.findByRole('heading', { name: /uh oh/i });
		const errorMessage = await screen.findByText(/We're sorry, but we were unable to process your order at this time./i);

		expect(errorHeading).toBeInTheDocument();
		expect(errorMessage).toBeInTheDocument();
	});
});

describe('Go back button', () => {
	it('calls navigate with correct parameter when "Go Back" button is clicked', async () => {
		const user = userEvent.setup();
	
		renderCheckout(mockCart);
		
		const goBackButton = screen.getByRole('button', { name: /Go Back/i });
		await user.click(goBackButton);
	
		expect(mockNavigate).toHaveBeenCalledWith(-1);
	});
});

describe('store dispatches', () => {
	it('dispatches toggleShowMessage with the correct argument if cart is empty', async () => {
		const { store } = renderCheckout();
	
		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleShowMessage', payload: 'emptyCartCheckout' });
	});

	it('does not dispatch toggleShowMessage with the correct argument if cart is empty', () => {
		const { store } = renderCheckout(mockCart);
	
		expect(store.dispatch).not.toHaveBeenCalledWith({ type: 'ui/toggleShowMessage', payload: 'emptyCartCheckout' });
	});

	it('dispatches toggleShowMessage with the correct argument if !isSignedIn, !showSignIn, and cart is not empty', () => {
		const { store } = renderCheckout(mockCart, invalidCheckout, false);
	
		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleShowMessage', payload: 'checkoutSignIn' });
	});

	it('does not dispatch toggleShowMessage with the correct argument if isSignedIn, !showSignIn, and cart is not empty', () => {
		const { store } = renderCheckout(mockCart, invalidCheckout, true);
	
		expect(store.dispatch).not.toHaveBeenCalledWith({ type: 'ui/toggleShowMessage', payload: 'checkoutSignIn' });
	});

	it('does not dispatch toggleShowMessage with the correct argument if !isSignedIn, showSignIn, and cart is not empty', () => {
		const { store } = renderCheckout(mockCart, invalidCheckout, false, true);

		expect(store.dispatch).not.toHaveBeenCalledWith({ type: 'ui/toggleShowMessage', payload: 'checkoutSignIn' });
	});

	it('does not dispatch toggleShowMessage with the correct argument if !isSignedIn, !showSignIn, and cart is empty', () => {
		const { store } = renderCheckout([], invalidCheckout, false);

		expect(store.dispatch).not.toHaveBeenCalledWith({ type: 'ui/toggleShowMessage', payload: 'checkoutSignIn' });
	});
});