import { configureStore } from '@reduxjs/toolkit';
import uiSlice, { 
	toggleMenuIsOpen, 
	toggleCartIsOpen, 
	toggleConfirmation, 
	toggleShowInvalidMessage, 
	toggleShowSubmissionError,
	setIsLoading
} from './uiSlice';

describe('uiSlice', () => {
	let store;

	beforeEach(() => {
		store = configureStore({ reducer: uiSlice });
	});

	it('toggles menu open and close', () => {
		store.dispatch(toggleMenuIsOpen());
		expect(store.getState().menuIsOpen).toEqual(true);
		store.dispatch(toggleMenuIsOpen());
		expect(store.getState().menuIsOpen).toEqual(false);
	});

	it('toggles cart open and close', () => {
		store.dispatch(toggleCartIsOpen());
		expect(store.getState().cartIsOpen).toEqual(true);
		store.dispatch(toggleCartIsOpen());
		expect(store.getState().cartIsOpen).toEqual(false);
	});

	it('toggles confirmation', () => {
		store.dispatch(toggleConfirmation());
		expect(store.getState().showConfirmation).toEqual(true);
		store.dispatch(toggleConfirmation());
		expect(store.getState().showConfirmation).toEqual(false);
	});

	it('toggles invalid message', () => {
		store.dispatch(toggleShowInvalidMessage());
		expect(store.getState().showInvalidMessage).toEqual(true);
		store.dispatch(toggleShowInvalidMessage());
		expect(store.getState().showInvalidMessage).toEqual(false);
	});

	it('sets loading state', () => {
		store.dispatch(setIsLoading(false));
		expect(store.getState().isLoading).toEqual(false);
		store.dispatch(setIsLoading(true));
		expect(store.getState().isLoading).toEqual(true);
	});

	it('toggles submission error', () => {
		store.dispatch(toggleShowSubmissionError());
		expect(store.getState().showSubmissionError).toEqual(true);
		store.dispatch(toggleShowSubmissionError());
		expect(store.getState().showSubmissionError).toEqual(false);
	});

	it('closes cart when opening menu', () => {
		store.dispatch(toggleCartIsOpen());
		expect(store.getState().cartIsOpen).toEqual(true);
		store.dispatch(toggleMenuIsOpen());
		expect(store.getState().menuIsOpen).toEqual(true);
		expect(store.getState().cartIsOpen).toEqual(false);
	});

	it('closes menu when opening cart', () => {
		store.dispatch(toggleMenuIsOpen());
		expect(store.getState().menuIsOpen).toEqual(true);
		store.dispatch(toggleCartIsOpen());
		expect(store.getState().cartIsOpen).toEqual(true);
		expect(store.getState().menuIsOpen).toEqual(false);
	});
});