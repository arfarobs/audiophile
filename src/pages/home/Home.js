import classNames from 'classnames';

// CSS
import styles from './Home.module.css';

//Images
import zx9Mobile from '../../assets/images/home/mobile/image-speaker-zx9.png';
import zx9Tablet from '../../assets/images/home/tablet/image-speaker-zx9.png';
import zx9Desktop from '../../assets/images/home/desktop/image-speaker-zx9.png';
import zx7Mobile from '../../assets/images/home/mobile/image-speaker-zx7.jpg';
import zx7Tablet from '../../assets/images/home/tablet/image-speaker-zx7.jpg';
import zx7Desktop from '../../assets/images/home/desktop/image-speaker-zx7.jpg';
import yx1Mobile from '../../assets/images/home/mobile/image-earphones-yx1.jpg';
import yx1Tablet from '../../assets/images/home/tablet/image-earphones-yx1.jpg';
import yx1Desktop from '../../assets/images/home/desktop/image-earphones-yx1.jpg';

// Components
import Button from '../../components/common/button/Button';

const Home = () => {
	return (
		<>
			<section className={classNames(styles.section, styles.zx9, 'radius')} data-testid="homeSection">
				<picture className={styles.zx9Picture}>
					<source media='(min-width: 1440px)' srcSet={zx9Desktop} />
					<source media='(min-width: 768px)' srcSet={zx9Tablet} />
					<source media='(max-width: 767px)' srcSet={zx9Mobile} />
					<img className={styles.zx9Img} src={zx9Mobile} alt="ZX9 speaker" />
				</picture>
				<div className={styles.zx9Text}>
					<h2 className='heading-1'>ZX9 <span className='title-span'>speaker</span></h2>
					<p className={classNames(styles.zx9P, 'paragraph')}>
						Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
					</p>
					<Button 
						type="link"
						btnStyle="button1"
						color="black"
						to='/category/speakers/product-details/zx9-speaker'
						title="See Product"
					/>
				</div>
			</section>

			<section className={classNames(styles.section, styles.zx7, 'radius')} data-testid="homeSection">
				<picture className={styles.zx7Picture}>
					<source media='(min-width: 1090px)' srcSet={zx7Desktop} />
					<source media='(min-width: 550px)' srcSet={zx7Tablet} />
					<source media='(max-width: 549px)' srcSet={zx7Mobile} />
					<img className={styles.zx7Img} src={zx7Mobile} alt="ZX7 speaker" />
				</picture>
				<div className={styles.zx7Text}>
					<h3 className={classNames(styles.h3, 'heading-4')}>ZX7 speaker</h3>
					<Button 
						type="link"
						btnStyle="button1"
						color="opaque"
						to='/category/speakers/product-details/zx7-speaker'
						title="See Product"
					/>
				</div>
			</section>

			<section className={classNames(styles.section, styles.yx1)} data-testid="homeSection">
				<picture className={classNames(styles.yx1Picture, 'picture-radius')}>
					<source media='(min-width: 1440px)' srcSet={yx1Desktop} />
					<source media='(min-width: 768px)' srcSet={yx1Tablet} />
					<source media='(max-width: 767px)' srcSet={yx1Mobile} />
					<img className={styles.yx1Img} src={yx1Mobile} alt="YX1 earphones" />
				</picture>
				<div className={classNames(styles.yx1Text, 'radius')}>
					<div>
						<h3 className={classNames(styles.h3, 'heading-4')}>YX1 Earphones</h3>
						<Button 
							type="link"
							btnStyle="button1"
							color="opaque"
							to='/category/earphones/product-details/yx1-earphones'
							title="See Product"
						/>
					</div>
				</div>
			</section>

			

		</>
	);
};

export default Home;