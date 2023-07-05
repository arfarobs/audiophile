import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

// CSS
import styles from './Overlay.module.css';

// Actions
import { toggleCartIsOpen, toggleMenuIsOpen, toggleShowSignIn } from '../../../store/uiSlice';

const Overlay = ({testLocation}) => {
	const { 
		menuIsOpen, 
		cartIsOpen, 
		showConfirmation, 
		showInvalidMessage, 
		showSubmissionError, 
		showSignIn,
		showMessage,
		isLoading
	} = useSelector(state => state.ui);

	const dispatch = useDispatch();
	const location = testLocation || useLocation().pathname;

	const handleOverlayClick = () => {
		menuIsOpen && dispatch(toggleMenuIsOpen());
		cartIsOpen && dispatch(toggleCartIsOpen());
		showSignIn && dispatch(toggleShowSignIn());
	};

	return (
		<div 
			className={classNames(
				styles.overlay, 
				{[styles.show]: menuIsOpen || cartIsOpen || showConfirmation || showInvalidMessage || showSubmissionError || showSignIn 
					|| showMessage || isLoading && location === '/checkout'})} 
			onClick={handleOverlayClick}
			data-testid="overlay"
		>
		</div>
	);
};

export default Overlay;