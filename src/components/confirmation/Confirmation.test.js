import {render, screen} from '@testing-library/react';
import Confirmation from './Confirmation';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();

const mockProps = {
	cost: {
		subtotal: 0,
		shipping: 0,
		tax: 0,
		grandTotal: 50
	},
	message: 'Your order has been received',
	cart: []
};

const renderConfirmation = (props) => {
	const store = mockStore({});

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<Confirmation {...props} />);
			</Provider>, {wrapper: MemoryRouter}
		),
		store
	};
};

describe('Confirmation render tests', () => {
	it('renders without crashing', () => {
		renderConfirmation(mockProps);
	});

	it('renders correctly', () => {
		renderConfirmation(mockProps);

		const icon = screen.getByAltText(/order confirmation icon/i);
		const h2 = screen.getByText(/thank you/i);
		const p = screen.getByText(/your order has been received/i);
		const cart = screen.getByTestId(/cartItemsDiv/i);
		const totalContainer = screen.getByTestId(/totalContainerDiv/i);
		const total = screen.getByText(/grand total/i);
		const totalPrice = screen.getByText(/50/i);
		const link = screen.getByRole('link');

		expect(icon).toBeInTheDocument();
		expect(h2).toBeInTheDocument();
		expect(p).toBeInTheDocument();
		expect(cart).toBeInTheDocument();
		expect(totalContainer).toBeInTheDocument();
		expect(total).toBeInTheDocument();
		expect(totalPrice).toBeInTheDocument();
		expect(link).toBeInTheDocument();
	});
});

describe('useEffect tests', () => {
	it('dispatches toggleConfirmation, removeAll, and resetForm', () => {
		const {store, unmount} = renderConfirmation(mockProps);

		unmount();

		expect(store.dispatch).toHaveBeenCalledTimes(3);
		expect(store.dispatch).toHaveBeenCalledWith({type: 'ui/toggleConfirmation'});
		expect(store.dispatch).toHaveBeenCalledWith({type: 'cart/removeAll'});
		expect(store.dispatch).toHaveBeenCalledWith({type: 'checkout/resetForm'});
	});
});

describe('totalContainer tests', () => {
	it('renders totalContainer with end class if cart.length > 1', () => {
		renderConfirmation({...mockProps, cart: [{}, {}]});

		const totalContainer = screen.getByTestId(/totalContainerDiv/i);

		expect(totalContainer).toHaveClass('end');
	});

	it('renders totalContainer with center class if cart.length <= 1', () => {
		renderConfirmation(mockProps);

		const totalContainer = screen.getByTestId(/totalContainerDiv/i);

		expect(totalContainer).toHaveClass('center');
	});
});