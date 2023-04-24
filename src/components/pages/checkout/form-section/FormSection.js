import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './FormSection.module.css';

// Images
import cashImg from '../../../../assets/images/checkout/icon-cash-on-delivery.svg';

// Components
import Input from '../input/Input';
import PaymentMethodInputs from '../payment-method-inputs/PaymentMethodInputs';

// Actions
import { setPaymentMethod } from '../../../../store/checkoutSlice';



const FormSection = ({legend, inputs, radios}) => {
	const { paymentMethod } = useSelector(state => state.checkout);
	const dispatch = useDispatch();

	return (
		<fieldset className={styles.fieldset}>
			<legend className={styles.legend}>{legend}</legend>
			
			
			{legend !== 'payment details'
				? <div className={styles.inputs}>
					{inputs.map(({ label, name, type, placeholder}) => (
						<Input key={label} name={name} label={label} type={type} placeholder={placeholder} />
					))}
				</div>
				: (
					<>
						<div className={styles.paymentMethod}>
							<h3 className={styles.h3}>Payment method</h3>
							<div className={styles.radios}>
								{radios.map(({name, type, label}) => (
									<div 
										className={paymentMethod === name ? classNames(styles.radioContainer, styles.selected) : styles.radioContainer} 
										key={label}
										onClick={() => dispatch(setPaymentMethod(name))}
										data-testid="radioContainer"
									>
										<Input name={name} label={label} type={type}/>
									</div>
								))}
							</div>
						</div>
						{paymentMethod === 'e-money'
							? (
								<PaymentMethodInputs inputs={inputs} />
							) 
							: (
								<div className={styles.cashContainer}>
									<img src={cashImg} className={styles.cashImg} alt="" data-testid="cashImg"/>
									<p className={classNames(styles.cashMessage, 'paragraph')} data-testid="cashMessage">
											The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives 
											at your residence. Just make sure your address is correct so that your order will not be 
											cancelled.
									</p>
								</div>
							)
						}
					</>
				)
			}

		</fieldset>
	);
};

FormSection.propTypes = {
	legend: PropTypes.string.isRequired,
	inputs: PropTypes.array.isRequired,
	radios: PropTypes.array
};

export default FormSection;