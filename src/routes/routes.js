import { 
	createBrowserRouter, 
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

//   Pages
import Home from '../pages/home/Home';
import Category from '../pages/category/Category';
import Product from '../pages/product/Product';
import Checkout from '../pages/checkout/Checkout';
import NotFound from '../components/common/not-found/NotFound';

//   Layouts
import RouteLayout from '../components/layouts/RouteLayout';

export const routerConfig = createRoutesFromElements(
	<Route path="/" element={<RouteLayout />}>
		<Route index element={<Home />} />
		<Route path="category/:category" element={<Category />} />
		<Route path="category/:category/product-details/:product" element={<Product />} />
		<Route path="checkout" element={<Checkout />} />
		<Route path="*" element={<NotFound />} />
	</Route>
);

const router = createBrowserRouter(
	routerConfig,
);

export default router;