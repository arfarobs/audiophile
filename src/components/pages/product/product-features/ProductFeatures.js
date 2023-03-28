import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './ProductFeatures.module.css';

const ProductFeatures = ({features, includes}) => {
	return (
		<section className={styles.section}>

			<div className={styles.left} >
				<h2 className={styles.h2}>Features</h2>
				<pre className={classNames(styles.description, 'paragraph')}>{features}</pre>
			</div>

			<div className={styles.right}>
				<h2 className={styles.h2}>in the box</h2>
				<ul className={styles.list}>
					{includes.map(({item, quantity}) => (
						<li className={styles.li} key={item}>
							<span className={styles.quantity}>{`${quantity}x`}</span>
							<span className={classNames(styles.item, 'paragraph')}>{item}</span>
						</li>
					))}
				</ul>
			</div>

		</section>
	);
};

ProductFeatures.propTypes = {
	features: PropTypes.string.isRequired,
	includes: PropTypes.array.isRequired
};

export default ProductFeatures;