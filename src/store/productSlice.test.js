import { configureStore } from '@reduxjs/toolkit';
import productReducer, { handleProductQuantity, resetQuantity } from './productSlice';

const store = configureStore({
	reducer: {
		product: productReducer,
	},
});

describe('productSlice', () => {
	afterEach(() => {
		store.dispatch(resetQuantity());
	});

  it('should handle incrementing product quantity', () => {
    store.dispatch(handleProductQuantity('up'));
    expect(store.getState().product.productQuantity).toEqual(2);
  });

  it('should handle decrementing product quantity', () => {
    store.dispatch(handleProductQuantity('up'));
    store.dispatch(handleProductQuantity('up'));
    store.dispatch(handleProductQuantity('down'));
    expect(store.getState().product.productQuantity).toEqual(2);
  });

  it('should not decrement product quantity below 1', () => {
    store.dispatch(handleProductQuantity('down'));
    expect(store.getState().product.productQuantity).toEqual(1);
  });

  it('should reset product quantity to 1', () => {
    store.dispatch(handleProductQuantity('up'));
    store.dispatch(resetQuantity());
    expect(store.getState().product.productQuantity).toEqual(1);
  });
});