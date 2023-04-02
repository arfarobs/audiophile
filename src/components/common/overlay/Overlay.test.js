import { render, screen } from '@testing-library/react';
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
		showSubmissionError: false
	}
};

const renderOverlay = (state = mockState) => {
	const store = mockStore(state);

	store.dispatch = jest.fn();

	return{
		...render(
			<Provider store={store}>
					<Overlay />
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

	it('should not have the show class when menuIsOpen, cartIsOpen, showConfirmation, showInvalidMessage, and showSubmissionError are false', () => {
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
				showSubmissionError: false
			}
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
				showSubmissionError: false
			}
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
				showSubmissionError: false
			}
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
				showSubmissionError: false
			}
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
				showSubmissionError: true
			}
		};

		renderOverlay(state);

		const overlay = screen.getByTestId('overlay');

		expect(overlay).toHaveClass('overlay show');
	});

	it('should dispatch toggleMenuIsOpen when menuIsOpen is true and the overlay is clicked', async () => {
		const user = userEvent.setup();

		const { store } = renderOverlay({
			ui: {
				menuIsOpen: true,
				cartIsOpen: false,
				showConfirmation: false,
				showInvalidMessage: false,
				showSubmissionError: false
			}
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
				showSubmissionError: false
			}
		});

		const overlay = screen.getByTestId('overlay');

		await user.click(overlay);

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'ui/toggleCartIsOpen' });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
});