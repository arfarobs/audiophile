import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './Product.module.css';

// Components
import Button from '../../components/common/button/Button';
import ProductBrief from './product-brief/ProductBrief';
import ProductFeatures from './product-features/ProductFeatures';
import ProductGallery from './product-gallery/ProductGallery';
import Recommendations from './recommendations/Recommendations';
import NotFound from '../../components/common/not-found/NotFound';
import Loading from '../../components/common/loading/Loading';

// Actions
import { addToCart } from '../../store/cartSlice';
import { setIsLoading, toggleShowMessage } from '../../store/uiSlice';

// Firebase
import { getProductById } from '../../firebase/product';

// Util Functions
import { getProductName } from './utils/getProductName';
import { sortGalleryArray } from './utils/sortGalleryArray';

// Component
const Product = () => {
	const [productData, setProductData] = useState(null);
	const [notFound, setNotFound] = useState(false);

	const { isLoading } = useSelector(state => state.ui);
	const quantity = useSelector(state => state.product.productQuantity);
	const isSignedIn = useSelector(state => state.user.isSignedIn);

	const { product, category } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = (id) => {
			dispatch(setIsLoading(true));
			getProductById(id).then((response) => {
				if (!response) {
					setNotFound(true);
				} else {
					setProductData(response);
				}
				setTimeout(() => {
					dispatch(setIsLoading(false));
				}, 400);
			});
		};
		getData(product);
	}, [product, dispatch]);

	const { image, new: newProduct, name, description, price, features, includes, gallery, others, cartImage } = productData || {};

	const createCartItem = () => {
		const productToAdd = {
			cartThumbnail: cartImage,
			productName: getProductName(name),
			price: price,
			quantity: quantity
		};

		return productToAdd;
	};

	const handleAddToCart = () => {
		if (isSignedIn) {
			dispatch(addToCart(createCartItem()));
		} else {
			dispatch(toggleShowMessage('addToCartSignIn'));
		}
	};

	return (
		<>
			{isLoading && <Loading purpose="loading" />}
			{notFound && <NotFound />}
			{productData && (
				<>
					<article className={styles.article}>

						<Button 
							type="link"
							btnStyle="goBack"
							to={`/category/${category}`}
							title="Go Back"
						/>

						<ProductBrief 
							image={image}
							newProduct={newProduct}
							name={name}
							description={description}
							price={price}
							onClick={() => handleAddToCart()}
						/>

						<ProductFeatures 
							features={features} 
							includes={includes} 
						/>
						
						<ProductGallery gallery={sortGalleryArray(gallery)} name={name} />

					</article>

					<Recommendations 
						items={others}
					/>

				</>
			)}
		</>
	);
};

export default Product;