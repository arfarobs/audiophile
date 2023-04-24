import { render, screen } from '@testing-library/react';
import Summary from './Summary';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const renderSummary = (paymentMethod) => {
	const store = mockStore({
		cart: {
			cart: [
				{
					productName: 'test product 1',
					price: 100,
					cartThumbnail: 'test-1-img.png',
					quantity: 1,
				},
				{
					productName: 'test product 2',
					price: 200,
					cartThumbnail: 'test-2-img.png',
					quantity: 2,
				}
			],
		},
		checkout: {
			paymentMethod: paymentMethod || 'e-money',
		},
	});

	render(
		<Provider store={store}>
			<Summary />
		</Provider>
	);
};

describe('Summary', () => {
	it('should render the Summary component without crashing', () => {
		renderSummary();

		const summary = screen.getByTestId('summarySection');
		const heading = screen.getByRole('heading', { name: 'Summary' });
		const cartItemsDiv = screen.getByTestId('cartItemsDiv');

		expect(summary).toBeInTheDocument();
		expect(heading).toBeInTheDocument();
		expect(cartItemsDiv).toBeInTheDocument();
	});

	it('should render the correct total, shipping, vat and grand total', () => {
		renderSummary();

		const total = screen.getByText('Total');
		const shipping = screen.getByText('Shipping');
		const vat = screen.getByText('VAT');
		const grandTotal = screen.getByText('Grand total');

		expect(total).toBeInTheDocument();
		expect(shipping).toBeInTheDocument();
		expect(vat).toBeInTheDocument();
		expect(grandTotal).toBeInTheDocument();

		expect(total.nextElementSibling).toHaveTextContent('$ 500');
		expect(shipping.nextElementSibling).toHaveTextContent('$ 50');
		expect(vat.nextElementSibling).toHaveTextContent('$ 100');
		expect(grandTotal.nextElementSibling).toHaveTextContent('$ 650');
	});

	it('should render the correct input when payment method is e-money', () => {
		renderSummary();

		const input = screen.getByRole('button', { name: 'Continue & pay' });

		expect(input).toBeInTheDocument();

		expect(input).toHaveAttribute('value', 'Continue & pay');
	});

	it('should render the correct input when payment method is not e-money', () => {
		renderSummary('cash');

		const input = screen.getByRole('button', { name: 'Continue' });

		expect(input).toBeInTheDocument();

		expect(input).toHaveAttribute('value', 'Continue');
	});
});