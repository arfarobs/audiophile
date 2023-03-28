import PropTypes from 'prop-types';
import classNames from 'classnames';

// CSS
import styles from './CategoryHeading.module.css';

const CategoryHeading = ({category}) => {

	return (
		<>
			<section className={styles.categoryHeading}>
				<h1 className={classNames(styles.heading, 'heading-2')}>{category}</h1>
			</section>
			<div className={styles.headerBackground}></div>
		</>
	);
};

CategoryHeading.propTypes = {
	category: PropTypes.string.isRequired
};

export default CategoryHeading;