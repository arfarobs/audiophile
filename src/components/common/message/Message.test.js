import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

import Message from './Message';

const mockStore = configureStore();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

const renderMessage = (showMessage) => {
	const store = mockStore({
		ui: {
			showMessage,
			showConfirmation: false,
			showInvalidMessage: false
		}
	});

	store.dispatch = jest.fn();

	return (
		render(
			<Provider store={store}>
				<Message />
			</Provider>, {wrapper: MemoryRouter}
		), 
		store
	);
};

describe('rendering', () => {
	it('renders the component without crashing', () => {
		renderMessage(true);

		const message = screen.getByTestId('messageContainer');

		expect(message).toBeInTheDocument();
	});
});

describe('signOutSuccess', () => {
	it('renders the correct message', () => {
		renderMessage('signOutSuccess');

		const message = screen.getByText('You have been signed out.');

		expect(message).toBeInTheDocument();
	});

	it('renders the correct button title', () => {
		renderMessage('signOutSuccess');

		const button = screen.getByRole('button');

		expect(button).toHaveTextContent('Okay');
	});	
});

describe('signOutError', () => {
	it('renders the correct message', () => {
		renderMessage('signOutError');

		const message = screen.getByText('There was an error signing you out. Please try again.');

		expect(message).toBeInTheDocument();
	});

	it('renders the correct button title', () => {
		renderMessage('signOutError');

		const button = screen.getByRole('button');

		expect(button).toHaveTextContent('Okay');
	});	
});

describe('addToCartSignIn', () => {
	it('renders the correct message', () => {
		renderMessage('addToCartSignIn');

		const message = screen.getByText('You must be signed in to add items to your cart.');

		expect(message).toBeInTheDocument();
	});

	it('renders the correct button title', () => {
		renderMessage('addToCartSignIn');

		const button = screen.getByRole('button');

		expect(button).toHaveTextContent('Sign In');
	});	

	it('dispatches toggleShowSignIn and toggleShowMessage when the button is clicked', async () => {
		const user = userEvent.setup();

		const store = renderMessage('addToCartSignIn');

		const button = screen.getByRole('button');

		await user.click(button);

		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith({type: 'ui/toggleShowSignIn'});
		expect(store.dispatch).toHaveBeenCalledWith({type: 'ui/toggleShowMessage', payload: false});
	});
});

describe('checkoutSignIn', () => {
	it('renders the correct message', () => {
		renderMessage('checkoutSignIn');

		const message = screen.getByText('You must be signed in to checkout.');

		expect(message).toBeInTheDocument();
	});

	it('renders the correct button title', () => {
		renderMessage('checkoutSignIn');

		const button = screen.getByRole('button');

		expect(button).toHaveTextContent('Sign In');
	});	

	it('dispatches toggleShowSignIn and toggleShowMessage when the button is clicked', async () => {
		const user = userEvent.setup();

		const store = renderMessage('checkoutSignIn');

		const button = screen.getByRole('button');

		await user.click(button);

		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith({type: 'ui/toggleShowSignIn'});
		expect(store.dispatch).toHaveBeenCalledWith({type: 'ui/toggleShowMessage', payload: false});
	});
});

describe('emptyCartCheckout', () => {
	let navigate;

	beforeEach(() => {
		navigate = jest.fn();
		useNavigate.mockReturnValue(navigate);
	});

	it('renders the correct message', () => {
		renderMessage('emptyCartCheckout');

		const message = screen.getByText('Your cart is empty. Please add items to your cart before checking out.');

		expect(message).toBeInTheDocument();
	});

	it('renders the correct button title', () => {
		renderMessage('emptyCartCheckout');

		const button = screen.getByRole('button');

		expect(button).toHaveTextContent('Okay');
	});	

	it('navigates to home when the button is clicked', async () => {
		const user = userEvent.setup();

		const store = renderMessage('emptyCartCheckout');

		const button = screen.getByRole('button');

		await user.click(button);

		expect(store.dispatch).toHaveBeenCalledWith({type: 'ui/toggleShowMessage', payload: false});
		expect(navigate).toHaveBeenCalledWith('/');
	});
});