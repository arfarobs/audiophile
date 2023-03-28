import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// CSS
import styles from './CategoryNav.module.css';

// Actions
import { toggleMenuIsOpen } from '../../../store/uiSlice';

// Components
import NavItem from '../nav-item/NavItem';



const CategoryNav = ({where, links}) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		if (where === 'menu') {
			dispatch(toggleMenuIsOpen());
		}
	};

	return (
		<nav className={classNames(styles.categoryNav, styles[where])} >
			<ul className={styles.list}>

				{links.map(link => (
					<NavItem link={link} key={link.title} handleClick={handleClick} />
				))}

			</ul>
		</nav>
	);
};

CategoryNav.propTypes = {
	where: PropTypes.string.isRequired,
	links: PropTypes.array.isRequired
};

export default CategoryNav;