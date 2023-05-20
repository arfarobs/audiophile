import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Loading from '../../components/common/loading/Loading';
import CategoryHeading from '../../components/common/category-heading/CategoryHeading';
import ProductOverview from '../../components/common/product-overview/ProductOverview';
import NotFound from '../../components/common/not-found/NotFound';

// Firebase
import { getProductsByCategory } from '../../firebase/product';

// Actions 
import { setIsLoading } from '../../store/uiSlice';



const Category = ({testLocation}) => {
	const category = testLocation || useLocation().pathname.split('/')[2];
	const [products, setProducts] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const { isLoading } = useSelector(state => state.ui);
	const dispatch = useDispatch();

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

Category.propTypes = {
	testLocation: PropTypes.string,
};

export default Category;