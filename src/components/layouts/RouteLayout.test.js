import {render, screen} from '@testing-library/react';
import RouteLayout from './RouteLayout';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from '../../routes/routes';


const mockStore = configureStore();
const calculateCost = jest.fn();

const renderRouteLayout = (cartIsOpen = false, path = '/') => {
	const store = mockStore({
		ui: {
			cartIsOpen: cartIsOpen
		},
		cart: {
			cart: [
				{
					productName: 'imAJuicyLittleProduct',
					price: 50,
					quantity: 1
				}
			]
		},
		product: {
			productQuantity: 1
		},
		checkout: {
			paymentMethod: 'e-money',
			name: {value: '', error: false, message: '', valid: false},
			email: {value: '', error: false, message: '', valid: false},
			tel: {value: '', error: false, message: '', valid: false},
			address: {value: '', error: false, message: '', valid: false},
			zip: {value: '', error: false, message: '', valid: false},
			city: {value: '', error: false, message: '', valid: false},
			country: {value: '', error: false, message: '', valid: false},
			eNumber: {value: '', error: false, message: '', valid: false},
			pin: {value: '', error: false, message: '', valid: false},
			formIsValid: false,
			formIsSubmitting: false,
			order: {
				cart: [],
				form: {},
				cost: {},
				date: ''
			}
		}
	});

	store.dispatch = jest.fn();

	const router = createMemoryRouter(routerConfig, {initialEntries: [path]});


	return {
		...render(
				<Provider store={store}>
						<RouterProvider router={router} />
				</Provider>
		),
		store,
		router
	};
};

describe('RouteLayout', () => {
	beforeAll(() => {
		window.scrollTo = jest.fn();
	});

	it('renders RouteLayout without crashing', () => {
		renderRouteLayout();
	});

	it('renders Header, Overlay, and Footer components', () => {
		renderRouteLayout();

		expect(screen.getByRole('banner')).toBeInTheDocument(); 
		expect(screen.getByTestId('overlay')).toBeInTheDocument(); 
		expect(screen.getByRole('contentinfo')).toBeInTheDocument(); 
	});

	it('renders Cart component when cartIsOpen is true', () => {
		renderRouteLayout(true);

		expect(screen.getByTestId('cart')).toBeInTheDocument();
	});

	it('does not render Cart component when cartIsOpen is false', () => {
		renderRouteLayout();

		expect(screen.queryByTestId('cart')).not.toBeInTheDocument();
	});

	it('renders Banner, CategoryNav, and BestGear components correctly when path is /', () => {
		const { router } = renderRouteLayout();

		const pathname = router.state.location.pathname;
		const banner = screen.getByTestId('banner');
		const categoryNavTop = screen.getByTestId('categoryNavTop');
		const categoryNavBottom = screen.queryByTestId('categoryNavBottom');
		const bestGear = screen.getByTestId('bestGear');

		expect(pathname).toBe('/');
		expect(banner).toBeInTheDocument();
		expect(categoryNavTop).toBeInTheDocument();
		expect(categoryNavBottom).not.toBeInTheDocument();
		expect(bestGear).toBeInTheDocument();
	});

	it('does not render banner, categoryNavTop, categoryNavBottom, or bestGear components when path is /checkout', () => {
		const { router } = renderRouteLayout(false, '/checkout');

		const pathname = router.state.location.pathname;
		const banner = screen.queryByTestId('banner');
		const categoryNavTop = screen.queryByTestId('categoryNavTop');
		const categoryNavBottom = screen.queryByTestId('categoryNavBottom');
		const bestGear = screen.queryByTestId('bestGear');

		expect(pathname).toBe('/checkout');
		expect(banner).not.toBeInTheDocument();
		expect(categoryNavTop).not.toBeInTheDocument();
		expect(categoryNavBottom).not.toBeInTheDocument();
		expect(bestGear).not.toBeInTheDocument();
	});

	it('renders categoryNavBottom and BestGear but doesnt render banner or categoryNavTop when path is /headphones', () => {
		const { router } = renderRouteLayout(false, '/headphones');

		const pathname = router.state.location.pathname;
		const banner = screen.queryByTestId('banner');
		const categoryNavTop = screen.queryByTestId('categoryNavTop');
		const categoryNavBottom = screen.queryByTestId('categoryNavBottom');
		const bestGear = screen.getByTestId('bestGear');

		expect(pathname).toBe('/headphones');
		expect(banner).not.toBeInTheDocument();
		expect(categoryNavTop).not.toBeInTheDocument();
		expect(categoryNavBottom).toBeInTheDocument();
		expect(bestGear).toBeInTheDocument();
	});

	it('asigns the correct classnames when path is /', () => {
		const { router } = renderRouteLayout();

		const pathname = router.state.location.pathname;
		const routeLayout = screen.getByTestId('routeLayoutDiv');
		const main = screen.getByRole('main');

		expect(pathname).toBe('/');
		expect(routeLayout).not.toHaveClass('moveBodyDown');
		expect(main).not.toHaveClass('mainDown');
	});

	it('asigns the correct classnames when path is not /', () => {
		const { router } = renderRouteLayout(false, '/checkout');

		const pathname = router.state.location.pathname;
		const routeLayout = screen.getByTestId('routeLayoutDiv');
		const main = screen.getByRole('main');

		expect(pathname).toBe('/checkout');
		expect(routeLayout).toHaveClass('moveBodyDown');
		expect(main).toHaveClass('mainDown');
	});
});