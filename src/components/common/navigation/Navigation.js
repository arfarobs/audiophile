import styles from './Navigation.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = ({links, where, closeMenuIfOpen}) => {
	const { showInvalidMessage } = useSelector(state => state.ui);

	const handleClick = (e) => {
		showInvalidMessage && e.preventDefault();
		closeMenuIfOpen();
	};

	return (
		<nav className={styles[where]}>
			<ul className={styles.navList}>
				{links.map(({to, title}) => (
					<NavLink className={styles.link} to={to} key={title} onClick={handleClick}>{title}</NavLink>
				))}
			</ul>
		</nav>
	);
};

Navigation.propTypes = {
	links: PropTypes.array.isRequired,
	where: PropTypes.string.isRequired,
	closeMenuIfOpen: PropTypes.func
};

export default Navigation;