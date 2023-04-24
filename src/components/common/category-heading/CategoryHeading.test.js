import { render, screen } from '@testing-library/react';
import CategoryHeading from './CategoryHeading';

describe('CategoryHeading', () => {
	it('renders the category heading with the correct text', () => {
		render(<CategoryHeading category="Ohh! Look at me!!" />);
		const heading = screen.getByText('Ohh! Look at me!!');
		expect(heading).toBeInTheDocument();
	});
});