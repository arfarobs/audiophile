import { render, screen } from '@testing-library/react';
import NavItem from './NavItem';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockHandleClick = jest.fn();

const mockProps = {
	link: {
		to: '/path/to/page',
		title: 'Im a title',
		thumbnail: 'path/to/image'
	},
	handleClick: mockHandleClick
};

const renderNavLink = (props = mockProps) => {
	render(<NavItem {...props}/>, {wrapper: MemoryRouter});
};

describe('NavItem rendering', () => {
	it('renders NavItem component', () => {
		renderNavLink();
		
		const navItem = screen.getByRole('listitem');

		expect(navItem).toBeInTheDocument();
	});
});

describe('link', () => {
	it('renders NavItem component with correct link', () => {
		renderNavLink();
		
		const navItem = screen.getByRole('link');
	
		expect(navItem).toHaveAttribute('href', '/path/to/page');
	});

	it('calls handleClick when NavItem is clicked', async () => {
		const user = userEvent.setup();
	
		renderNavLink();
		
		const link = screen.getByRole('link');
	
		await user.click(link);
	
		expect(mockHandleClick).toHaveBeenCalledTimes(1);
	});
});

describe('title', () => {
	it('renders NavItem component with correct title', () => {
		renderNavLink();
		
		const title = screen.getByText('Im a title');

		expect(title).toBeInTheDocument();
	});
});

describe('image', () => {
	it('renders NavItem component with correct image', () => {
		renderNavLink();
		
		const image = screen.getByAltText('Im a title');

		expect(image).toHaveAttribute('src', 'path/to/image');
	});

	it('gives the image the correct class name', () => {
		renderNavLink();
		
		const image = screen.getByAltText('Im a title');

		expect(image).toHaveClass('thumbnail im a titleThumbnail');
	});
});