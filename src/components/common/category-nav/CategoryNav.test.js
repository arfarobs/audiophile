import { render, screen } from '@testing-library/react';
import CategoryNav from './CategoryNav';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toggleMenuIsOpen } from '../../../store/uiSlice';

const mockStore = configureStore();

const mockLinks = [
	{ title: 'link 1', to: './link1', thumbnail: 'thumbnail1.jpg'},
	{ title: 'link 2', to: './link2', thumbnail: 'thumbnail2.jpg' },
	{ title: 'link 3', to: './link3', thumbnail: 'thumbnail3.jpg' },
	{ title: 'link 4', to: './link4', thumbnail: 'thumbnail4.jpg' }
];

const renderCategoryNav = (props = {}) => {
	const store = mockStore({});

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<CategoryNav {...props} />
			</Provider>, {wrapper: MemoryRouter}
		), 
		store
	}
}

describe('CategoryNav', () => {
	it('renders CategoryNav component', () => {
		renderCategoryNav({where: 'menu', links: mockLinks});

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
});