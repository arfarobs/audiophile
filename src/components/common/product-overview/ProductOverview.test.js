import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductOverview from './ProductOverview';

const renderProductOverview = (newProduct = true, index = 0) => {
	const mockProps = {
		src: {
			mobile: 'mobile-img.jpg',
			tablet: 'tablet-img.jpg',
			desktop: 'desktop-img.jpg'
		},
		alt: 'Im a Product',
		newProduct,
		productName: 'Im a Name',
		productDescription: 'Im a description',
		slug: 'im-a-little-slug',
		index
	};
	return render(<ProductOverview {...mockProps} {...mockProps} />, {wrapper: MemoryRouter});
};

describe('ProductOverview render tests', () => {
	test('renders without crashing', () => {
		renderProductOverview();
	});

	test('renders correctly with the given props', () => {
		renderProductOverview();

		const link = screen.getByRole('link', {name: /See Product/i});
		const h2 = screen.getByRole('heading', {name: /Im a Name/i});
		const newProduct = screen.getByText(/new product/i);
		const image = screen.getByAltText(/Im a Product/i);
		const description = screen.getByText(/Im a description/i);

		expect(newProduct).toBeInTheDocument();
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'mobile-img.jpg');
		expect(h2).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/product-details/im-a-little-slug');
	});

	test('does not render new product badge when newProduct = false', () => {
		renderProductOverview(false);

		const newProduct = screen.queryByText(/new product/i);

		expect(newProduct).not.toBeInTheDocument();
	});
});

describe('product name', () => {
	test('renders the product name correctly', () => {
		renderProductOverview();

		const h2 = screen.getByRole('heading', {name: /Im a Name/i});
		const span = screen.getByText(/Name/i);

		expect(h2).toBeInTheDocument();
		expect(h2).toContainElement(span);
		expect(span).toBeInTheDocument();
		expect(span).not.toHaveTextContent(/Im a/i);
	});
});

describe('ProductOverview about div', () => {
	test('renders the about div with the correct class when index is even', () => {
		renderProductOverview();

		const aboutDiv = screen.getByTestId('productOverviewAboutDiv');

		expect(aboutDiv).toHaveClass('about');
		expect(aboutDiv).not.toHaveClass('odd');
	});

	test('renders the about div with the correct class when index is odd', () => {
		renderProductOverview(true, 1);

		const aboutDiv = screen.getByTestId('productOverviewAboutDiv');

		expect(aboutDiv).toHaveClass('about odd');
	});
});