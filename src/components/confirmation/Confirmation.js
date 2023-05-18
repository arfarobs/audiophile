import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './Confirmation.module.css';

// Images
import orderConfirmationIcon from '../../assets/images/checkout/icon-order-confirmation.svg';

// Components
import CartItems from '../common/cart/cart-items/CartItems';
import Button from '../common/button/Button';

// Actions
import { toggleConfirmation } from '../../store/uiSlice';
import { removeAll } from '../../store/cartSlice';
import { resetForm } from '../../store/checkoutSlice';
import { useEffect } from 'react';


const Confirmation = ({cost, message, cart}) => {
	const dispatch = useDispatch();
	const grandTotal = cost.grandTotal;

	useEffect(() => {
		return () => {
			dispatch(toggleConfirmation());
			dispatch(removeAll());
			dispatch(resetForm());
		};
	}); 



	return (
		<section className={styles.section}>

			<img className={styles.icon} src={orderConfirmationIcon} alt="Order Confirmation Icon" />
			<h2 className={styles.h2}>Thank you <span className='title-span'>for your order</span></h2>
			<p className={classNames(styles.p, 'paragraph')}>
				{message}
			</p>

			<div className={styles.cart}>

				<CartItems where="confirmation" confirmationCart={cart} />

				<div 
					className={classNames(styles.totalContainer, cart.length > 1 ? styles.end : styles.center)}
					data-testid="totalContainerDiv"
				>
					<p className={classNames(styles.total, 'paragraph')}>Grand total</p>
					<p className={styles.totalPrice}>{grandTotal}</p>
				</div>
			</div>

			<Button 
				type="link"
				btnStyle="button2"
				color="orange"
				to="/"
				title="back to home"
			/>
		</section>
	);
};

Confirmation.propTypes = {
	cost: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
	cart: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Confirmation;