import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// CSS
import styles from './Cart.module.css';

// Components
import CartItems from './cart-items/CartItems';
import Button from '../button/Button';

// Actions
import { removeAll } from '../../../store/cartSlice';
import { toggleCartIsOpen } from '../../../store/uiSlice';

// Utils
import calculateCost from '../../../utils/calculateCost';

const Cart = () => {
	const { cart } = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const { total } = calculateCost(cart);

	return (
		<section className={styles.cart} data-testid="cart">

			<div className={styles.top}>
				<h2 className='heading-6'>{`cart (${cart.length})`}</h2>
				{cart.length > 0 && <button className={classNames(styles.remove, 'paragraph')} onClick={() => dispatch(removeAll())}>Remove all</button>}
			</div>

			<CartItems where='cart'/>

			<div className={styles.totalContainer}>
				<p className={classNames(styles.totalText, 'paragraph')}>Total</p>
				<p className={styles.total}>{total}</p>
			</div>

			{
				cart.length > 0 &&
				<Button 
					type="link"
					btnStyle="button2"
					color="orange"
					to="checkout"
					title="checkout"
					onClick={() => dispatch(toggleCartIsOpen())}
				/>
			}

		</section>
	);
};

export default Cart;