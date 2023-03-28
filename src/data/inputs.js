const billingDetailsInputs = [
	{
		name: 'name',
		label: 'Name',
		type: 'text',
		placeholder: 'Alexei Ward'
	},
	{
		name: 'email',
		label: 'Email Address',
		type: 'text',
		placeholder: 'alexei@mail.com'
	},
	{
		name: 'tel',
		label: 'Phone Number',
		type: 'tel',
		placeholder: '+1 202-555-0136'
	}
];

const shippingInfoInputs = [
	{
		name: 'address',
		label: 'Address',
		type: 'text',
		placeholder: '1137 Williams Avenue'
	},
	{
		name: 'zip',
		label : 'ZIP Code',
		type: 'text',
		placeholder: '10001'
	},
	{
		name: 'city',
		label: 'City',
		type: 'text',
		placeholder: 'New York'
	},
	{
		name: 'country',
		label: 'Country',
		type: 'text',
		placeholder: 'United States'
	}
];

const radioInputs = [
	{
		name: 'e-money',
		label: 'e-Money',
		type: 'radio',
	},
	{
		name: 'cash',
		label: 'Cash on Delivery',
		type: 'radio',
	}
];

const eMoneyInputs = [
	{
		name: 'eNumber',
		label: 'e-Money Number',
		type: 'text',
		placeholder: '238521993'
	},
	{
		name: 'pin',
		label: 'e-Money PIN',
		type: 'text',
		placeholder: '6891'
	}
];

export {billingDetailsInputs, shippingInfoInputs, radioInputs, eMoneyInputs};