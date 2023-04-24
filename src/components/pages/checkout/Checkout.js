import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './Checkout.module.css';

// Components
import Confirmation from '../../confirmation/Confirmation';
import Button from '../../common/button/Button';
import FormSection from './form-section/FormSection';
import Summary from './summary/Summary';
import Error from './error/Error';
import Loading from '../../common/loading/Loading';

// Actions
import { validateOnSubmit, toggleFormIsSubmitting, addOrder } from '../../../store/checkoutSlice';
import { setIsLoading, toggleConfirmation, toggleShowInvalidMessage, toggleShowSubmissionError } from '../../../store/uiSlice';
import { removeAll } from '../../../store/cartSlice';

// Data
import { billingDetailsInputs, eMoneyInputs, radioInputs, shippingInfoInputs } from '../../../data/inputs';

// Utils
import calculateCost from '../../../utils/calculateCost';
import InvalidMessage from './invalid-message/InvalidMessage';

const Checkout = () => {
	const { cart } = useSelector(state => state.cart);
	const { formIsValid, formIsSubmitting, order } = useSelector(state => state.checkout);
	const { showConfirmation, showInvalidMessage, isLoading, showSubmissionError } = useSelector(state => state.ui);
	const [confirmationMessage, setConfirmationMessage] = useState('');
	const [confirmationCart, setConfirmationCart] = useState([]);

	const cartLengthRef = useRef(cart.length);
	const formIsValidRef = useRef(formIsValid);
	const orderRef = useRef(order);

  

	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.count('Checkout:');

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(setIsLoading(true));
		const formData = new FormData(event.target);
		const checkoutData = Object.fromEntries(formData.entries());
		const cost = calculateCost(cart);
		dispatch(addOrder({cart, checkoutData, cost}));
		dispatch(validateOnSubmit());
		dispatch(toggleFormIsSubmitting());
	};


	useEffect(() => {
		formIsValidRef.current = formIsValid;
		orderRef.current = order;
	}, [formIsValid, order]);

	useEffect(() => {
		if (cartLengthRef.current < 1) {
			window.alert('Oh no! Your cart appears to be empty. Please make sure there is an item in your cart before proceeding to the checkout.');
			navigate('/');
		}
		dispatch(setIsLoading(false));
	}, [navigate, dispatch]);

	useEffect(() => {
		const submitOrder = async () => {
			try {
				const response = await fetch('https://europe-west3-audiophile-faa70.cloudfunctions.net/submitOrder', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(orderRef.current)
				});
				const jsonResponse = await response.json();
				if (response.ok) {
					setConfirmationMessage(jsonResponse.message);
					setConfirmationCart(jsonResponse.cart);
					dispatch(toggleConfirmation());
					dispatch(setIsLoading(false));
					dispatch(removeAll());
				} else if (response.status === 422) {
					dispatch(toggleShowInvalidMessage());
					dispatch(setIsLoading(false));
				} else {
					throw new Error('Error submitting form:' + jsonResponse.error);
				}
			} catch (error) {
				dispatch(toggleShowSubmissionError());
			}
		};
		if (formIsSubmitting) {
			if (formIsValidRef.current) {
				submitOrder(orderRef, formIsValidRef, dispatch);
			} else {
				dispatch(setIsLoading(false));
				dispatch(toggleShowInvalidMessage());
			}
			dispatch(toggleFormIsSubmitting());
		}
	}, [formIsSubmitting, dispatch]);
	

	return (
		<>
			{showConfirmation && <Confirmation cost={order.cost} message={confirmationMessage} cart={confirmationCart} />}
			{showInvalidMessage && <InvalidMessage />}
			{isLoading && <Loading purpose="submit" />}
			{showSubmissionError && <Error />}
			<article className={styles.article}>

				<Button 
					type="button"
					btnStyle="goBack"
					title="Go Back"
					onClick={() => navigate(-1)}
				/>

				<div className={styles.desktopContainer}>
					<section className={styles.formSection}>

						<h1 className={styles.title}>Checkout</h1>

						<form className={styles.form} id="checkout-form" onSubmit={handleSubmit}>

							<FormSection legend="billing details" inputs={billingDetailsInputs} />
							<FormSection legend="shipping info" inputs={shippingInfoInputs} />
							<FormSection legend="payment details" inputs={eMoneyInputs} radios={radioInputs} />

						</form>

					</section>

					<Summary />
				</div>

			</article>
		</>
	);
};

export default Checkout;