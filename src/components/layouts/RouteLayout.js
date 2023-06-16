import styles from './RouteLayout.module.css';

import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import Header from '../common/header/Header';
import Overlay from '../common/overlay/Overlay';
import Banner from '../banner/Banner';
import CategoryNav from '../common/category-nav/CategoryNav';
import Cart from '../common/cart/Cart';
import BestGear from '../common/best-gear/BestGear';
import Footer from '../common/footer/Footer';
import SignIn from '../common/sign-in/SignIn';
import Message from '../common/message/Message';

// Data
import navigationLinks from '../../data/navigationLinks';




const componentMap = {
	'/': {
		banner: true,
		categoryNavTop: true,
		bestGear: true,
	},
	'/checkout': {}
};

const RouteLayout = () => {
	const { cartIsOpen, showSignIn, showMessage } = useSelector(state => state.ui);
	const location = useLocation();
	const path = location.pathname;
	const { 
		banner, 
		categoryNavTop, 
		categoryNavBottom, 
		bestGear 
	} = componentMap[path] || {bestGear: true, categoryNavBottom: true};

	return(
		<div className={path !== '/' ? styles.moveBodyDown : undefined} data-testid="routeLayoutDiv">
			<ScrollRestoration />
			<Header links={navigationLinks} />
			<Overlay />
			{cartIsOpen && <Cart />}
			{showSignIn && <SignIn />}
			{showMessage && <Message />}
			<main className={path !== '/' ? styles.mainDown: undefined}>
				{banner && <Banner />}
				{categoryNavTop && <CategoryNav where="page" links={navigationLinks.slice(1)} testid="categoryNavTop" />}
				<Outlet />
				{categoryNavBottom && <CategoryNav where="page" links={navigationLinks.slice(1)} testid="categoryNavBottom"/>}
				{bestGear && <BestGear />}
			</main>
			<Footer links={navigationLinks} />
		</div>
	);
};

export default RouteLayout;