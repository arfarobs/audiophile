import {screen, render} from '@testing-library/react';
import ProductFeatures from './ProductFeatures';

const mockProps = {
	features: 'features',
	includes: [
		{
			item: 'item 1',
			quantity: 4
		},
		{
			item: 'item 2',
			quantity: 2
		},
		{
			item: 'item 3',
			quantity: 1
		},
		{
			item: 'item 4',
			quantity: 8
		}
	]
};

const renderProductFeatures = (props) => {
	return render(<ProductFeatures {...props} />);
};

describe('rendering', () => {
	it('renders without crashing', () => {
		renderProductFeatures(mockProps);
	});

	it('renders the heading', () => {
		renderProductFeatures(mockProps);

		const heading = screen.getByRole('heading', {name: /features/i});

		expect(heading).toBeInTheDocument();
	});

	it('renders the features description paragraph in a pre tag', () => {
		renderProductFeatures(mockProps);

		const description = screen.getByText(mockProps.features);

		expect(description).toBeInTheDocument();
		expect(description.tagName).toBe('PRE');
	});

	it('renders the items heading', () => {
		renderProductFeatures(mockProps);

		const heading = screen.getByRole('heading', {name: /in the box/i});

		expect(heading).toBeInTheDocument();
	});

	it('renders the items list', () => {
		renderProductFeatures(mockProps);

		const list = screen.getByRole('list');

		expect(list).toBeInTheDocument();
	});

	it('renders the list items correctly', () => {
		renderProductFeatures(mockProps);

		const listItems = screen.getAllByRole('listitem');

		expect(listItems).toHaveLength(mockProps.includes.length);
		listItems.forEach((item, index) => {
			const quantity = screen.getByText(`${mockProps.includes[index].quantity}x`);
			const itemName = screen.getByText(mockProps.includes[index].item);

			expect(item).toBeInTheDocument();
			expect(quantity).toBeInTheDocument();
			expect(itemName).toBeInTheDocument();
		});
	});
});