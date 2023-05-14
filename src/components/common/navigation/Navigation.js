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
		<nav className={styles[where]} aria-label={`${where} page navigation`}>
			<ul className={styles.navList}>
				{links.map(({to, title}) => (
					<li key={title}>
						<NavLink className={styles.link} to={to} onClick={handleClick}>{title}</NavLink>
					</li>
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