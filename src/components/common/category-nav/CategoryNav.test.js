import { render, screen } from '@testing-library/react';
import CategoryNav from './CategoryNav';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toggleMenuIsOpen, toggleShowSignIn } from '../../../store/uiSlice';

const mockStore = configureStore();

const mockLinks = [
	{ title: 'link 1', to: './link1', thumbnail: 'thumbnail1.jpg'},
	{ title: 'link 2', to: './link2', thumbnail: 'thumbnail2.jpg' },
	{ title: 'link 3', to: './link3', thumbnail: 'thumbnail3.jpg' },
	{ title: 'link 4', to: './link4', thumbnail: 'thumbnail4.jpg' }
];

const renderCategoryNav = (props = {}, showMessage = false) => {
	const store = mockStore({
		ui: {
			showMessage
		}
	});

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<CategoryNav {...props} />
			</Provider>, {wrapper: MemoryRouter}
		), 
		store
	};
};

describe('CategoryNav', () => {
	it('renders CategoryNav component when where prop = menu', () => {
		renderCategoryNav({where: 'menu', links: mockLinks});

		const categoryNav = screen.getByRole('navigation');

		expect(categoryNav).toBeInTheDocument();
	});

	it('renders CategoryNav component when where prop = page', () => {
		renderCategoryNav({where: 'page', links: mockLinks});

		const categoryNav = screen.getByRole('navigation');

		expect(categoryNav).toBeInTheDocument();
	});

	it('renders the correct number of NavItems', () => {
		renderCategoryNav({where: 'menu', links: mockLinks});

		const navItems = screen.getAllByRole('listitem');

		expect(navItems.length).toBe(4);
	});

	it('assigns the correct classes based on the "where" prop', () => {
		renderCategoryNav({where: 'menu', links: mockLinks});

		const categoryNav = screen.getByRole('navigation');

		expect(categoryNav).toHaveClass('categoryNav');
		expect(categoryNav).toHaveClass('menu');
	});

	it('does not give NavLinks a handle click function when "where" prop does not equal "menu"', () => {
		renderCategoryNav({where: 'header', links: mockLinks});
		const navItem = screen.getByText(/link 1/i);

		expect(navItem).not.toHaveAttribute('onClick');
	});

	it('dispatches toggleMenuIsOpen action when NavItem is clicked and where prop equals "menu"', async () => {
		const user = userEvent.setup();
		const { store } = renderCategoryNav({where: 'menu', links: mockLinks});
		const navItem = screen.getByText(/link 1/i);

		await user.click(navItem);

		expect(store.dispatch).toHaveBeenCalledWith(toggleMenuIsOpen());
	});

	it('renders a sign in button when where prop equals "menu" and location does not equal "/checkout"', () => {
		renderCategoryNav({where: 'menu', links: mockLinks});

		const signInBtn = screen.getByRole('button', {name: /sign in/i});

		expect(signInBtn).toBeInTheDocument();
	});

	it('does not render a sign in button when where prop equals "menu" and location equals "/checkout"', () => {
		renderCategoryNav({where: 'menu', links: mockLinks, testLocation: '/checkout'});

		const signInBtn = screen.queryByRole('button', {name: /sign in/i});

		expect(signInBtn).not.toBeInTheDocument();
	});

	it('does not render a sign in button when where prop does not equal "menu"', () => {
		renderCategoryNav({where: 'header', links: mockLinks});

		const signInBtn = screen.queryByRole('button', {name: /sign in/i});

		expect(signInBtn).not.toBeInTheDocument();
	});

	it('dispatches toggleShowSignIn action when sign in button is clicked and showMessage is false', async () => {
		const user = userEvent.setup();
		const { store } = renderCategoryNav({where: 'menu', links: mockLinks});
		const signInBtn = screen.getByRole('button', {name: /sign in/i});
	
		await user.click(signInBtn);
	
		expect(store.dispatch).toHaveBeenCalledWith(toggleShowSignIn());
	});
	
	it('does not dispatch toggleShowSignIn action when sign in button is clicked and showMessage is true', async () => {
		const user = userEvent.setup();
		const { store } = renderCategoryNav({where: 'menu', links: mockLinks}, true);
		const signInBtn = screen.getByRole('button', {name: /sign in/i});
	
		await user.click(signInBtn);
	
		expect(store.dispatch).not.toHaveBeenCalledWith(toggleShowSignIn());
	});
	
	it('calls handleSignOut and dispatches toggleMenuIsOpen action when sign out button is clicked', async () => {
		const user = userEvent.setup();
		const handleSignOut = jest.fn();
		const { store } = renderCategoryNav({where: 'menu', links: mockLinks, user: {}, handleSignOut});
	
		const signOutBtn = screen.getByRole('button', {name: /sign out/i});
	
		await user.click(signOutBtn);
	
		expect(handleSignOut).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith(toggleMenuIsOpen());
	});
});