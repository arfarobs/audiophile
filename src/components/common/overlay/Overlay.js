import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// CSS
import styles from './Overlay.module.css';

// Actions
import { toggleCartIsOpen, toggleMenuIsOpen } from '../../../store/uiSlice';

const Overlay = () => {
	const { menuIsOpen, cartIsOpen, showConfirmation, showInvalidMessage, showSubmissionError } = useSelector(state => state.ui);
	const dispatch = useDispatch();

	const handleOverlayClick = () => {
		menuIsOpen && dispatch(toggleMenuIsOpen());
		cartIsOpen && dispatch(toggleCartIsOpen());
	};

	return (
		<div 
			className={classNames(
				styles.overlay, 
				{[styles.show]: menuIsOpen || cartIsOpen || showConfirmation || showInvalidMessage || showSubmissionError})} 
			onClick={handleOverlayClick}
			data-testid="overlay"
		>
		</div>
	);
};

export default Overlay;