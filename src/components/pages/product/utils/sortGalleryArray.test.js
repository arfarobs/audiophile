import { expect } from '@jest/globals';
import { sortGalleryArray } from './sortGalleryArray';

describe('sortGalleryArray', () => {
	it('should return a sorted array', () => {
		const mockGallery = {
			second: {
				image: 'image-2.jpg',
			},
			first: {
				image: 'image-1.jpg',
			},
			third: {
				image: 'image-3.jpg',
			},
		};
		
		const expectedSortedGallery = [
			{
				key: 'first',
				image: 'image-1.jpg',
			},
			{
				key: 'second',
				image: 'image-2.jpg',
			},
			{
				key: 'third',
				image: 'image-3.jpg',
			},
		];
		
		const sortedGallery = sortGalleryArray(mockGallery);
		expect(sortedGallery).toEqual(expectedSortedGallery);
	});

	it('should return an empty array if an empty object is passed', () => {
		const sortedGallery = sortGalleryArray({});
		expect(sortedGallery).toEqual([]);
	});

	it('should return an array with a single element if an object with a single key is passed', () => {
		const inputObject = { first: { image: 'image-1.jpg' } };
		const expectedOutput = [{ key: 'first', image: 'image-1.jpg' }];

		const sortedGallery = sortGalleryArray(inputObject);
		expect(sortedGallery).toEqual(expectedOutput);
	});

	it('should work properly with an object that has nested objects', () => {
		const galleryWithNestedObjects = {
			'key1': {
				'title': 'Title 1',
				'nested': {
					'subKey1': 'Sub Value 1',
					'subKey2': 'Sub Value 2'
				}
			},
			'key3': {
				'title': 'Title 3',
				'nested': {
					'subKey1': 'Sub Value 1',
					'subKey2': 'Sub Value 2'
				}
			},
			'key2': {
				'title': 'Title 2',
				'nested': {
					'subKey1': 'Sub Value 1',
					'subKey2': 'Sub Value 2'
				}
			}
		};
		
		const expectedOutput = [
			{
				'key': 'key1',
				'title': 'Title 1',
				'nested': {
					'subKey1': 'Sub Value 1',
					'subKey2': 'Sub Value 2'
				}
			},
			{
				'key': 'key2',
				'title': 'Title 2',
				'nested': {
					'subKey1': 'Sub Value 1',
					'subKey2': 'Sub Value 2'
				}
			},
			{
				'key': 'key3',
				'title': 'Title 3',
				'nested': {
					'subKey1': 'Sub Value 1',
					'subKey2': 'Sub Value 2'
				}
			}
		];

		const sortedGallery = sortGalleryArray(galleryWithNestedObjects);
		expect(sortedGallery).toEqual(expectedOutput);
	});
});
		