import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// CSS
import styles from './Overlay.module.css';

// Actions
import { toggleCartIsOpen, toggleMenuIsOpen, toggleShowSignIn } from '../../../store/uiSlice';

const Overlay = () => {
	const { 
		menuIsOpen, 
		cartIsOpen, 
		showConfirmation, 
		showInvalidMessage, 
		showSubmissionError, 
		showSignIn,
		showMessage
	} = useSelector(state => state.ui);
	const { formIsSubmitting } = useSelector(state => state.checkout);
	const dispatch = useDispatch();

	const handleOverlayClick = () => {
		menuIsOpen && dispatch(toggleMenuIsOpen());
		cartIsOpen && dispatch(toggleCartIsOpen());
		showSignIn && dispatch(toggleShowSignIn());
	};

	return (
		<div 
			className={classNames(
				styles.overlay, 
				{[styles.show]: menuIsOpen || cartIsOpen || showConfirmation || showInvalidMessage || showSubmissionError || showSignIn || showMessage || formIsSubmitting})} 
			onClick={handleOverlayClick}
			data-testid="overlay"
		>
		</div>
	);
};

export default Overlay;