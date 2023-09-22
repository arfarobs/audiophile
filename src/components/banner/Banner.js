import classNames from 'classnames';

//CSS
import styles from './Banner.module.css';

//Images
import mobileBannerImage from '../../assets/images/home/mobile/image-header.webp';
import tabletBannerImage from '../../assets/images/home/tablet/image-header.webp';
import desktopBannerImage from '../../assets/images/home/desktop/image-hero.webp';

// Components
import Button from '../common/button/Button';

const Banner = () => {
	return (
		<section className={styles.banner} data-testid="banner">
			<picture className={styles.picture}>
				<source media='(min-width: 1440px)' srcSet={desktopBannerImage} />
				<source media='(min-width: 768px)' srcSet={tabletBannerImage}/>
				<source media='(max-width: 767px)' srcSet={mobileBannerImage} />
				<img className={styles.image} src={mobileBannerImage} alt="XX99 Mark 2 Headphones" />
			</picture>
			<div className={styles.bannerInfo}>
				<p className={classNames(styles.new, 'new-product')}>New product</p>
				<h1 className={classNames(styles.h1, 'heading-1')}>
					XX99 Mark II 
					<span className='title-span'>
						Headphones
					</span>
				</h1>
				<p className={classNames(styles.about, 'paragraph')}>
					Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
				</p>
				<Button 
					type="link" 
					btnStyle="button1"
					color="orange" 
					to="/category/headphones/product-details/xx99-mark-two-headphones"
					title="See Product"
				/>
			</div>
		</section>
	);
};

export default Banner;