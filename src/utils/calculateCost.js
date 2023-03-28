const formatNumber = (num) => {
	let newNumber = Number.isInteger(num) ? num : num.toFixed(2);
	return `$ ${newNumber.toLocaleString('en-US')}`;
};

const calculateCost = (cart) => {
	const shipping = 50;
	const { total, vat } = cart.reduce(({ total, vat }, item) => ({
		total: total + item.price * item.quantity,
		vat: vat + (item.price * item.quantity * 0.2)
	}), { total: 0, vat: 0 });

	const grandTotal = total + vat + shipping;

	return { 
		total: formatNumber(total), 
		vat: formatNumber(vat), 
		shipping: formatNumber(shipping), 
		grandTotal: formatNumber(grandTotal) 
	};
};

export default calculateCost;