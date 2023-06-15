import { configureStore } from '@reduxjs/toolkit';
import userSlice, { 
	signIn,
	signOut
} from './userSlice';

describe('userSlice', () => {
	let store;

	beforeEach(() => {
		store = configureStore({ reducer: userSlice });
	});

	it('signs in', () => {
		store.dispatch(signIn());
		expect(store.getState().isSignedIn).toEqual(true);
	});

	it('signs out', () => {
		store.dispatch(signOut());
		expect(store.getState().isSignedIn).toEqual(false);
	});
});