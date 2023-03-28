import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './Product.module.css';

// Components
import Button from '../../common/button/Button';
import ProductBrief from './product-brief/ProductBrief';
import ProductFeatures from './product-features/ProductFeatures';
import ProductGallery from './product-gallery/ProductGallery';
import Recommendations from './recommendations/Recommendations';
import NotFound from '../../common/not-found/NotFound';
import Loading from '../../common/loading/Loading';

// Actions
import { addToCart } from '../../../store/cartSlice';
import { setIsLoading } from '../../../store/uiSlice';

// Firebase
import { getProductById } from '../../../firebase/product';



const Product = () => {
	const [productData, setProductData] = useState(null);
	const [notFound, setNotFound] = useState(false);
	const { isLoading } = useSelector(state => state.ui);
	const quantity = useSelector(state => state.product.productQuantity);
	const { product, category } = useParams();
	const dispatch = useDispatch();

	console.count('Product:');

	const getProductName = (name) => {
		let productName = name.split(' ').slice(0, -1).join(' ');
		
		if (productName.includes('Mark')) {
			productName = productName.replace('Mark', 'MK');
		}
		return productName;
	};

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

	const sortGalleryArray = () => {
		const galleryArray = Object.entries(gallery).map(([key, value]) => ({ key, ...value }));

		return galleryArray.sort((a, b) => {
			if (a.key < b.key) return -1;
			if (a.key > b.key) return 1;
			return 0;
		});
	};

	const handleAddToCart = () => {
		const productToAdd = {
			cartThumbnail: cartImage,
			productName: getProductName(name),
			price: price,
			quantity: quantity
		};

		return productToAdd;
	};

	return (
		<>
			{notFound && <NotFound />}
			{isLoading && <Loading purpose="loading" />}
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
							onClick={() => dispatch(addToCart(handleAddToCart()))}
						/>

						<ProductFeatures 
							features={features} 
							includes={includes} 
						/>
						
						<ProductGallery gallery={sortGalleryArray()} name={name} />

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