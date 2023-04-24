import {render, screen} from '@testing-library/react';
import ProductGallery from './ProductGallery';

const mockProps = {
	gallery: [
		{
			mobile: 'mobile-1.jpg',
			tablet: 'tablet-1.jpg',
			desktop: 'desktop-1.jpg'
		},
		{
			mobile: 'mobile-2.jpg',
			tablet: 'tablet-2.jpg',
			desktop: 'desktop-2.jpg'
		},
		{
			mobile: 'mobile-3.jpg',
			tablet: 'tablet-3.jpg',
			desktop: 'desktop-3.jpg'
		}
	],
	name: 'test name'
};

const renderProductGallery = (props = mockProps) => {
	return render(<ProductGallery {...props} />);
};

describe('rendering', () => {
	it('renders without crashing', () => {
		renderProductGallery();
	});

	it('renders correctly', () => {
		renderProductGallery();

		const productGallerySection = screen.getByTestId('productGallerySection');
		const productGalleryList = screen.getByRole('list');
		const productGalleryListItems = screen.getAllByRole('listitem');
		const productGalleryImages = screen.getAllByRole('img');

		expect(productGallerySection).toBeInTheDocument();
		expect(productGalleryList).toBeInTheDocument();
		expect(productGalleryListItems).toHaveLength(3);
		expect(productGalleryImages).toHaveLength(3);

		productGalleryImages.forEach((image, index) => {
			expect(image).toHaveAttribute('src', mockProps.gallery[index].mobile);
			expect(image).toHaveAttribute('alt', mockProps.name);
		});
	});
});