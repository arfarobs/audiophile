import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// CSS
import styles from './Error.module.css';

//Components
import Button from '../../../common/button/Button';

// Actions
import { toggleShowSubmissionError } from '../../../../store/uiSlice';

const Error = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			dispatch(toggleShowSubmissionError());
		};
	});

	return (
		<section className={styles.section}>
			<h1 className="heading-1">Uh Oh</h1>
			<p className={classNames(styles.message, 'paragraph')}>
				We&apos;re sorry, but we were unable to process your order at this time. Please check your internet connection and try again later. 
				If the problem persists, please contact our customer support team (arthurrobertswork@outlook) for assistance. 
				Thank you for your patience and understanding.
			</p>
			<Button 
				type="button"
				btnStyle="button1"
				color="orange"
				title="Okay"
				onClick={() => navigate(0)}
			/>
		</section>
	);
};

export default Error;