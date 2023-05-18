import {render, screen} from '@testing-library/react';
import Recommendations from './Recommendations';
import {MemoryRouter} from 'react-router-dom';

const mockItems = [
	{
		image: {
			mobile: 'mobile-1.jpg',
			tablet: 'tablet-1.jpg',
			desktop: 'desktop-1.jpg'
		},
		name: 'test item 1',
		category: 'test-category-1',
		slug: 'test-slug-1'
	},
	{
		image: {
			mobile: 'mobile-2.jpg',
			tablet: 'tablet-2.jpg',
			desktop: 'desktop-2.jpg'
		},
		name: 'test item 2',
		category: 'test-category-2',
		slug: 'test-slug-2'
	},
	{
		image: {
			mobile: 'mobile-3.jpg',
			tablet: 'tablet-3.jpg',
			desktop: 'desktop-3.jpg'
		},
		name: 'test item 3',
		category: 'test-category-3',
		slug: 'test-slug-3'
	}
];

const renderRecommendations = (items = mockItems) => {
	return render(<Recommendations items={items} />, {wrapper: MemoryRouter});
};

describe('rendering', () => {
	it('renders without crashing', () => {
		renderRecommendations();
	});

	it('renders the component correctly', () => {
		renderRecommendations();

		const sectionHeading = screen.getByRole('heading', {name: /you may also like/i});
		const list = screen.getByRole('list');
		const listItems = screen.getAllByRole('listitem');
		const images = screen.getAllByRole('img');
		const productHeadings = screen.getAllByRole('heading', {name: /test item/i});
		const buttons = screen.getAllByRole('link', {name: /see product/i});

		expect(sectionHeading).toBeInTheDocument();
		expect(list).toBeInTheDocument();
		expect(listItems).toHaveLength(3);
		expect(images).toHaveLength(3);
		expect(productHeadings).toHaveLength(3);
		expect(buttons).toHaveLength(3);

		images.forEach((image, index) => {
			expect(image).toHaveAttribute('src', mockItems[index].image.mobile);
			expect(image).toHaveAttribute('alt', mockItems[index].name);
		});

		productHeadings.forEach((heading, index) => {
			expect(heading).toHaveTextContent(mockItems[index].name);
		});

		buttons.forEach((button, index) => {
			expect(button).toHaveAttribute('href', `/category/${mockItems[index].category}/product-details/${mockItems[index].slug}`);
		});
	});
});