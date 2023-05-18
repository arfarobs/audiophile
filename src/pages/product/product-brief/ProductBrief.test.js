import {screen, render} from '@testing-library/react';
import ProductBrief from './ProductBrief';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

const mockStore = createMockStore();

const mockProps = {
	image: {
		mobile: 'image-product-1-thumbnail.jpg',
		tablet: 'image-product-1-thumbnail.jpg',
		desktop: 'image-product-1-thumbnail.jpg'
	},
	newProduct: true,
	name: 'test name',
	description: 'test description',
	price: 299,
	onClick: () => {}
};

const renderProductBrief = (props = mockProps) => {
	const store = mockStore({
		product: {
			productQuantity: 1
		}
	});

	return render(
		<Provider store={store}>
			<ProductBrief {...props} />
		</Provider>, {wrapper: MemoryRouter}
	);
};

describe('rendering', () => {
	it('renders without crashing', () => {
		renderProductBrief();
	});

	it('renders the correct image', () => {
		renderProductBrief();

		const image = screen.getByAltText('test name');

		expect(image).toBeInTheDocument();
	});

	it('renders the correct name', () => {
		renderProductBrief();

		const name = screen.getByRole('heading', {name: /test name/i});

		expect(name).toBeInTheDocument();
	});

	it('renders the correct description', () => {
		renderProductBrief();

		const description = screen.getByText('test description');

		expect(description).toBeInTheDocument();
	});

	it('renders the correct price', () => {
		renderProductBrief();

		const price = screen.getByText('$ 299');

		expect(price).toBeInTheDocument();
	});

	it('renders the Quantity component', () => {
		renderProductBrief();

		const quantityWrapper = screen.getByTestId('quantityWrapper');

		expect(quantityWrapper).toBeInTheDocument();
	});

	it('renders the Button component', () => {
		renderProductBrief();

		const button = screen.getByRole('button', {name: /add to cart/i});

		expect(button).toBeInTheDocument();
	});

	it('renders the "new product" heading when newProduct is true', () => {
		renderProductBrief();

		const newProduct = screen.getByText('new product');

		expect(newProduct).toBeInTheDocument();
	});

	it('does not render the "new product" heading when newProduct is false', () => {
		renderProductBrief({...mockProps, newProduct: false});

		const newProduct = screen.queryByText('new product');

		expect(newProduct).not.toBeInTheDocument();
	});

	it('gives the product heading the correct class when newProduct is true', () => {
		renderProductBrief();

		const name = screen.getByRole('heading', {name: /test name/i});

		expect(name).toHaveClass('newH1');
	});

	it('gives the product heading the correct class when newProduct is false', () => {
		renderProductBrief({...mockProps, newProduct: false});

		const name = screen.getByRole('heading', {name: /test name/i});

		expect(name).toHaveClass('h1');
		screen.debug();
	});
});

describe('interactivity', () => {
	it('calls the onClick function when the button is clicked', async () => {
		const user = userEvent.setup();

		const onClick = jest.fn();
		renderProductBrief({...mockProps, onClick});

		const button = screen.getByRole('button', {name: /add to cart/i});

		await user.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});