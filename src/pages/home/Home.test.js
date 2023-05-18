import { render, screen } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

const renderHome = () => {
	render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
};

it('renders Home component', () => {
	renderHome();

	const homeSections = screen.getAllByTestId('homeSection');
	const images = screen.getAllByRole('img');
	const h2 = screen.getByRole('heading', { level: 2 });
	const paragraph = screen.getByText('Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.');
	const h3s = screen.getAllByRole('heading', { level: 3 });
	const links = screen.getAllByRole('link');

	expect(homeSections.length).toBe(3);
	homeSections.forEach(homeSection => {
		expect(homeSection).toBeInTheDocument();
	});

	expect(images.length).toBe(3);
	images.forEach(image => {
		expect(image).toBeInTheDocument();
	});

	expect(h2).toBeInTheDocument();
	expect(h2).toHaveTextContent('ZX9 speaker');

	expect(paragraph).toBeInTheDocument();

	expect(h3s.length).toBe(2);
	h3s.forEach(h3 => {
		expect(h3).toBeInTheDocument();
	});

	expect(links.length).toBe(3);
	links.forEach(link => {
		expect(link).toBeInTheDocument();
		expect(link).toHaveTextContent('See Product');
	});
});