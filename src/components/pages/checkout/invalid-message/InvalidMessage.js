import classNames from 'classnames';
import { useDispatch } from 'react-redux';

// CSS
import styles from './InvalidMessage.module.css';

// Components
import Button from '../../../common/button/Button';

// Actions
import { toggleShowInvalidMessage } from '../../../../store/uiSlice';

const InvalidMessage = () => {
	const dispatch = useDispatch();

	return (
		<section className={styles.section} data-testid="invalidMessageSection">
			<h2 className={classNames(styles.h2, 'heading-2')}>Uh Oh!</h2>
			<p className={classNames(styles.p, 'paragraph')}>
				There seem to be some problems with your form. Please double-check that everything is in a valid format, 
				there are no unfilled fields, and that there are no typos.
			</p>

			<Button 
				type="button"
				btnStyle="button1"
				color="orange"
				title="okay"
				onClick={() => dispatch(toggleShowInvalidMessage())}
			/>
		</section>
	);
};

export default InvalidMessage;