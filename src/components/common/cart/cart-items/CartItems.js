import { useSelector } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './CartItems.module.css';

// Components
import Quantity from '../../quantity/Quantity';

const CartItems = ({where, confirmationCart}) => {
	const cart = confirmationCart ? confirmationCart : useSelector(state => state.cart.cart);
	const [hidden, setHidden] = useState(true);

	const cartList = () => {
		if (cart.length) {
			return (
				<ul className={styles[where]}>
					{cart.map(({productName, cartThumbnail, price, quantity}, index) => (
						<li className={styles.li} key={productName}>
							<div 
								className={classNames(
									index > 0 && hidden === true && where === 'confirmation' ? styles.hidden : styles.item,
									where === 'confirmation' ? styles.confItem : styles.notConfItem,
								)} 
							>
								<div className={styles.info}>
									<img 
										className={where === 'confirmation' ? styles.smallThumbnail : styles.thumbnail} 
										src={cartThumbnail} 
										alt={productName}
									/>
									<div className={styles.text}>
										<p className={styles.name}>{productName}</p>
										<p className={styles.price}>{`$ ${Number(price).toLocaleString('en-US')}`}</p>
									</div>
								</div>
								{
									where === 'cart' 
										? <Quantity 
											where="cart" 
											cartQuantity={quantity} 
											productName={productName} 
										/>
										: <p 
											className={classNames(styles.quantity, {[styles.marginTop] : where !== 'confirmation'})}>
											{`x ${quantity}`}
										</p>
								}
							</div>
							{
								where === 'confirmation' && cart.length > 1 &&
								<div 
									className={index > 0 && hidden === true && where === 'confirmation' ? styles.hidden : styles.line}>
								</div>
							}
						</li>
					))}
					
				</ul>
			);
		} else if (where === 'cart') {
			return <p className={styles.emptyCart}>Oh no! It looks like your cart is empty.</p>;
		}
	};

	const confirmationBtn = () => {
		if (where === 'confirmation' && cart.length > 1) {
			return <button className={styles.otherItems} onClick={() => setHidden(!hidden)}>{hidden ? `and ${cart.length} other item(s)` : 'View less'}</button>;
		}
	};


	return (
		<div className={classNames({[styles.confirmationFlex]: where === 'confirmation'})}>
			{cartList()}
			{confirmationBtn()}
		</div>
	);
};

CartItems.propTypes = {
	where: PropTypes.string,
	confirmationCart: PropTypes.arrayOf(PropTypes.object)
};

export default CartItems;