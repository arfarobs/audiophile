import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import { removeAll } from '../../../store/cartSlice';
import { toggleCartIsOpen } from '../../../store/uiSlice';

const mockStore = configureStore();

const renderCart = (cartItems = []) => {
  const store = mockStore({
    cart: {
      cart: cartItems,
    },
    ui: {},
		product: {
			productQuantity: 1
		}
  });

  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Cart />
      </Provider>, {wrapper: MemoryRouter}
    ),
    store,
  };
};

describe('cart component', () => {
	it('renders the component', () => {
		renderCart();

		const cart = screen.getByTestId('cart');

		expect(cart).toBeInTheDocument();
	});

	it('renders Remove all and checkout btns when there is something in the cart', () => {
		renderCart([{productName: "test"}]);

		const removeAllBtn = screen.getByText(/Remove all/i);
		const checkoutBtn = screen.getByText(/checkout/i);

		expect(removeAllBtn).toBeInTheDocument();
		expect(checkoutBtn).toBeInTheDocument();
	});

	it('does not render the Remove all and checkout btns when the cart is empty', () => {
		renderCart();

		const removeAllBtn = screen.queryByText(/Remove all/i);
		const checkoutBtn = screen.queryByText(/checkout/i);

		expect(removeAllBtn).not.toBeInTheDocument();
		expect(checkoutBtn).not.toBeInTheDocument();
	});

	it('dispatches the removeAll action when the button is clicked', async () => {
		const user = userEvent.setup();
		const { store } = renderCart([{productName: "product 1"}, {productName: "product 2"}]);
		const removeAllBtn = screen.getByText(/Remove all/i);
		
		await user.click(removeAllBtn);

		expect(store.dispatch).toHaveBeenCalledWith(removeAll());
	});

	it('dispatches the toggleCartIsOpen action when the checkout btn is clicked', async () => {
		const user = userEvent.setup();
		const { store } = renderCart([{productName: "product 1"}, {productName: "product 2"}]);
		const checkoutBtn = screen.getByText(/checkout/i);

		await user.click(checkoutBtn);

		expect(store.dispatch).toHaveBeenCalledWith(toggleCartIsOpen());
	});

	it('calculates the cost and displays it properly', () => {
		const cartItems = [
			{
				productName: "item 1",
				price: 10,
				quantity: 2
			},
			{
				productName: "item 2",
				price: 80,
				quantity: 5
			}
		];

		renderCart(cartItems);

		const expectedTotal = 10 * 2 + 80 * 5;
		const total = screen.getByText(/Total/i);
		const price = screen.getByText(`$ ${expectedTotal}`);

		expect(total).toBeInTheDocument();
		expect(price).toBeInTheDocument();
	});

	it('displays the total cost as 0 when the cart is empty', () => {
		renderCart();

		const total = screen.getByText(/Total/i);
		const price = screen.getByText('$ 0');

		expect(total).toBeInTheDocument();
		expect(price).toBeInTheDocument();
	});
});