import PropTypes from 'prop-types';

// CSS 
import styles from './Recommendations.module.css';

// Components
import Button from '../../../components/common/button/Button';

const Recommendations = ({items}) => {
	return (
		<section className={styles.section} data-testid="recommendationsSection">

			<h3 className={styles.h3}>You may also like</h3>

			<ul className={styles.list}>
				{items.map(({image: {mobile, tablet, desktop}, name, category, slug}) => (
					<li className={styles.li} key={name}>

						<picture className={'picture-radius'}>
							<source media='(min-width: 1440px)' srcSet={desktop} />
							<source media='(min-width: 768px)' srcSet={tablet} />
							<source media='(max-width: 767px)' srcSet={mobile} />
							<img className={styles.image} src={mobile} alt={name} />
						</picture>

						<h5 className={styles.name}>{name}</h5>

						<Button 
							type="link"
							btnStyle="button1" 
							color="orange" 
							to={`/category/${category}/product-details/${slug}`}
							title="See Product"
						/>
						
					</li>
				))}
			</ul>

		</section>
	);
};

Recommendations.propTypes = {
	items: PropTypes.array.isRequired
};

export default Recommendations;