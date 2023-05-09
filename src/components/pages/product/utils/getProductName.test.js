import { getProductName } from './getProductName';

describe('getProductName', () => {
	it('should return the correct name when input includes "Mark"', () => {
		const name = 'XX99 Mark II Headphones';
		const expected = 'XX99 MK II';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});

	it('should return the correct name when input does not include "Mark"', () => {
		const name = 'XX99 Headphones';
		const expected = 'XX99';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});

	it('should return the correct name when input contains multiple "mark"s', () => {
		const name = 'XX99 Mark Mark Mark Mark';
		const expected = 'XX99 MK MK MK';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});

	it('should not be case sensitive', () => {
		const name = 'xx99 mark ii headphones';
		const expected = 'xx99 MK ii';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});

	it('should return an empty string when only passed one word', () => {
		const name = 'mark';
		const expected = '';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});

	it('should return an empty string when passed an empty string', () => {
		const name = '';
		const expected = '';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});

	it('should work with special characters', () => {
		const name = '@#$% Mark &^*()';
		const expected = '@#$% MK';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});

	it('should work with numbers', () => {
		const name = 'XX99 Mark 2 Headphones';
		const expected = 'XX99 MK 2';
		const result = getProductName(name);
		expect(result).toBe(expected);
	});
});