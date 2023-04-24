import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();
const closeMenuIfopen = jest.fn();

const mockLinks = [
	{
		to: '/headphones',
		title: 'headphones'
	},
	{
		to: '/speakers',
		title: 'speakers'
	},
	{
		to: '/earphones',
		title: 'earphones'
	}
];

const renderNavigation = (
	links = mockLinks, 
	where = 'header', 
	showInvalidMessage = false, 
	menuIsOpen = false
) => {
	const state = {
		ui: {
			showInvalidMessage,
			menuIsOpen
		}
	};

	const store = mockStore(state);

	return render(
		<Provider store={store}>
			<Navigation links={links} where={where} closeMenuIfOpen={closeMenuIfopen} />
		</Provider>, {wrapper: MemoryRouter}
	);
};

describe('Navigation', () => {
	beforeEach(() => {
		closeMenuIfopen.mockReset();
	});

	it('should render', () => {
		renderNavigation();

		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('should give the correct class to the nav element', () => {
		renderNavigation();

		expect(screen.getByRole('navigation')).toHaveClass('header');
	});

	it('should render the correct number of links', () => {
		renderNavigation();

		expect(screen.getAllByRole('link')).toHaveLength(3);
	});

	it('should render the correct links', () => {
		renderNavigation();

		expect(screen.getByText('headphones')).toHaveAttribute('href', '/headphones');
		expect(screen.getByText('speakers')).toHaveAttribute('href', '/speakers');
		expect(screen.getByText('earphones')).toHaveAttribute('href', '/earphones');
	});
});