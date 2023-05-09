import { configureStore } from '@reduxjs/toolkit';
import cartSlice, { addToCart, handleCartQuantity, removeAll } from './cartSlice';
import './__mocks__/localStorageMock';

const store = configureStore({
	reducer: {
		cart: cartSlice,
	},
});

describe('cartSlice', () => {
	afterEach(() => {
		store.dispatch(removeAll());
	});

	it('addToCart: adds product to the cart when not already present', () => {
		const product = { productName: 'Test Product', quantity: 1 };
		store.dispatch(addToCart(product));

		const currentState = store.getState().cart;
		expect(currentState.cart).toHaveLength(1);
		expect(currentState.cart[0]).toEqual(product);
	});

	it('addToCart: increments the quantity of a product already in the cart', () => {
		const product = { productName: 'Test Product', quantity: 1 };
		store.dispatch(addToCart(product));
		store.dispatch(addToCart(product));

		const currentState = store.getState().cart;
		expect(currentState.cart).toHaveLength(1);
		expect(currentState.cart[0].quantity).toBe(2);
	});

	it('handleCartQuantity: increments product quantity', () => {
		const product = { productName: 'Test Product', quantity: 1 };
		store.dispatch(addToCart(product));
		store.dispatch(handleCartQuantity({ productName: product.productName, direction: 'up' }));

		const currentState = store.getState().cart;
		expect(currentState.cart[0].quantity).toBe(2);
	});

	it('handleCartQuantity: decrements product quantity', () => {
		const product = { productName: 'Test Product', quantity: 2 };
		store.dispatch(addToCart(product));
		store.dispatch(handleCartQuantity({ productName: product.productName, direction: 'down' }));

		const currentState = store.getState().cart;
		expect(currentState.cart[0].quantity).toBe(1);
	});

	it('handleCartQuantity: removes product when quantity is 1 and direction is down', () => {
		const product = { productName: 'Test Product', quantity: 1 };
		store.dispatch(addToCart(product));
		store.dispatch(handleCartQuantity({ productName: product.productName, direction: 'down' }));

		const currentState = store.getState().cart;
		expect(currentState.cart).toHaveLength(0);
	});

	it('removeAll: removes all items from the cart', () => {
		const product1 = { productName: 'Test Product 1', quantity: 1 };
		const product2 = { productName: 'Test Product 2', quantity: 2 };
		store.dispatch(addToCart(product1));
		store.dispatch(addToCart(product2));

		store.dispatch(removeAll());
		const currentState = store.getState().cart;
		expect(currentState.cart).toHaveLength(0);
	});

	it('addToCart: saves cart to localStorage', () => {
		const product = { productName: 'Test Product', quantity: 1 };
		store.dispatch(addToCart(product));
	
		const storedCart = JSON.parse(localStorage.getItem('cart'));
		expect(storedCart).toHaveLength(1);
		expect(storedCart[0]).toEqual(product);
	});
	
	it('handleCartQuantity: updates cart in localStorage', () => {
		const product = { productName: 'Test Product', quantity: 1 };
		store.dispatch(addToCart(product));
		store.dispatch(handleCartQuantity({ productName: product.productName, direction: 'up' }));
	
		const storedCart = JSON.parse(localStorage.getItem('cart'));
		expect(storedCart[0].quantity).toBe(2);
	});
	
	it('removeAll: clears localStorage', () => {
		const product1 = { productName: 'Test Product 1', quantity: 1 };
		const product2 = { productName: 'Test Product 2', quantity: 2 };
		store.dispatch(addToCart(product1));
		store.dispatch(addToCart(product2));
	
		store.dispatch(removeAll());
		expect(localStorage.getItem('cart')).toBeUndefined();
	});
});