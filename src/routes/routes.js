import { 
	createBrowserRouter, 
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

//   Pages
import Home from '../components/pages/home/Home';
import Category from '../components/pages/category/Category';
import Product from '../components/pages/product/Product';
import Checkout from '../components/pages/checkout/Checkout';
import NotFound from '../components/common/not-found/NotFound';

//   Layouts
import RouteLayout from '../components/layouts/RouteLayout';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RouteLayout />}>
			<Route index element={<Home />} />
			<Route path="category/:category" element={<Category />} />
			<Route path="category/:category/product-details/:product" element={<Product />} />
			<Route path="checkout" element={<Checkout />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default router;