import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// CSS
import styles from './NavItem.module.css';

// Images
import iconArrowRight from '../../../assets/images/shared/desktop/icon-arrow-right.svg';

const NavItem = ({link: {to, title, thumbnail, width, height}, handleClick}) => {
	return (
		<li className={styles.li}>
			<NavLink to={to} onClick={handleClick} className={styles.link}>
				<img
					className={classNames(styles.thumbnail, styles[title[0].toLowerCase() + title.slice(1) + 'Thumbnail'])}
					width={width}
					height={height}
					src={thumbnail}
					alt={title}
				/>
				<div className={styles.grayDiv}>
					<p className={styles.titleParagraph}>{title}</p>
					<div className={styles.shopDiv}>
						<p className={styles.shopParagraph}>Shop</p>
						<img
							className={styles.iconArrowRight}
							src={iconArrowRight}
							width="8"
							height="12"
							alt="right arrow"
						/>
					</div>
				</div>
			</NavLink>
		</li>
	);
};

NavItem.propTypes = {
	handleClick: PropTypes.func,
	link: PropTypes.shape({
		to: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		width: PropTypes.number,
		height: PropTypes.number
	}).isRequired,
};

export default NavItem;

