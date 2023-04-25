export const getProductName = (name) => {
	let productName = name.split(' ').slice(0, -1).join(' ');
	
	if (productName.toLowerCase().includes('mark')) {
		productName = productName.replace(/mark/gi, 'MK');
	}
	
	return productName;
};