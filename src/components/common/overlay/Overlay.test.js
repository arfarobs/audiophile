import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Overlay from './Overlay';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore();

const mockState = {
	ui: {
		menuIsOpen: false,
		cartIsOpen: false,
		showConfirmation: false,
		showInvalidMessage: false,
		showSubmissionError: false,
		showSignIn: false,
		showMessage: false,
		isLoading: false
	}
};

const renderOverlay = (state = mockState, location = '/') => {
	const store = mockStore(state);

	store.dispatch = jest.fn();

	return{
		...render(
			<Provider store={store}>
				<Overlay testLocation={location} />
			</Provider>
		),
		store
	};
};

describe('Overlay', () => {
	it('should render', () => {
		renderOverlay(mockState);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toBeInTheDocument();
	});

	it('should not have the show class when menuIsOpen, cartIsOpen, showConfirmation, showInvalidMessage, showSignIn, showMessage, and showSubmissionError are false', () => {
		renderOverlay(mockState);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).not.toHaveClass('show');
	});

	it('should have the show class when menuIsOpen is true', () => {
		const state = {
			ui: {
				menuIsOpen: true,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				showSignIn: false,
				showMessage: false,
				isLoading: false
			},
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should have the show class when cartIsOpen is true', () => {
		const state = {
			ui: {
				menuIsOpen: false,
				cartIsOpen: true,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				showSignIn: false,
				showMessage: false,
				isLoading: false
			},
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should have the show class when showConfirmation is true', () => {
		const state = {
			ui: {
				menuIsOpen: false,
				cartIsOpen: false,
				showConfirmation: true,
				showInvalidMessage: false,
				showSubmissionError: false,
				showSignIn: false,
				showMessage: false,
				isLoading: false
			},
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should have the show class when showInvalidMessage is true', () => {
		const state = {
			ui: {
				menuIsOpen: false,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: true,
				showSubmissionError: false,
				showSignIn: false,
				showMessage: false,
				isLoading: false
			},
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should have the show class when showSubmissionError is true', () => {
		const state = {
			ui: {
				menuIsOpen: false,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: true,
				showSignIn: false,
				showMessage: false,
				isLoading: false
			},
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should have the show class when showSignIn is true', () => {
		const state = {
			ui: {
				menuIsOpen: false,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				showSignIn: true,
				showMessage: false,
				isLoading: false
			},
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should have the show class when showMessage is true', () => {
		const state = {
			ui: {
				menuIsOpen: false,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				showSignIn: false,
				showMessage: true,
				isLoading: false
			},
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should have the show class when isLoading is true and the location is /checkout', async () => {
		const state = {
			ui: {
				menuIsOpen: false,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				showSignIn: false,
				showMessage: false,
				isLoading: true
			},
		};

		renderOverlay(state, '/checkout');

		const overlay = screen.getByTestId('overlay');

		await waitFor(() => expect(overlay).toHaveClass('overlay show'));
	});

	it('should dispatch toggleMenuIsOpen when menuIsOpen is true and the overlay is clicked', async () => {
		const user = userEvent.setup();

		const { store } = renderOverlay({
			ui: {
				menuIsOpen: true,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				isLoading: false
			},
		});

		const overlay = screen.getByTestId('overlay');

		await user.click(overlay);

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleMenuIsOpen' });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});

	it('should dispatch toggleCartIsOpen when cartIsOpen is true and the overlay is clicked', async () => {
		const user = userEvent.setup();

		const { store } = renderOverlay({
			ui: {
				menuIsOpen: false,
				cartIsOpen: true,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				isLoading: false
			},
		});

		const overlay = screen.getByTestId('overlay');

		await user.click(overlay);

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleCartIsOpen' });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
	
	it('should dispatch toggleShowSignIn when showSignIn is true and the overlay is clicked', async () => {
		const user = userEvent.setup();

		const { store } = renderOverlay({
			ui: {
				menuIsOpen: false,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false,
				showSignIn: true,
				isLoading: false
			},
		});

		const overlay = screen.getByTestId('overlay');

		await user.click(overlay);

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleShowSignIn' });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
});