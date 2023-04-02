// CSS
import classNames from 'classnames';
import styles from './NotFound.module.css';

const NotFound = () => {
	return (
		<section className={styles.section} data-testid="notFoundSection">
			<h1 className={classNames(styles.h1, 'heading-1')}>Uh oh!</h1>
			<p className="paragraph" data-testid="notFoundParagraph">
				It appears that the page you requested does not exist. Please use the menu below to navigate to
				what you are looking for.
			</p>
		</section>
	);
};

export default NotFound;