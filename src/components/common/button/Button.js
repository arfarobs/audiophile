import classNames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import styles from './Button.module.css';

// Components
import { NavLink } from 'react-router-dom';

const Button = ({type, btnStyle, color, to, title, onClick, disabled}) => {

	const attributes = {
		className: classNames(styles[btnStyle], styles[color]),
		to: to,
		onClick: onClick
	};

	return type === 'link' ? (
		<>
			<NavLink 
				{...attributes}
			>
				{title}
			</NavLink>
		</>
	) : (
		<button 
			{...attributes}
			disabled={disabled}
		>{title}</button>
	);
};

Button.propTypes = {
	type: PropTypes.string.isRequired,
	btnStyle: PropTypes.string.isRequired,
	color: PropTypes.string,
	to: PropTypes.string,
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
};

export default Button;