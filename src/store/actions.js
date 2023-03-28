// Payloads
const lettersAndSpaces = (value) => {
	return {
		value: value,
		error: true,
		message: 'Letters and spaces only',
		valid: false
	};
};

const requiredFieldPayload = (value) => {
	return {
		value: value,
		error: true,
		message: 'Required field',
		valid: false
	};
};

const requiredNoErrorPayload = (value) => {
	return {
		value: value,
		error: false,
		message: '',
		valid: false
	};
};

const validPayload = (value) => {
	return {
		value: value,
		error: false,
		message: '',
		valid: true
	};
};

const wrongFormatPayload = (value) => {
	return {
		value: value,
		error: true,
		message: 'Wrong format',
		valid: false
	};
};

const illegalCharacterPayload = (value) => {
	return {
		value: value,
		error: true,
		message: 'Illegal character',
		valid: false
	};
};

const numbersOnlyPayload = (value) => {
	return {
		value: value,
		error: true,
		message: 'Numbers only',
		valid: false
	};
};

const sixToTwelveDigitsPayload = (value) => {
	return {
		value: value,
		error: true,
		message: 'Must be 6-12 digits',
		valid: false
	};
};

const fourDigitsPaylaod = (value) => {
	return {
		value: value,
		error: true,
		message: 'Must be 4 digits',
		valid: false
	};
};


// Action creator
const createAction = (actionType, payload) => {
	return {
		type: actionType,
		payload: payload
	};
};


// Regex
const lettersAndSpacesRegex = (value) => /^[A-Za-z\s]+$/.test(value);   //Checks for letters and spaces only.
const emailRegex = (value) => /^\w+(?:[.-]?\w+)@\w+(?:[.-]?\w+)(?:.\w{2,3})+$/.test(value);
const phoneRegex = (value) => /^[0-9+\- .]+$/.test(value);
const numbersOnlyRegex = (value) => /^[0-9]+$/.test(value);

// Conditions
const hasValue = (value) => value !== '';
const noValue = (value) => value === '';
const blur = (eventType) => eventType === 'blur';
const sixToTwelveDigits = (value) => (value.length < 6 || value.length > 12);
const fourDigits = (value) => value.length !== 4;

export const updateName = (value, eventType) => {
	const actionType = 'checkout/updateName';

	if (!lettersAndSpacesRegex(value) && hasValue(value)) { 
		return createAction(actionType, lettersAndSpaces(value));
	} else if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updateEmail = (value, eventType) => {
	const actionType = 'checkout/updateEmail';

	if (!emailRegex(value) && blur(eventType) && hasValue(value)) { //Checks if the email is in the correct format.
		return createAction(actionType, wrongFormatPayload(value));
	} else if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value) || !emailRegex(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updateTel = (value, eventType) => {
	const actionType = 'checkout/updateTel';

	if (!phoneRegex(value) && hasValue(value)){  //Checks for number 0-9, +, -, and . characters only.
		return createAction(actionType, illegalCharacterPayload(value));
	} else if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updateAddress = (value, eventType) => {
	const actionType = 'checkout/updateAddress';
	
	if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updateZip = (value, eventType) => {
	const actionType = 'checkout/updateZip';
	
	if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updateCity = (value, eventType) => {
	const actionType = 'checkout/updateCity';
	
	if (!lettersAndSpacesRegex(value) && hasValue(value)) { //Checks for letters and spaces only.
		return createAction(actionType, lettersAndSpaces(value));
	} else if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updateCountry = (value, eventType) => {
	const actionType = 'checkout/updateCountry';
	
	if (!lettersAndSpacesRegex(value) && hasValue(value)) { //Checks for letters and spaces only.
		return createAction(actionType, lettersAndSpaces(value));
	} else if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updateENumber = (value, eventType) => {
	const actionType = 'checkout/updateENumber';
	
	if (!numbersOnlyRegex(value) && hasValue(value)) { //Checks to make sure value only contains numbers.
		return createAction(actionType, numbersOnlyPayload(value));
	} else if (sixToTwelveDigits(value) && hasValue(value) && blur(eventType)) {
		return createAction(actionType, sixToTwelveDigitsPayload(value));
	} else if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value) || sixToTwelveDigits(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};

export const updatePin = (value, eventType) => {
	const actionType = 'checkout/updatePin';
	
	if (!numbersOnlyRegex(value) && hasValue(value)) { //Checks to make sure value only contains numbers.
		return createAction(actionType, numbersOnlyPayload(value));
	} else if (fourDigits(value) && blur(eventType) && hasValue(value)) {
		return createAction(actionType, fourDigitsPaylaod(value));
	} else if (noValue(value) && blur(eventType)) {
		return createAction(actionType, requiredFieldPayload(value));
	} else if (noValue(value) || fourDigits(value)) {
		return createAction(actionType, requiredNoErrorPayload(value));
	} else {
		return createAction(actionType, validPayload(value));
	}
};