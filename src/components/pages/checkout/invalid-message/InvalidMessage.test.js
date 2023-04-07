import { render, screen } from '@testing-library/react';
import InvalidMessage from './InvalidMessage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const renderInvalidMessage = () => {
	const store = mockStore({});

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<InvalidMessage />
			</Provider>
		),
		store
	};
};

describe('InvalidMessage', () => {
	it('renders properly', () => {
		renderInvalidMessage();

		const section = screen.getByTestId('invalidMessageSection');
		const h2 = screen.getByRole('heading', { level: 2 });
		const p = screen.getByText(/There seem to be some problems with your form./i);
		const button = screen.getByRole('button');

		expect(section).toBeInTheDocument();
		expect(h2).toBeInTheDocument();
		expect(p).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	it('dispatches toggleShowInvalidMessage action when button is clicked', async () => {
		const user = userEvent.setup()

		const { store } = renderInvalidMessage();

		const button = screen.getByRole('button');

		await user.click(button);

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleShowInvalidMessage' });
	});
});