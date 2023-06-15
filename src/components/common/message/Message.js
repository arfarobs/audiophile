import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './Message.module.css';

// Components
import Button from '../button/Button';

// Actions
import { toggleShowMessage, toggleShowSignIn } from '../../../store/uiSlice';

const Message = () => {
	const { showMessage } = useSelector(state => state.ui);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const messages = {
		signOutSuccess: 'You have been signed out.',
		signOutError: 'There was an error signing you out. Please try again.',
		addToCartSignIn: 'You must be signed in to add items to your cart.',
		checkoutSignIn: 'You must be signed in to checkout.',
		emptyCartCheckout: 'Your cart is empty. Please add items to your cart before checking out.'
	};

	const handleClick = () => {
		dispatch(toggleShowMessage(false));
		if (showMessage === 'addToCartSignIn' || showMessage === 'checkoutSignIn') {
			dispatch(toggleShowSignIn());
		}
		showMessage === 'emptyCartCheckout' && navigate('/');
	};

	return (
		<section className={styles.section} data-testid="messageContainer">
			<p className={classNames('paragraph', styles.p)}>{messages[showMessage]}</p>
			<Button 
				type="button" 
				btnStyle="button1"
				color="orange" 
				title={showMessage === 'addToCartSignIn' || showMessage === 'checkoutSignIn' ? 'Sign In' : 'Okay'}
				onClick={handleClick}
			/>
		</section>
	);
};

export default Message;