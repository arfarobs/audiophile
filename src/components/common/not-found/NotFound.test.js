import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
	it('should render', () => {
		render(<NotFound />);

		const section = screen.getByTestId('notFoundSection');
		const h1 = screen.getByRole('heading', {level: 1});
		const p = screen.getByTestId('notFoundParagraph');

		expect(section).toBeInTheDocument();
		expect(h1).toBeInTheDocument();
		expect(p).toBeInTheDocument();
	});
});