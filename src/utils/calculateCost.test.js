import calculateCost from './calculateCost';

describe('calculateCost', () => {
	it('calculates cost correctly', () => {
		const cart = [
			{ price: 100, quantity: 2 },
			{ price: 50, quantity: 1 },
		];
		const expectedCost = {
			total: '$ 250',
			vat: '$ 50',
			shipping: '$ 50',
			grandTotal: '$ 350'
		};

		expect(calculateCost(cart)).toEqual(expectedCost);
	});

	it('handles empty cart', () => {
		const cart = [];
		const expectedCost = {
			total: '$ 0',
			vat: '$ 0',
			shipping: '$ 50',
			grandTotal: '$ 50'
		};

		expect(calculateCost(cart)).toEqual(expectedCost);
	});

	it('handles non-integer values', () => {
		const cart = [
			{ price: 99.99, quantity: 1 },
			{ price: 50.50, quantity: 1 },
		];
		const expectedCost = {
			total: '$ 150.49',
			vat: '$ 30.10',
			shipping: '$ 50',
			grandTotal: '$ 230.59'
		};

		expect(calculateCost(cart)).toEqual(expectedCost);
	});
});