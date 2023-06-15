import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// CSS
import styles from './CategoryNav.module.css';

// Actions
import { toggleMenuIsOpen, toggleShowSignIn } from '../../../store/uiSlice';

// Components
import NavItem from '../nav-item/NavItem';
import Button from '../button/Button';


const CategoryNav = ({where, links, testid, user, handleSignOut, testLocation}) => {
	const { showMessage } = useSelector(state => state.ui);

	const dispatch = useDispatch();
	const location = testLocation || useLocation().pathname;

	return (
		<nav 
			className={classNames(styles.categoryNav, styles[where])} 
			data-testid={testid} 
			aria-label={`${where} product category navigation`}
		>
			<ul className={styles.list}>

				{links.map(link => (
					<NavItem 
						link={link} 
						key={link.title} 
						handleClick={where === 'menu' ? () => dispatch(toggleMenuIsOpen()) : undefined} 
					/>
				))}

			</ul>
			{where === 'menu' && location !== '/checkout' ? (
				<Button 
					type="button"
					btnStyle="signInBtnMobile"
					color="orange"
					title={user ? 'Sign Out' : 'Sign In'}
					onClick={() => {
						if (user) {
							handleSignOut();
							dispatch(toggleMenuIsOpen());
						} else {
							!showMessage && dispatch(toggleShowSignIn());
						}
					}}
				/>
			) : null}
		</nav>
	);
};

CategoryNav.propTypes = {
	where: PropTypes.string.isRequired,
	links: PropTypes.array.isRequired,
	testid: PropTypes.string,
	user: PropTypes.object,
	handleSignOut: PropTypes.func,
	testLocation: PropTypes.string
};

export default CategoryNav;