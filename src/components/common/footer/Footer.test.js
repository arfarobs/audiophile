import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import configureStore from 'redux-mock-store';

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


const renderFooter = (props = {}) => {
	const store = mockStore({
		ui: {
			showInvalidMessage: false,
		}
	});

	return render(
		<Provider store={store}>
			<Footer {...props} />
		</Provider>, {wrapper: MemoryRouter}
	);
};

describe('Footer', () => {
	it('renders Footer component', () => {
		renderFooter({links: mockLinks});

		const footer = screen.getByRole('contentinfo');

		expect(footer).toBeInTheDocument();
	});

	it('renders Navigation component', () => {
		renderFooter({links: mockLinks});

		const navigation = screen.getByRole('navigation');

		expect(navigation).toBeInTheDocument();
	});

	it('renders the logo with the correct attributes', () => {
		renderFooter({links: mockLinks});

		const logoLink = screen.getAllByRole('link')[0];
		const logo = screen.getAllByRole('img')[0];

		expect(logoLink).toBeInTheDocument();
		expect(logoLink).toHaveAttribute('href', '/link1');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('alt', 'Audiophile');
		expect(logo).toHaveAttribute('title', 'link 1');
		expect(logo).toHaveAttribute('src', 'image1.jpg');
	});

	it('renders the correct number of social media icons', () => {
		renderFooter({links: mockLinks});

		const socialMediaIcons = screen.getAllByRole('img').slice(1);

		expect(socialMediaIcons).toHaveLength(3);
	});
});