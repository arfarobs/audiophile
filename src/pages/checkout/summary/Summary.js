import { useSelector } from 'react-redux';

// CSS
import styles from './Summary.module.css';

// Components
import CartItems from '../../../components/common/cart/cart-items/CartItems';

// Utils
import calculateCost from '../../../utils/calculateCost';

const Summary = () => {
	const { cart } = useSelector(state => state.cart);
	const { paymentMethod } = useSelector(state => state.checkout);
	const {total, vat, shipping, grandTotal} = calculateCost(cart);

	return (
		<section className={styles.section} data-testid="summarySection">

			<h2 className={styles.h2}>Summary</h2>

			<CartItems />
		
			<div className={styles.totalBreakdown}>
				<div className={styles.totalContainer}>
					<p className={styles.totalLeft}>Total</p> 
					<p className={styles.totalRight}>{total}</p>
				</div>
				<div className={styles.totalContainer}>
					<p className={styles.totalLeft}>Shipping</p> 
					<p className={styles.totalRight}>{shipping}</p>
				</div>
				<div className={styles.totalContainer}>
					<p className={styles.totalLeft}>VAT</p> 
					<p className={styles.totalRight}>{vat}</p>
				</div>
			</div>

			<div className={styles.grandTotalContainer}>
				<p className={styles.totalLeft}>Grand total</p>
				<p className={styles.grandTotal}>{grandTotal}</p>
			</div>

			<input 
				className={styles.submit} 
				form="checkout-form" 
				type="submit" 
				value={paymentMethod === 'e-money' ? 'Continue & pay' : 'Continue'} 
			/>
		</section>
	);
};

export default Summary;