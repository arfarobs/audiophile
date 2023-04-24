import { render, screen } from '@testing-library/react';
import BestGear from './BestGear';

describe('BestGear component', () => {
	beforeEach(() => {
		render(<BestGear />);
	});

	it('renders the BestGear component', () => {
		const article = screen.getByRole('article');
		expect(article).toBeInTheDocument();
	});
});