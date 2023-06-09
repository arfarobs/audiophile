import PropTypes from 'prop-types';
import classNames from 'classnames';

// CSS
import styles from './Loading.module.css';

import headphones from '../../../assets/images/logo192.png'; 

const Loading = ({ purpose }) => {
	return (
		<section className={classNames(styles.section, styles[purpose])} data-testid={'loadingSection'}>
			<img className={styles.img} src={headphones} alt="Loading please wait." />
			{purpose === 'submit' && <h1 className={classNames('heading-1', styles.h1)}>Submitting</h1>}
		</section>
	);
};

Loading.propTypes = {
	purpose: PropTypes.string.isRequired
};

export default Loading;