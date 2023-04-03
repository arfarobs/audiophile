import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './ProductOverview.module.css';

// Components
import Button from '../button/Button';

const ProductOverview = ({src, alt, newProduct, productName, productDescription, slug, index}) => {
	const productNameTop = productName.split(' ').slice(0, -1).join(' ');
	const productNameBottom = productName.split(' ').slice(-1).join(' ');
	const isOdd = index % 2 !== 0;

	return (
		<section className={styles.productOverview}>
			<picture className={classNames(styles.picture, 'picture-radius')}>
				<source media='(min-width: 1440px)' srcSet={src.desktop} />
				<source media='(min-width: 768px)' srcSet={src.tablet} />
				<source media='(max-width: 767px)' srcSet={src.mobile} />
				<img className={styles.img} src={src.mobile} alt={alt} />
			</picture>
			<div className={classNames(styles.about, {[styles.odd]: isOdd})} data-testid="productOverviewAboutDiv">
				{newProduct && <h4 className={classNames(styles.newProduct, 'new-product')}>new product</h4>}
				<h2 className={classNames(styles.productName, 'heading-2')}>
					{productNameTop}
					<span className='title-span'>{productNameBottom}</span>
				</h2>
				<p className={classNames(styles.productDescription, 'paragraph')}>{productDescription}</p>
				<Button
					type="link"
					btnStyle="button1"
					color="orange"
					to={`product-details/${slug}`}
					title="See Product"
				/>
			</div>
		</section>
	);
};

ProductOverview.propTypes = {
	src: PropTypes.object.isRequired,
	alt: PropTypes.string.isRequired,
	newProduct: PropTypes.bool.isRequired,
	productName: PropTypes.string.isRequired,
	productDescription: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

export default ProductOverview;