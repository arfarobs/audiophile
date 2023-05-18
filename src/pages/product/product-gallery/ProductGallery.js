import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './ProductGallery.module.css';

const ProductGallery = ({gallery, name}) => {
	return (
		<section data-testid="productGallerySection">

			<ul className={styles.list}>

				{gallery.map(({mobile, tablet, desktop}, index) => (
					<li className={styles[`li${index}`]} key={index}>
						<picture className={classNames('picture-radius', styles.picture)}>
							<source media='(min-width: 1440px)' srcSet={desktop} />
							<source media='(min-width: 768px)' srcSet={tablet} />
							<source media='(max-width: 767px)' srcSet={mobile} />
							<img className={styles.image} src={mobile} alt={name} />
						</picture>
					</li>
				))}

			</ul>

		</section>
	);
};

ProductGallery.propTypes = {
	gallery: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired
};

export default ProductGallery;