import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// CSS
import styles from './Header.module.css';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useScrollDirection } from '../../../hooks/useScrollDirection.js';

//Actions
import { toggleCartIsOpen, toggleMenuIsOpen, toggleShowMessage, toggleShowSignIn } from '../../../store/uiSlice';
import { signIn, signOut } from '../../../store/userSlice';

//Components
import { NavLink, useLocation } from 'react-router-dom';
import CategoryNav from '../category-nav/CategoryNav';
import Button from '../button/Button';

//Images
import hamburger from '../../../assets/images/shared/tablet/icon-hamburger.svg';
import cart from '../../../assets/images/shared/desktop/icon-cart.svg';
import Navigation from '../navigation/Navigation';

// Firebase
import { auth } from '../../../firebase/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';


const Header = ({links, links: [homeLink, ...categoryLinks], testLocation}) => {
	const { 
		menuIsOpen, 
		cartIsOpen, 
		showConfirmation, 
		showInvalidMessage, 
		showSignIn,
		showMessage
	} = useSelector(state => state.ui);
	const isSignedIn = useSelector(state => state.user.isSignedIn);
	const [user, setUser] = useState(null);

	const dispatch = useDispatch();
	const scrollDirection = useScrollDirection();
	const location = testLocation || useLocation().pathname;

	const closeMenuIfOpen = () => {
		menuIsOpen && dispatch(toggleMenuIsOpen());
		cartIsOpen && dispatch(toggleCartIsOpen());
		showSignIn && dispatch(toggleShowSignIn());
	};

	const handleDivClick = (e) => {
		e.target.tagName === 'DIV' && closeMenuIfOpen();
	};

	const handleLogoClick = (e) => {
		if (showInvalidMessage || showMessage) {
			e.preventDefault();
		} else {
			closeMenuIfOpen();
		}
	};

	const handleSignOut = async () => {
		try {
			await firebaseSignOut(auth);
			dispatch(signOut());
			dispatch(toggleShowMessage('signOutSuccess'));
		} catch (error) {
			dispatch(toggleShowMessage('signOutError'));
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(signIn());
				setUser(user);
			} else {
				dispatch(signOut());
				setUser(null);
			}
		});
	
		return () => unsubscribe();
	}, [dispatch]);

	return (
		<header className={classNames(styles.header, {[styles.hidden]: scrollDirection === 'down'})}>

			<div className={styles.headerBar} onClick={handleDivClick} data-testid="headerBar">

				<button 
					className={classNames(styles.button, styles.hamburgerBtn)} 
					disabled={showConfirmation || showInvalidMessage || showSignIn || showMessage} 
					onClick={() => dispatch(toggleMenuIsOpen())}
					data-testid="menuBtn"
				>
					<img className={styles.hamburgerIcon} src={hamburger} alt="menu" />
				</button>
				<NavLink className={styles.logo} to={homeLink.to} onClick={handleLogoClick}>
					<img src={homeLink.image} alt="Audiophile logo" />
				</NavLink>

				<Navigation where='header' links={links} closeMenuIfOpen={closeMenuIfOpen}/>
				
				{location !== '/checkout' &&
					<Button
						type="button"
						btnStyle="signInBtn"
						color="orange"
						disabled={showConfirmation || showInvalidMessage || showSignIn || showMessage}
						title={isSignedIn ? 'Sign Out' : 'Sign In'}
						onClick={() => isSignedIn ? handleSignOut() : dispatch(toggleShowSignIn())}
					/>
				}

				<button 
					className={classNames(styles.button, styles.cartBtn)} 
					onClick={() => dispatch(toggleCartIsOpen())} 
					disabled={showConfirmation || showInvalidMessage || showSignIn || showMessage}
					data-testid="cartBtn"
				>
					<img className={styles.cartIcon} src={cart} alt="cart" />
				</button>

			</div>
			
			<div
				className={classNames(styles.menu, {[styles.hiddenMenu]: !menuIsOpen})}
				data-testid="menuContainer"
			>
				<CategoryNav where="menu" user={user} handleSignOut={handleSignOut} links={categoryLinks} testLocation={testLocation} />
			</div>

		</header>
	);
};

Header.propTypes = {
	links: PropTypes.array.isRequired,
	testLocation: PropTypes.string
};

export default Header;