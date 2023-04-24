export const getProductName = (name) => {
	let productName = name.split(' ').slice(0, -1).join(' ');
	
	if (productName.includes('Mark')) {
		productName = productName.replace('Mark', 'MK');
	}
	return productName;
};