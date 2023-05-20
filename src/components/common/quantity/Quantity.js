import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// CSS
import styles from './Quantity.module.css';

// Actions
import { handleCartQuantity } from '../../../store/cartSlice';
import { handleProductQuantity, resetQuantity } from '../../../store/productSlice';



const Quantity = ({where, productName, cartQuantity}) => {
	const { productQuantity } = useSelector(state => state.product);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		if (where === 'product') {
			dispatch(resetQuantity());
		}
	}, [location, dispatch, where]);

	return (
		<div className={styles[where]} data-testid="quantityWrapper">
			<button 
				className={styles.incrementBtn} 
				onClick={() => where === 'cart' ? dispatch(handleCartQuantity({productName: productName, direction: 'down'})) : dispatch(handleProductQuantity('down'))}
			>
				-
			</button>
			<p className={styles.quantity}>{cartQuantity ? cartQuantity : productQuantity}</p>
			<button 
				className={styles.incrementBtn} 
				onClick={() => where === 'cart' ? dispatch(handleCartQuantity({productName: productName, direction: 'up'})) : dispatch(handleProductQuantity('up'))}
			>
				+
			</button>
		</div>
	);
};

Quantity.propTypes = {
	where: PropTypes.string.isRequired,
	productName: PropTypes.string,
	cartQuantity: PropTypes.number
};

export default Quantity;