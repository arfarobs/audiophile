import { expect } from '@jest/globals';

import {
	updateName,
	updateEmail,
	updateTel,
	updateAddress,
	updateZip,
	updateCity,
	updateCountry,
	updateENumber,
	updatePin
} from './actions';

describe('updateName', () => {
	const actionType = 'checkout/updateName';

	it('returns valid action for valid name input', () => {
		const input = 'John Doe';
		const eventType = 'change';
		const expectedAction = {
			type: actionType,
			payload: {
				value: input,
				error: false,
				message: '',
				valid: true,
			},
		};

		const result = updateName(input, eventType);
		expect(result).toEqual(expectedAction);
	});

	it('returns letters and spaces error action for invalid name input', () => {
		const input = 'John123';
		const eventType = 'change';
		const expectedAction = {
			type: actionType,
			payload: {
				value: input,
				error: true,
				message: 'Letters and spaces only',
				valid: false,
			},
		};

		const result = updateName(input, eventType);
		expect(result).toEqual(expectedAction);
	});

	it('returns required no error action for empty name input', () => {
		const input = '';
		const eventType = 'change';
		const expectedAction = {
			type: actionType,
			payload: {
				value: input,
				error: false,
				message: '',
				valid: false,
			},
		};

		const result = updateName(input, eventType);
		expect(result).toEqual(expectedAction);
	});

	it('returns required field error action for empty name input on blur', () => {
		const input = '';
		const eventType = 'blur';
		const expectedAction = {
			type: actionType,
			payload: {
				value: input,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const result = updateName(input, eventType);
		expect(result).toEqual(expectedAction);
	});
});

describe('updateEmail', () => {
	const actionType = 'checkout/updateEmail';

	it('returns valid payload for a valid email', () => {
		const email = 'user@example.com';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: email,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updateEmail(email, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns wrong format payload for an invalid email', () => {
		const email = 'user@examplecom';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: email,
				error: true,
				message: 'Wrong format',
				valid: false,
			},
		};

		const action = updateEmail(email, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when email is empty on blur', () => {
		const email = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: email,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updateEmail(email, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when email is empty and not on blur', () => {
		const email = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: email,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updateEmail(email, eventType);
		expect(action).toEqual(expectedAction);
	});
});

describe('updateTel', () => {
	const actionType = 'checkout/updateTel';

	it('returns valid payload for a valid phone number', () => {
		const tel = '1234567890';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: tel,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updateTel(tel, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns illegal character payload for an invalid phone number', () => {
		const tel = '12345sdf6';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: tel,
				error: true,
				message: 'Illegal character',
				valid: false
			}
		};

		const action = updateTel(tel, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when phone number is empty on blur', () => {
		const tel = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: tel,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updateTel(tel, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when phone number is empty and not on blur', () => {
		const tel = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: tel,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updateTel(tel, eventType);
		expect(action).toEqual(expectedAction);
	});
});

describe('updateAddress', () => {
	const actionType = 'checkout/updateAddress';

	it('returns valid payload for a valid address', () => {
		const address = '123 Main St';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: address,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updateAddress(address, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when address is empty on blur', () => {
		const address = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: address,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updateAddress(address, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when address is empty and not on blur', () => {
		const address = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: address,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updateAddress(address, eventType);
		expect(action).toEqual(expectedAction);
	});
});

describe('updateZip', () => {
	const actionType = 'checkout/updateZip';

	it('returns valid payload for a valid zip code', () => {
		const zip = '12345';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: zip,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updateZip(zip, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when zip code is empty on blur', () => {
		const zip = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: zip,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updateZip(zip, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when zip code is empty and not on blur', () => {
		const zip = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: zip,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updateZip(zip, eventType);
		expect(action).toEqual(expectedAction);
	});
});

describe('updateCity', () => {
	const actionType = 'checkout/updateCity';

	it('returns valid payload for a valid city', () => {
		const city = 'New York';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: city,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updateCity(city, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns letters and spaces error action for invalid city input', () => {
		const city = 'New York1';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: city,
				error: true,
				message: 'Letters and spaces only',
				valid: false,
			},
		};

		const action = updateCity(city, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when city is empty on blur', () => {
		const city = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: city,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updateCity(city, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when city is empty and not on blur', () => {
		const city = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: city,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updateCity(city, eventType);
		expect(action).toEqual(expectedAction);
	});
});

describe('updateCountry', () => {
	const actionType = 'checkout/updateCountry';

	it('returns valid payload for a valid country', () => {
		const country = 'United States';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: country,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updateCountry(country, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns letters and spaces error action for invalid country input', () => {
		const country = 'United States1';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: country,
				error: true,
				message: 'Letters and spaces only',
				valid: false,
			},
		};

		const action = updateCountry(country, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when country is empty on blur', () => {
		const country = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: country,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updateCountry(country, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when country is empty and not on blur', () => {
		const country = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: country,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updateCountry(country, eventType);
		expect(action).toEqual(expectedAction);
	});
});

describe('updateENumber', () => {
	const actionType = 'checkout/updateENumber';

	it('returns valid payload for a valid eNumber', () => {
		const eNumber = '123456789';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: eNumber,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updateENumber(eNumber, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns numbers only error action for invalid eNumber input', () => {
		const eNumber = '123456789a';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: eNumber,
				error: true,
				message: 'Numbers only',
				valid: false,
			},
		};

		const action = updateENumber(eNumber, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns six to twelve didgits payload for invalid eNumber input', () => {
		const eNumber = '12345';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: eNumber,
				error: true,
				message: 'Must be 6-12 digits',
				valid: false,
			},
		};

		const action = updateENumber(eNumber, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when eNumber is empty on blur', () => {
		const eNumber = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: eNumber,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updateENumber(eNumber, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when eNumber is empty and not on blur', () => {
		const eNumber = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: eNumber,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updateENumber(eNumber, eventType);
		expect(action).toEqual(expectedAction);
	});
});

describe('updatePin', () => {
	const actionType = 'checkout/updatePin';

	it('returns valid payload for a valid pin', () => {
		const pin = '1234';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: pin,
				error: false,
				message: '',
				valid: true,
			},
		};

		const action = updatePin(pin, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns numbers only error action for invalid pin input', () => {
		const pin = '123a';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: pin,
				error: true,
				message: 'Numbers only',
				valid: false,
			},
		};

		const action = updatePin(pin, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns four digits payload for invalid pin input', () => {
		const pin = '12345';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: pin,
				error: true,
				message: 'Must be 4 digits',
				valid: false,
			},
		};

		const action = updatePin(pin, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required field payload when pin is empty on blur', () => {
		const pin = '';
		const eventType = 'blur';

		const expectedAction = {
			type: actionType,
			payload: {
				value: pin,
				error: true,
				message: 'Required field',
				valid: false,
			},
		};

		const action = updatePin(pin, eventType);
		expect(action).toEqual(expectedAction);
	});

	it('returns required no error payload when pin is empty and not on blur', () => {
		const pin = '';
		const eventType = 'change';

		const expectedAction = {
			type: actionType,
			payload: {
				value: pin,
				error: false,
				message: '',
				valid: false,
			},
		};

		const action = updatePin(pin, eventType);
		expect(action).toEqual(expectedAction);
	});
});