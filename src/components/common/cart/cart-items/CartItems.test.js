import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CartItems from './CartItems';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore();

const mockCartItems = [
	{
		productName: 'item 1',
		price: '50',
		quantity: 2,
		cartThumbnail: 'item1.jpg'
	},
	{
		productName: 'item 2',
		price: '100',
		quantity: 1,
		cartThumbnail: 'item2.jpg'
	},
	{
		productName: 'item 3',
		price: '90',
		quantity: 8,
		cartThumbnail: 'item3.jpg'
	}
];

const renderCartItems = (cartItems = [], props = {}) => {
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
        <CartItems where={props.where} confirmationCart={props.confirmationCart} />
      </Provider>, {wrapper: MemoryRouter}
    ),
    store,
  };
};

describe('CartItems component', () => {
	it('renders the component', () => {
		renderCartItems(mockCartItems);
		const cartItemsDiv = screen.getByTestId('cartItemsDiv');

		expect(cartItemsDiv).toBeInTheDocument();
	});

	it('renders the correct elements when where prop is "cart"', () => {
		renderCartItems(mockCartItems, {where: "cart"});

		const list = screen.getByRole('list');
		expect(list).toHaveClass('cart');

		const items = screen.getAllByTestId('outerListItemDiv');
		items.forEach(item => {
			expect(item).toHaveClass('item');
			expect(item).toHaveClass('notConfItem');
			expect(item).not.toHaveClass('hidden');
			expect(item).not.toHaveClass('confItem');
		});

		const images = screen.getAllByRole('img');
		images.forEach(image => {
			expect(image).toHaveClass('thumbnail');
			expect(image).not.toHaveClass('smallThumbnail');
		});

		const quantity = screen.getAllByTestId('quantityWrapper');
		quantity.forEach(quantity => {
			expect(quantity).toBeInTheDocument();
		});

		const quantityParagraphs = screen.queryAllByTestId('quantityParagraph');
		quantityParagraphs.forEach(quantityParagraph => {
			expect(quantityParagraph).not.toBeInTheDocument();
		});

		const lineDiv = screen.queryAllByTestId('lineDiv');
		lineDiv.forEach(lineDiv => {
			expect(lineDiv).not.toBeInTheDocument();
		});

		const otherItemsButton = screen.queryByTestId('otherItemsButton');
		expect(otherItemsButton).not.toBeInTheDocument();

		const cartItemsDiv = screen.getByTestId('cartItemsDiv');
		expect(cartItemsDiv).not.toHaveClass('confirmationFlex');

		const emptyCartMessage = screen.queryByText('Oh no! It looks like your cart is empty.');
		expect(emptyCartMessage).not.toBeInTheDocument();
	});

	it('renders the correct elements when where prop is "confirmation"', () => {
		renderCartItems(mockCartItems, {where: "confirmation"});

		const list = screen.getByRole('list');
		expect(list).toHaveClass('confirmation');

		const images = screen.getAllByRole('img');
		images.forEach(image => {
			expect(image).toHaveClass('smallThumbnail');
			expect(image).not.toHaveClass('thumbnail');
		});

		const quantity = screen.queryAllByTestId('quantityWrapper');
		quantity.forEach(quantity => {
			expect(quantity).not.toBeInTheDocument();
		});

		const quantityParagraphs = screen.getAllByTestId('quantityParagraph');
		quantityParagraphs.forEach(quantityParagraph => {
			expect(quantityParagraph).toBeInTheDocument();
			expect(quantityParagraph).not.toHaveClass('marginTop');
		});

		const lineDiv = screen.getAllByTestId('lineDiv');
		lineDiv.forEach((lineDiv, index) => {
			expect(lineDiv).toBeInTheDocument();
			if (index === 0) {
				expect(lineDiv).toHaveClass('line');
			} else {
				expect(lineDiv).toHaveClass('hidden')
			}
		});

		const otherItemsButton = screen.getByTestId('otherItemsButton');
		expect(otherItemsButton).toBeInTheDocument();

		const cartItemsDiv = screen.getByTestId('cartItemsDiv');
		expect(cartItemsDiv).toHaveClass('confirmationFlex');

		const emptyCartMessage = screen.queryByText('Oh no! It looks like your cart is empty.');
		expect(emptyCartMessage).not.toBeInTheDocument();
	});

	it('renders the correct elements when no "where" prop is passed', () => {
		renderCartItems(mockCartItems);

		const items = screen.getAllByTestId('outerListItemDiv');
		items.forEach(item => {
			expect(item).toHaveClass('item');
			expect(item).toHaveClass('notConfItem');
			expect(item).not.toHaveClass('hidden');
			expect(item).not.toHaveClass('confItem');
		});

		const images = screen.getAllByRole('img');
		images.forEach(image => {
			expect(image).toHaveClass('thumbnail');
			expect(image).not.toHaveClass('smallThumbnail');
		});

		const quantity = screen.queryAllByTestId('quantityWrapper');
		quantity.forEach(quantity => {
			expect(quantity).not.toBeInTheDocument();
		});

		const quantityParagraphs = screen.getAllByTestId('quantityParagraph');
		quantityParagraphs.forEach(quantityParagraph => {
			expect(quantityParagraph).toBeInTheDocument();
			expect(quantityParagraph).toHaveClass('marginTop');
		});

		const lineDiv = screen.queryAllByTestId('lineDiv');
		lineDiv.forEach(lineDiv => {
			expect(lineDiv).not.toBeInTheDocument();
		});

		const otherItemsButton = screen.queryByTestId('otherItemsButton');
		expect(otherItemsButton).not.toBeInTheDocument();

		const cartItemsDiv = screen.getByTestId('cartItemsDiv');
		expect(cartItemsDiv).not.toHaveClass('confirmationFlex');

		const emptyCartMessage = screen.queryByText('Oh no! It looks like your cart is empty.');
		expect(emptyCartMessage).not.toBeInTheDocument();
	});

	it('renders the correct cart items with their respective information', () => {
		renderCartItems(mockCartItems, {where: "cart"});
		
		const images = screen.getAllByRole('img');
		images.forEach((image, index) => {
			expect(image).toHaveAttribute('src', mockCartItems[index].cartThumbnail);
			expect(image).toHaveAttribute('alt', mockCartItems[index].productName);
		});

		mockCartItems.forEach(item => {
			const name = screen.getByText(item.productName);
			expect(name).toBeInTheDocument();

			const price = screen.getByText(`$ ${item.price}`);
			expect(price).toBeInTheDocument();

			const quantity = screen.getByText(item.quantity);
			expect(quantity).toBeInTheDocument();
		});
	});

	it('renders the empty cart message when where = "cart" and cart is empty', () => {
		renderCartItems([], {where: "cart"});

		const emptyCartMessage = screen.getByText('Oh no! It looks like your cart is empty.');
		expect(emptyCartMessage).toBeInTheDocument();
	});

	it('does not render the empty cart message when where = "confirmation" and cart is empty', () => {
		renderCartItems([], {where: "confirmation"});

		const emptyCartMessage = screen.queryByText('Oh no! It looks like your cart is empty.');
		expect(emptyCartMessage).not.toBeInTheDocument();
	});

	it('does not render the empty cart message when where prop is not provided and cart is empty', () => {
		renderCartItems([]);

		const emptyCartMessage = screen.queryByText('Oh no! It looks like your cart is empty.');
		expect(emptyCartMessage).not.toBeInTheDocument();
	});

	it('does not render the otherItemsBtn when cart only has one item', () => {
		renderCartItems([mockCartItems[0]], {where: "confirmation"});

		const otherItemsButton = screen.queryByTestId('otherItemsButton');
		expect(otherItemsButton).not.toBeInTheDocument();
	});

	it('displays hidden items when the otherItemsBtn is clicked and hides them when clicked again', async () => {
		const user = userEvent.setup();
		renderCartItems(mockCartItems, {where: "confirmation"});

		const otherItemsButton = screen.getByTestId('otherItemsButton');
		const items = screen.getAllByTestId('outerListItemDiv');

		expect(otherItemsButton).toBeInTheDocument();
		items.forEach((item, index) => {
			expect(item).toHaveClass('confItem');
			expect(item).not.toHaveClass('notConfItem');
			if (index === 0) {
				expect(item).toHaveClass('item');
				expect(item).not.toHaveClass('hidden');
			} else {
				expect(item).not.toHaveClass('item');
				expect(item).toHaveClass('hidden');
			}
		});

		await userEvent.click(otherItemsButton);

		items.forEach((item, index) => {
			expect(item).toHaveClass('confItem');
			expect(item).not.toHaveClass('notConfItem');
			expect(item).toHaveClass('item');
			expect(item).not.toHaveClass('hidden');
		});

		await userEvent.click(otherItemsButton);

		items.forEach((item, index) => {
			expect(item).toHaveClass('confItem');
			expect(item).not.toHaveClass('notConfItem');
			if (index === 0) {
				expect(item).toHaveClass('item');
				expect(item).not.toHaveClass('hidden');
			} else {
				expect(item).not.toHaveClass('item');
				expect(item).toHaveClass('hidden');
			}
		});
	});
})