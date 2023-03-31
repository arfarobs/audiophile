import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
	it('renders Loading component', () => {
		render(<Loading purpose="submit" />);
		
		const section = screen.getByTestId('loadingSection');

		expect(section).toBeInTheDocument();
	});

	it('renders Loading component with purpose submit', () => {
		render(<Loading purpose="submit" />);
		
		const section = screen.getByTestId('loadingSection');

		expect(section).toHaveClass('section submit');
	});

	it('renders Loading component with purpose loading', () => {
		render(<Loading purpose="loading" />);
		
		const section = screen.getByTestId('loadingSection');

		expect(section).toHaveClass('section loading');
	});

	it('renders the h1 element when purpose is submit', () => {
		render(<Loading purpose="submit" />);
		
		const h1 = screen.getByRole('heading', { level: 1 });

		expect(h1).toBeInTheDocument();
	});

	it('does not render the h1 element when purpose is not submit', () => {	
		render(<Loading purpose="loading" />);
		
		const h1 = screen.queryByRole('heading', { level: 1 });

		expect(h1).not.toBeInTheDocument();
	});
});