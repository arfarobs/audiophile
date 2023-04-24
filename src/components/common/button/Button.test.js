import { render, screen } from '@testing-library/react';
import Button from './Button';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
	it('renders as NavLink when type = link', () => {
		render(
			<Button type="link" btnStyle="stylie" title="testBtn" />, {wrapper: MemoryRouter}
		);

		const navLink = screen.getByRole('link');
		expect(navLink).toBeInTheDocument();
	});

	it('renders as a button when type != link', () => {
		render(
			<Button type="button" btnStyle="ooolala" title="testBtn" />, {wrapper: MemoryRouter}
		);

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});

	it('applies the correct stylees based on btnStyle and color props', () => {
		render(
			<MemoryRouter>
				<Button type="link" btnStyle="mrStylie" color="mrColor" title="testBtn" />
				<Button type="button" btnStyle="mrsStylie" color="mrsColor" title="testBtn" />
			</MemoryRouter>
		);

		const navLink = screen.getByRole('link');
		const button = screen.getByRole('button');

		expect(navLink).toHaveClass('mrStylie');
		expect(navLink).toHaveClass('mrColor');
		expect(button).toHaveClass('mrsStylie');
		expect(button).toHaveClass('mrsColor');
	});

	it('will navigate to the correct path when to prop is provided', () => {
		render(
			<Button type="link" btnStyle="stylie" title="testBtn" to="/weGoesHere" />, {wrapper: MemoryRouter}
		);

		const navLink = screen.getByRole('link');

		expect(navLink).toHaveAttribute('href', '/weGoesHere');
	});

	it('will call the onClick function when a button is clicked', async () => {
		const user = userEvent.setup();
		const handleClick = jest.fn();

		render(
			<Button type="button" btnStyle="stylie" title="testBtn" onClick={handleClick} />, {wrapper: MemoryRouter}
		);

		const button = screen.getByRole('button');
		await user.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});