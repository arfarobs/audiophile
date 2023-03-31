import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import Header from './Header';
import * as ScrollDirectionHook from '../../../utils/useScrollDirection';
import { Provider } from 'react-redux';
import styles from './Header.module.css';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toggleCartIsOpen, toggleMenuIsOpen } from '../../../store/uiSlice';


const mockStore = configureStore();

const mockLinks = [
	{
		to: '/link1',
		title: 'link 1',
		image: 'image1.jpg',
	},
	{
		to: '/link2',
		title: 'link 2',
		thumbnail: 'image2.jpg',
	},
	{
		to: '/link3',
		title: 'link 3',
		thumbnail: 'image3.jpg',
	},
	{
		to: '/link4',
		title: 'link 4',
		thumbnail: 'image4.jpg',
	},
];

const renderHeader = (props = {},
	menuIsOpen = false, 
	cartIsOpen = false, 
	showConfirmation = false, 
	showInvalidMessage = false
) => {
	const store = mockStore({
		ui: {
			menuIsOpen,
			cartIsOpen,
			showConfirmation,
			showInvalidMessage,
		},
	});
	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<Header {...props} />
			</Provider>, {wrapper: MemoryRouter}
		),
		store
	};
};


describe('Header rendering', () => {
	it('renders Header component', () => {
		renderHeader({links: mockLinks});

		const header = screen.getByRole('banner');

		expect(header).toBeInTheDocument();
	});

	it('renders all child components', () => {
		renderHeader({links: mockLinks});

		const navigations = screen.getAllByRole('navigation');

		expect(navigations.length).toBe(2);
	});
});

describe('Header functionality', () => {
	it('hides the header when scroll direction is down', () => {
		jest.spyOn(ScrollDirectionHook, 'useScrollDirection').mockImplementation(() => 'down');
		renderHeader({ links: mockLinks });
	
		const header = screen.getByRole('banner');
		expect(header).toHaveClass(styles.hidden);
	});
	
	it('shows the header when scroll direction is up', () => {
		jest.spyOn(ScrollDirectionHook, 'useScrollDirection').mockImplementation(() => 'up');
		renderHeader({ links: mockLinks });
	
		const header = screen.getByRole('banner');
		expect(header).not.toHaveClass(styles.hidden);
	});

	it('dispatches toggleMenuIfOpen if menu is open and user clicks on headerBar', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, true);
	
		const headerBar = screen.getByTestId('headerBar');
	
		await user.click(headerBar);
	
		expect(store.dispatch).toHaveBeenCalledWith(toggleMenuIsOpen());
		expect(store.dispatch).not.toHaveBeenCalledWith(toggleCartIsOpen());
	});
	
	it('dispatches toggleCartIfOpen if cart is open and user clicks on headerBar', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, false, true);
	
		const headerBar = screen.getByTestId('headerBar');
	
		await user.click(headerBar);
	
		expect(store.dispatch).toHaveBeenCalledWith(toggleCartIsOpen());
		expect(store.dispatch).not.toHaveBeenCalledWith(toggleMenuIsOpen());
	});
	
	it('does not dispatch any action if menu and cart are closed and user clicks on headerBar', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks});
	
		const headerBar = screen.getByTestId('headerBar');
	
		await user.click(headerBar);
	
		expect(store.dispatch).not.toHaveBeenCalled();
	});
});

describe('menu', () => {
	it('menu is open when menuIsOpen is true', () => {
		renderHeader({links: mockLinks}, true);
	
		const menuContainer = screen.getByTestId('menuContainer');
	
		expect(menuContainer).not.toHaveClass('hiddenMenu');
	});
	
	it('menu is closed when menuIsOpen is false', () => {
		renderHeader({links: mockLinks}, false);
	
		const menuContainer = screen.getByTestId('menuContainer');
	
		expect(menuContainer).toHaveClass('hiddenMenu');
	});

	it('should not disatch any action if showConfirmation === true and menu button is clicked', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, false, false, true);
	
		const menuButton = screen.getAllByRole('button')[0];
	
		await user.click(menuButton);
	
		expect(store.dispatch).not.toHaveBeenCalled();
	});

	it('should not disatch any action if showInvalidMessage === true and menu button is clicked', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, false, false, false, true);
	
		const menuButton = screen.getAllByRole('button')[0];
	
		await user.click(menuButton);
	
		expect(store.dispatch).not.toHaveBeenCalled();
	});

	it('should dispatch toggleMenuIsOpen if menu button is clicked and showConfirmation === false and showInvalidMessage === false', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks});
	
		const menuButton = screen.getAllByRole('button')[0];
	
		await user.click(menuButton);
	
		expect(store.dispatch).toHaveBeenCalledWith(toggleMenuIsOpen());
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});

});

describe('logo', () => {
	it('should dispatch menuIsOpen if logo is clicked, menu is open, and showInvalidMessage is false', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, true);
	
		const logo = screen.getAllByRole('link')[0];
	
		await user.click(logo);
	
		expect(store.dispatch).toHaveBeenCalledWith(toggleMenuIsOpen());
		expect(store.dispatch).not.toHaveBeenCalledWith(toggleCartIsOpen());
	});
	
	it('should dispatch cartIsOpen if logo is clicked, cart is open, and showInvalidMessage is false', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, false, true);
	
		const logo = screen.getAllByRole('link')[0];
	
		await user.click(logo);
	
		expect(store.dispatch).toHaveBeenCalledWith(toggleCartIsOpen());
		expect(store.dispatch).not.toHaveBeenCalledWith(toggleMenuIsOpen());
	});
	
	it('prevents navigation when showInvalidMessage is true and logo is clicked', () => {
		const { store } = renderHeader({ links: mockLinks }, false, false, false, true);
	
		const logo = screen.getAllByRole('link')[0];
		const logoClickEvent = createEvent.click(logo);
	
		const preventDefaultSpy = jest.spyOn(logoClickEvent, 'preventDefault');
	
		fireEvent(logo, logoClickEvent);
	
		expect(preventDefaultSpy).toHaveBeenCalled();
		expect(store.dispatch).not.toHaveBeenCalled();
	});
});

describe('cart', () => {	
	it('should not disatch any action if showConfirmation === true and cart button is clicked', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, false, false, true);
	
		const cartButton = screen.getAllByRole('button')[1];
	
		await user.click(cartButton);
	
		expect(store.dispatch).not.toHaveBeenCalled();
	});

	it('should not disatch any action if showInvalidMessage === true and cart button is clicked', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks}, false, false, false, true);
	
		const cartButton = screen.getAllByRole('button')[1];
	
		await user.click(cartButton);
	
		expect(store.dispatch).not.toHaveBeenCalled();
	});

	it('should dispatch toggleCartIsOpen if cart button is clicked and showConfirmation === false and showInvalidMessage === false', async () => {
		const user = userEvent.setup();
		const { store } = renderHeader({links: mockLinks});
	
		const cartButton = screen.getAllByRole('button')[1];
	
		await user.click(cartButton);
	
		expect(store.dispatch).toHaveBeenCalledWith(toggleCartIsOpen());
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
});






