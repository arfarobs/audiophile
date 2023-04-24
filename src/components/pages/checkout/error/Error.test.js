import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Error from './Error';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate
}));

const renderError = () => {
	const store = mockStore({
		ui: {
			showSubmissionError: true,
		},
	});

	store.dispatch = jest.fn();

	return {
		...render(
			<Provider store={store}>
				<Error />
			</Provider>, { wrapper: MemoryRouter }
		),
		store,
	};
};

describe('Error rendering', () => {
	it('renders without crashing', () => {
		renderError();
	});

	it('renders the expected elements', () => {
		renderError();

		const heading = screen.getByRole('heading', { name: /uh oh/i });
		const message = screen.getByText(/we're sorry, but we were unable to process your order at this time. please check your internet connection and try again later. if the problem persists, please contact our customer support team \(arthurrobertswork@outlook\) for assistance. thank you for your patience and understanding./i);
		const button = screen.getByRole('button', { name: /okay/i });

		expect(heading).toBeInTheDocument();
		expect(message).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});
});

describe('useEffect', () => {
	it('dispatches toggleShowSubmissionError when the component is unmounted', () => {
		const { store, unmount } = renderError();

		expect(store.dispatch).not.toHaveBeenCalled();

		unmount();

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleShowSubmissionError' });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
});

describe('Button', () => {
	it('calls navigate with the correct argument when user clicks the button', async () => {
		const user = userEvent.setup();

		renderError();

		const button = screen.getByRole('button', { name: /okay/i });

		expect(mockNavigate).not.toHaveBeenCalled();

		await user.click(button);

		expect(mockNavigate).toHaveBeenCalledWith(0);
		expect(mockNavigate).toHaveBeenCalledTimes(1);
	});
});