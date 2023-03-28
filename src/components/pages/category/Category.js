import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Loading from '../../common/loading/Loading';
import CategoryHeading from '../../common/category-heading/CategoryHeading';
import ProductOverview from '../../common/product-overview/ProductOverview';
import NotFound from '../../common/not-found/NotFound';

// Firebase
import { getProductsByCategory } from '../../../firebase/product';

// Actions 
import { setIsLoading } from '../../../store/uiSlice';



const Category = () => {
	const category = useLocation().pathname.split('/')[2];
	const [products, setProducts] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const { isLoading } = useSelector(state => state.ui);
	const dispatch = useDispatch();

	console.count('category:');

	useEffect(() => {
		dispatch(setIsLoading(true));
		getProductsByCategory(category).then((response) => {
			if (response.empty) {
				setNotFound(true);
			} else {
				setProducts(response.docs.map((doc) => ({...doc.data()})));
			}
			setTimeout(() => {
				dispatch(setIsLoading(false));
			}, 300);
		});
	}, [category, dispatch]);

	return notFound ? <NotFound /> : (
		<>
			<CategoryHeading category={category} />
			{isLoading && <Loading purpose="loading" />}
			{products.map((product, index) => {
				return ( 
					<ProductOverview 
						src={product.categoryImage} 
						alt={product.name} 
						newProduct={product.new} 
						productName={product.name} 
						productDescription={product.description} 
						key={product.slug} 
						slug={product.slug}
						index={index}
					/>	
				);
			})}			
		</>
	);
};

export default Category;