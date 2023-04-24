import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Category from './Category';
import { getProductsByCategory } from '../../../firebase/product';
import { setIsLoading } from '../../../store/uiSlice';

jest.mock('../../../firebase/product');

const mockStore = configureStore();

const renderCategory = (location) => {
	const store = mockStore({
		ui: {
			isLoading: true,
		}
	});

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/category/test-category']}>
					<Category testLocation={location} />
				</MemoryRouter>
			</Provider>
		),
		store
	};
};

const mockProducts = [
	{
		categoryImage: {
			mobile: 'mobile.jpg',
			tablet: 'tablet.jpg',
			desktop: 'desktop.jpg',
		},
		name: 'Test Product',
		new: true,
		description: 'Test Product Description',
		slug: 'test-product',
	},
	{
		categoryImage: {
			mobile: 'mobile.jpg',
			tablet: 'tablet.jpg',
			desktop: 'desktop.jpg',
		},
		name: 'Test Product 2',
		new: false,
		description: 'Test Product Description 2',
		slug: 'test-product-2'
	},
	{
		categoryImage: {
			mobile: 'mobile.jpg',
			tablet: 'tablet.jpg',
			desktop: 'desktop.jpg',
		},
		name: 'Test Product 3',
		new: false,
		description: 'Test Product Description 3',
		slug: 'test-product-3'
	}
];

describe('initial state and rendering', () => {
	beforeEach(() => {
		getProductsByCategory.mockImplementation(async () => {
			const result = {
				empty: false,
				docs: [
					{
						data: () => mockProducts[0],
					},
					{
						data: () => mockProducts[1],
					},
					{
						data: () => mockProducts[2],
					},
				]
			};
			return result;
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders CategoryHeading and Loading components initially', async () => {
		renderCategory();

		const categoryHeading = screen.getByRole('heading', { name: /test-category/i });
		const loading = screen.getByAltText(/loading please wait/i);

		expect(categoryHeading).toBeInTheDocument();
		expect(loading).toBeInTheDocument();

		await waitFor(() => expect(getProductsByCategory).toHaveBeenCalledWith('test-category'));
	});

	it('renders category heading and product overviews when products are available', async () => {
		renderCategory();

		const categoryHeading = screen.getByRole('heading', { name: /test-category/i });

		expect(categoryHeading).toBeInTheDocument();
		await waitFor(() => expect(getProductsByCategory).toHaveBeenCalledWith('test-category'));

		await waitFor(() => {
			const productHeadings = screen.getAllByRole('heading', { name: /test product/i });
			const productDescriptions = screen.getAllByText(/test product description/i);

			expect(productHeadings).toHaveLength(3);
			expect(productDescriptions).toHaveLength(3);
			productHeadings.forEach((heading) => expect(heading).toBeInTheDocument());
			productDescriptions.forEach((description) => expect(description).toBeInTheDocument());
		});
	});

	it('renders NotFound component when no products are available', async () => {
		getProductsByCategory.mockResolvedValue({
			empty: true,
			docs: [],
		});

		renderCategory();

		await waitFor(() => expect(getProductsByCategory).toHaveBeenCalledWith('test-category'));
		await waitFor(() => {
			const uhOhHeading = screen.getByRole('heading', { name: /uh oh/i });
			const notFoundParagraph = screen.getByTestId('notFoundParagraph');

			expect(uhOhHeading).toBeInTheDocument();
			expect(notFoundParagraph).toBeInTheDocument();
		});
	});
});

describe('useEffect and API calls', () => {
	beforeEach(() => {
		getProductsByCategory.mockImplementation(async () => {
			const result = {
				empty: false,
				docs: [
					{
						data: () => mockProducts[0],
					}
				]
			};
			return result;
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('calls useEffect when category or dispatch dependencies change', async () => {
		const store = mockStore({
			ui: {
				isLoading: true,
			}
		});
	
		store.dispatch = jest.fn();

		const { rerender } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Category testLocation={'test-category'} />
				</MemoryRouter>
			</Provider>
		);

		await waitFor(() => expect(getProductsByCategory).toHaveBeenCalledWith('test-category'));

		rerender(
			<Provider store={store}>
				<MemoryRouter>
					<Category testLocation={'new-location'} />
				</MemoryRouter>
			</Provider>
		);	

		await waitFor(() => expect(getProductsByCategory).toHaveBeenCalledWith('new-location'));
		
	});

	it('calls getProductsByCategory with the correct argument', async () => {
		renderCategory();

		await waitFor(() => expect(getProductsByCategory).toHaveBeenCalledWith('test-category'));
	});

	it('dispatches setIsLoading action with the correct value before API call', async () => {
		const { store } = renderCategory();

		await waitFor(() => {
			expect(store.dispatch).toHaveBeenCalledWith(setIsLoading(true));
			expect(store.dispatch).toHaveBeenCalledTimes(1);
		});
	});

	it('dispatches setIsLoading action with the correct value after API call', async () => {
		const { store } = renderCategory();

		await waitFor(() => {
			expect(store.dispatch).toHaveBeenCalledWith(setIsLoading(false));
			expect(store.dispatch).toHaveBeenCalledTimes(2);
		});
	});
});

