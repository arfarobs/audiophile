import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './Header.module.css';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useScrollDirection } from '../../../utils/useScrollDirection.js';

//Actions
import { toggleCartIsOpen, toggleMenuIsOpen } from '../../../store/uiSlice';

//Components
import { NavLink } from 'react-router-dom';
import CategoryNav from '../category-nav/CategoryNav';

//Images
import hamburger from '../../../assets/images/shared/tablet/icon-hamburger.svg';
import cart from '../../../assets/images/shared/desktop/icon-cart.svg';
import Navigation from '../navigation/Navigation';


const Header = ({links, links: [homeLink, ...categoryLinks]}) => {
	const { menuIsOpen, cartIsOpen, showConfirmation, showInvalidMessage } = useSelector(state => state.ui);

	const dispatch = useDispatch();
	const scrollDirection = useScrollDirection();

	const closeMenuIfOpen = () => {
		menuIsOpen && dispatch(toggleMenuIsOpen());
		cartIsOpen && dispatch(toggleCartIsOpen());
	};

	const handleDivClick = (e) => {
		e.target.tagName === 'DIV' && closeMenuIfOpen();
	};

	const handleLogoClick = (e) => {
		if (showInvalidMessage) {
			e.preventDefault();
		} else {
			closeMenuIfOpen();
		}
	};

	return (
		<header className={classNames(styles.header, {[styles.hidden]: scrollDirection === 'down'})}>

			<div className={styles.headerBar} onClick={handleDivClick} data-testid="headerBar">

				<button className={classNames(styles.button, styles.hamburgerBtn)} disabled={showConfirmation || showInvalidMessage} onClick={() => dispatch(toggleMenuIsOpen())}>
					<img className={styles.hamburgerIcon} src={hamburger} alt="menu" />
				</button>
				<NavLink className={styles.logo} to={homeLink.to} onClick={handleLogoClick}>
					<img src={homeLink.image} alt="Audiophile logo" />
				</NavLink>

				<Navigation where='header' links={links} closeMenuIfOpen={closeMenuIfOpen}/>

				<button className={classNames(styles.button, styles.cartBtn)} onClick={() => dispatch(toggleCartIsOpen())} disabled={showConfirmation || showInvalidMessage}>
					<img className={styles.cartIcon} src={cart} alt="cart" />
				</button>

			</div>
			
			<div
				className={classNames(styles.menu, {[styles.hiddenMenu]: !menuIsOpen})}
				data-testid="menuContainer"
			>
				<CategoryNav where="menu" links={categoryLinks}/>
			</div>

		</header>
	);
};

Header.propTypes = {
	links: PropTypes.array.isRequired
};

export default Header;