import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// CSS
import styles from './Input.module.css';

// Actions
import { 
	updateName, 
	updateEmail, 
	updateTel, 
	updateAddress, 
	updateZip, 
	updateCity, 
	updateCountry, 
	updateENumber, 
	updatePin 
} from '../../../store/actions';


export const validate = (name, value, type, dispatch) => {
	switch (name) {
	case 'name':
		dispatch(updateName(value, type));
		break;

	case 'email':
		dispatch(updateEmail(value, type));
		break;

	case 'tel':
		dispatch(updateTel(value, type));
		break;

	case 'address':
		dispatch(updateAddress(value, type));
		break;

	case 'zip':
		dispatch(updateZip(value, type));
		break;

	case 'city':
		dispatch(updateCity(value, type));
		break;

	case 'country':
		dispatch(updateCountry(value, type));
		break;

	case 'eNumber':
		dispatch(updateENumber(value, type));
		break;

	case 'pin':
		dispatch(updatePin(value, type));
		break;


	default:
		break;
	}
};



const Input = ({name, label, type, placeholder}) => {
	const { paymentMethod } = useSelector(state => state.checkout);
	const inputsState = useSelector(state => state.checkout[name]);
	const dispatch = useDispatch();

	

	const handleInputChange = (e) => {
		const name = e.target.name;
		const type = e.type;
		const value = type === 'blur' ? e.target.value.trim() : e.target.value;
		if (e.target.type !== 'radio') {
			validate(name, value, type, dispatch);
		}
	};

	const inputProps = {
		className: type === 'radio' ? styles.radio : inputsState.error ? classNames(styles.input, styles.invalidInput) : styles.input,
		type,
		id: name,
		name,
		onChange: handleInputChange,
	};

	return type !== 'radio' ? (
		<label
			className={classNames(styles.label, {[styles.invalidLabel]: inputsState.error}, {[styles.address]: name === 'address'}, {[styles.eNumber]: name === 'eNumber'})}
			htmlFor={name}
		>
			{label}
			{inputsState.error && <span className={styles.errorMessage}>{inputsState.message}</span>}
			<input 
				{...inputProps}
				value={inputsState.value}
				placeholder={placeholder}
				onBlur={handleInputChange}
			/>
		</label>
	) : (
		<>
			<input 
				{...inputProps}
				value={name}
				checked={paymentMethod === name}
			/>
			<label className={styles.radioLabel} htmlFor={name}>{label}</label>
		</>
	);
};

Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired, 
	placeholder: PropTypes.string
};

export default Input;