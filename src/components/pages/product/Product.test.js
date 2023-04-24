import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, RouterProvider, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Product from './Product';
import { getProductById } from '../../../firebase/product';
import userEvent from '@testing-library/user-event';

jest.mock('../../../firebase/product');

const mockStore = configureMockStore();

const renderProduct = (isLoading = false) => {
	const store = mockStore({
		ui: {
			isLoading
		},
		product: {
			productQuantity: 1,
		},
	});

	store.dispatch = jest.fn();

	const routes = [
    {
      path: "/category/:category/product-details/:product",
      element: <Product />,
    },
  ];

	const router = createMemoryRouter(routes, {
		initialEntries: ['/category/test-category/product-details/test-product-id']
	});

	return {
		...render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    ),
		store
	};
};

const mockProduct = {
	cartImage: 'cart-image.jpg',
	image: {
		desktop: 'image-desktop.jpg',
		mobile: 'image-mobile.jpg',
		tablet: 'image-tablet.jpg'
	},
	new: true,
	name: 'mockedName', 
	description: 'mocked description', 
	price: 50, 
	features: 'mocked features', 
	includes: [
		{
			item: 'mocked item 1',
			quantity: 1
		},
		{
			item: 'mocked item 2',
			quantity: 3
		},
		{
			item: 'mocked item 3',
			quantity: 1
		},
		{
			item: 'mocked item 4',
			quantity: 8
		}
	], 
	gallery: {
		first: {
			desktop: 'gallery-1-desktop.jpg',
			mobile: 'gallery-1-mobile.jpg',
			tablet: 'gallery-1-tablet.jpg'
		},
		second: {
			desktop: 'gallery-2-desktop.jpg',
			mobile: 'gallery-2-mobile.jpg',
			tablet: 'gallery-2-tablet.jpg'
		},
		third: {
			desktop: 'gallery-3-desktop.jpg',
			mobile: 'gallery-3-mobile.jpg',
			tablet: 'gallery-3-tablet.jpg'
		}
	}, 
	others: [
		{
			category: 'headphones',
			image: {
				desktop: 'others-1-desktop.jpg',
				mobile: 'others-1-mobile.jpg',
				tablet: 'others-1-tablet.jpg'
			},
			name: 'mocked others name 1',
			slug: 'mocked others slug 1'
		},
		{
			category: 'speakers',
			image: {
				desktop: 'others-2-desktop.jpg',
				mobile: 'others-2-mobile.jpg',
				tablet: 'others-2-tablet.jpg'
			},
			name: 'mocked others name 2',
			slug: 'mocked others slug 2'
		},
		{
			category: 'earphones',
			image: {
				desktop: 'others-3-desktop.jpg',
				mobile: 'others-3-mobile.jpg',
				tablet: 'others-3-tablet.jpg'
			},
			name: 'mocked others name 3',
			slug: 'mocked others slug 3'
		}
	],
	cartImage: 'cart-image.jpg'
};

describe('Product rendering', () => {
	beforeEach(() => {
		getProductById.mockImplementation(async (id) => {
			return { ...mockProduct, id };
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without crashing', async () => {
		renderProduct();

		await waitFor(() => expect(screen.getByRole('heading', { name: /mockedName/i })).toBeInTheDocument());
	});

	it('renders the loading component when waiting for product data', async () => {
		const { store } = renderProduct(true);

		const loadingSection = screen.getByTestId('loadingSection');
	
		expect(loadingSection).toBeInTheDocument();
	
		store.getState().ui.isLoading = false;
	
		await waitFor(() => expect(loadingSection).not.toBeInTheDocument());
	
		const productHeading = screen.getByRole('heading', { name: /mockedName/i });
		expect(productHeading).toBeInTheDocument();
	});

	it('renders NotFound when product is not found', async () => {
		getProductById.mockImplementation(async () => {
			return null;
		});

		renderProduct();

		const notFoundSection = await screen.findByTestId('notFoundSection');

		expect(notFoundSection).toBeInTheDocument();
	});

	it('renders child components when product is found', async () => {
		renderProduct();

		const goBackLink = await screen.findByRole('link', { name: /go back/i });
		const productBriefSection = await screen.findByTestId('productBriefSection');
		const productFeaturesSection = await screen.findByTestId('productFeaturesSection');
		const productGallerySection = await screen.findByTestId('productGallerySection');
		const recommendationsSection = await screen.findByTestId('recommendationsSection');

		expect(goBackLink).toBeInTheDocument();
		expect(productBriefSection).toBeInTheDocument();
		expect(productFeaturesSection).toBeInTheDocument();
		expect(productGallerySection).toBeInTheDocument();
		expect(recommendationsSection).toBeInTheDocument();
	});
});

describe('API call', () => {
	beforeEach(() => {
		getProductById.mockImplementation(async (id) => {
			return { ...mockProduct, id };
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('calls getProductById with the correct id', async () => {
		renderProduct();

		await waitFor(() => expect(getProductById).toHaveBeenCalledWith('test-product-id'));
	});
});

describe('useEffect', () => {
	beforeEach(() => {
		getProductById.mockImplementation(async (id) => {
			return { ...mockProduct, id };
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('dispatches the correct actions within the useEffect', async () => {
		const { store } = renderProduct();

		await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/setIsLoading', payload: true }));
		await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/setIsLoading', payload: false }));
	});
});

describe('adding a product to cart', () => {
	beforeEach(() => {
		getProductById.mockImplementation(async (id) => {
			return { ...mockProduct, id };
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('adds the correct object to cart', async () => {
		const user = userEvent.setup();

		const {store} = renderProduct();

		const addToCartButton = await screen.findByRole('button', { name: /add to cart/i });

		await user.click(addToCartButton);

		const expectedProductToAdd = {
			cartThumbnail: mockProduct.cartImage,
			productName: mockProduct.name,
			price: mockProduct.price,
			quantity: 1,
		};

		waitFor(() => expect(store.dispatch).toHaveBeenCalledWith({ type: 'cart/addProduct', payload: expectedProductToAdd }));
	});
});