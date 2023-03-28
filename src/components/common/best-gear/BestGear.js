import classNames from 'classnames';

// CSS
import styles from './BestGear.module.css';

// Images
import mobileImage from '../../../assets/images/shared/mobile/image-best-gear.jpg';
import tabletImage from '../../../assets/images/shared/tablet/image-best-gear.jpg';
import desktopImage from '../../../assets/images/shared/desktop/image-best-gear.jpg';

const BestGear = () => {
	return ( 
		<article className={styles.bestGear}>
			<picture className={classNames(styles.picture, 'picture-radius')}>
				<source media='(min-width: 1440px)' srcSet={desktopImage} />
				<source media='(min-width: 768px)' srcSet={tabletImage} />
				<source media='(max-width: 767px)' srcSet={mobileImage} />
				<img className={styles.image} src={mobileImage} alt="A man wearing the XX99 mark 2 headphones." />
			</picture>
			<div className={styles.text}>
				<h3 className={classNames(styles.h3, 'heading-2')}>Bringing you the 
					<span className={styles.bestSpan}> best</span> 
					<span className={styles.tabletSpan}> audio gear</span>
				</h3>
				<p className={classNames(styles.about, 'paragraph')}>
					Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
					earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
					rooms available for you to browse and experience a wide range of our products. Stop by our store 
					to meet some of the fantastic people who make Audiophile the best place to buy your portable 
					audio equipment.
				</p>
			</div>
		</article>
	);
};

export default BestGear;