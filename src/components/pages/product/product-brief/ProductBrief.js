import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './ProductBrief.module.css';

// Components
import Quantity from '../../../common/quantity/Quantity';
import Button from '../../../common/button/Button';

const ProductBrief = ({image, newProduct, name, description, price, onClick}) => {
	return (
		<section className={styles.section}>

			<picture className={classNames(styles.picture, 'picture-radius')}>
				<source media='(min-width: 1440px)' srcSet={image.desktop} />
				<source media='(min-width: 768px)' srcSet={image.tablet} />
				<source media='(max-width: 767px)' srcSet={image.mobile} />
				<img className={styles.image} src={image.mobile} alt={name} />
			</picture>

			<div className={styles.right}>
				{newProduct && <h4 className={classNames(styles.newProduct, 'new-product')}>new product</h4>}
				<h1 className={classNames(newProduct ? styles.newH1 : styles.h1, 'heading-3')}>
					{name.split(' ').slice(0, -1).join(' ')}
					<span className='title-span'>{name.split(' ').slice(-1).join(' ')}</span>
				</h1>
				<p className={classNames(styles.description, 'paragraph')}>{description}</p>
				<p className={classNames(styles.price, 'heading-6')}>{`$ ${Number(price).toLocaleString('en-US')}`}</p>
				<div className={styles.cartDiv}>
					<Quantity where="product" />
					<Button 
						type="button" 
						btnStyle="button1"
						color="orange" 
						title="Add To Cart" 
						onClick={onClick}
					/>
				</div>
			</div>

		</section>
	);
};

ProductBrief.propTypes = {
	image: PropTypes.object.isRequired,
	newProduct: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default ProductBrief;