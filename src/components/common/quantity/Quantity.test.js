import { render, screen } from '@testing-library/react';
import Quantity from './Quantity';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore();

const productProps = {
	where: 'product'
};

const cartProps = {
	where: 'cart',
	productName: 'product name',
	cartQuantity: 5
}

const renderQuantity = (props, productQuantity) => {
	const store = mockStore({
		product: {
			productQuantity: productQuantity
		}
	});

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<Quantity {...props} />
			</Provider>, {wrapper: MemoryRouter}
		),
		store
	};
};

describe('Quantity render tests', () => {
	it('renders without crashing', () => {
		renderQuantity(productProps, 1);
	});

	it('renders correctly when where = product', () => {
		renderQuantity(productProps, 1);

		const wrapper = screen.getByTestId('quantityWrapper');
		const [decrementBtn, incrementBtn] = screen.getAllByRole('button');
		const quantity = screen.getByText(/1/i);

		expect(wrapper).toBeInTheDocument();
		expect(decrementBtn).toBeInTheDocument();
		expect(incrementBtn).toBeInTheDocument();
		expect(quantity).toBeInTheDocument();
	});

	it('renders correctly when where = cart', () => {
		renderQuantity(cartProps, 1);

		const wrapper = screen.getByTestId('quantityWrapper');
		const [decrementBtn, incrementBtn] = screen.getAllByRole('button');
		const quantity = screen.getByText(/5/i);

		expect(wrapper).toBeInTheDocument();
		expect(decrementBtn).toBeInTheDocument();
		expect(incrementBtn).toBeInTheDocument();
		expect(quantity).toBeInTheDocument();
	});
});

describe('useEffect tests', () => {
	it('dispatches resetQuantity when where = product', () => {
		const { store } = renderQuantity(productProps, 5);

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith({type: 'product/resetQuantity'});
	});

	it('does not dispatch resetQuantity when where = cart', () => {
		const { store } = renderQuantity(cartProps, 5);

		expect(store.dispatch).not.toHaveBeenCalled();
	});
});

describe('Quantity button tests', () => {
	it('decrement button dispatches handleProductQuantity when where = product', async () => {
		const user = userEvent.setup();
		const { store } = renderQuantity(productProps, 5);

		const decrementBtn = screen.getByText(/-/i);

		await user.click(decrementBtn);

		expect(store.dispatch).toHaveBeenCalledTimes(2); // Once for the resetQuantity action, once for the handleProductQuantity action
		expect(store.dispatch).toHaveBeenCalledWith({type: 'product/handleProductQuantity', payload: 'down'});
	});

	it('decrement button dispatches handleCartQuantity when where = cart', async () => {
		const user = userEvent.setup();
		const { store } = renderQuantity(cartProps, 5);

		const decrementBtn = screen.getByText(/-/i);

		await user.click(decrementBtn);

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith({type: 'cart/handleCartQuantity', payload: {direction: 'down', productName: 'product name'}});
	});

	it('increment button dispatches handleProductQuantity when where = product', async () => {
		const user = userEvent.setup();
		const { store } = renderQuantity(productProps, 5);

		const incrementBtn = screen.getByText(/\+/i);

		await user.click(incrementBtn);

		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith({type: 'product/handleProductQuantity', payload: 'up'});
	});

	it('increment button dispatches handleCartQuantity when where = cart', async () => {
		const user = userEvent.setup();
		const { store } = renderQuantity(cartProps, 5);

		const incrementBtn = screen.getByText(/\+/i);

		await user.click(incrementBtn);

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith({type: 'cart/handleCartQuantity', payload: {direction: 'up', productName: 'product name'}});
	});
});

describe('Quantity text tests', () => {
	it('renders correct quantity when where = product', () => {
		renderQuantity(productProps, 1);

		const quantity = screen.getByText(/1/i);

		expect(quantity).toBeInTheDocument();
	});

	it('renders correct quantity when where = cart', () => {
		renderQuantity(cartProps, 1);

		const quantity = screen.getByText(/5/i);

		expect(quantity).toBeInTheDocument();
	});
});