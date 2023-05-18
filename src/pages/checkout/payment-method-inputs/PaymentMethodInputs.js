import PropTypes from 'prop-types';

// CSS
import styles from './PaymentMethodInputs.module.css';

// Components
import Input from '../input/Input';

const PaymentMethodInputs = ({inputs}) => {
	return (
		<div className={styles.inputs}>
			{inputs.map(({label, name, type, placeholder}) => (
				<Input key={label} name={name} label={label} type={type} placeholder={placeholder} />
			))}
		</div>
	);
};

PaymentMethodInputs.propTypes = {
	inputs: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			placeholder: PropTypes.string
		})
	).isRequired
};

export default PaymentMethodInputs;