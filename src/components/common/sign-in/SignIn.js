import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import styles from './SignIn.module.css';

// Images
import googleIcon from '../../../assets/icons/Google__G__Logo.svg.png';
import githubIcon from '../../../assets/icons/github-mark.svg';
import emailIcon from '../../../assets/icons/email.png';
import closeIcon from '../../../assets/icons/close.png';

// Actions
import { toggleMenuIsOpen, toggleShowSignIn, toggleCartIsOpen } from '../../../store/uiSlice';
import { signIn } from '../../../store/userSlice';

// Firebase
import { signUpWithEmail, signInWithEmail, resendVerificationEmail, oAuthSignIn } from '../../../firebase/firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

const Spinner = () => (
	<svg className={styles.spinner} viewBox="0 0 50 50">
		<circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
	</svg>
);

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [isSignUp, setIsSignUp] = useState(false);
	const [canResend, setCanResend] = useState(false);
	const [countdown, setCountdown] = useState(60);
	const [waitingForVerification, setWaitingForVerification] = useState(false);
	const [loading, setLoading] = useState(false);
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [isSigningInWithEmail, setIsSigningInWithEmail] = useState(false);

	const {menuIsOpen, cartIsOpen} = useSelector(state => state.ui);
	const { isSignedIn } = useSelector(state => state.user);

	const dispatch = useDispatch();

	let timer;

	const handleInputChange = ({ currentTarget: { name, value } }) => {
		if (name === 'userEmail') setEmail(value);
		else if (name === 'userPassword') setPassword(value);
	};

	const startCountdown = () => {
		setCanResend(false);
		setCountdown(60);

		timer = setInterval(() => {
			setCountdown((prevCountdown) => {
				if (prevCountdown <= 1) {
					clearInterval(timer);
					setCanResend(true);
					return 60;
				} else {
					return prevCountdown - 1;
				}
			});
		}, 1000);

		setTimeout(() => {
			setCanResend(true);
		}, 60000);
	};

	const handleSignUp = async () => {
		setLoading(true);
		try {
			await signUpWithEmail(email, password);
			setError('A confirmation email has been sent to your email address. Please verify your email before continuing to sign in.');
			setWaitingForVerification(true);
			setIsSignUp(false);

			startCountdown();
		} catch (error) {
			setError('Error signing up with email and password');
		}
		setLoading(false);
	};
	
	const handleSignIn = async () => {
		setLoading(true);
		try {
			const user = await signInWithEmail(email, password);
			if (!user.emailVerified) {
				setError('Please verify your email before signing in.');
				startCountdown();
				setWaitingForVerification(true);
			} else {
				dispatch(signIn());
			}
		} catch (error) {
			setError('Error signing in with email and password');
		}
		setLoading(false);
	};

	const handleResendEmail = async () => {
		try {
			await resendVerificationEmail(email, password);
			setError('A new confirmation email has been sent to your email address. Please return here to sign in once you have confirmed your email.');

			clearInterval(timer);
			startCountdown();
		} catch (error) {
			setError('Error resending email verification');
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		isSignUp ? handleSignUp() : handleSignIn();
	};

	const handleOAuthSignIn = async (providerName) => {
		setLoading(true);
		try {
			const user = await oAuthSignIn(providerName);
			if (user) { 
				dispatch(signIn()); 
				setError(null); 
			}
		} catch (error) {
			setError(`Error signing in with ${providerName}`);
		}
		setLoading(false);
	};
	

	useEffect(() => {
		if (menuIsOpen) {
			dispatch(toggleMenuIsOpen());
		}
		if (cartIsOpen) {
			dispatch(toggleCartIsOpen());
		}
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user?.emailVerified) {
				dispatch(signIn());
				setError(null);
				setWaitingForVerification(false);
			}
		});

		return () => unsubscribe && unsubscribe();
	}, []);

	useEffect(() => {
		const regex = /\S+@\S+\.\S+/;
		setEmailValid(regex.test(email));
	}, [email]);

	useEffect(() => {
		const valid = password.length >= 8;
		setPasswordValid(valid);
	}, [password]);



	if (isSignedIn) {
		return (
			<section className={styles.auth}>
				<p className="paragraph">You have successfully signed in!</p>
				<button className={styles.button} onClick={() => dispatch(toggleShowSignIn())}>
					Okay
				</button>
			</section>
		);
	} else {
		return (
			<section className={styles.auth} data-testid="signInContainer">
				<img src={closeIcon} alt="Close" className={styles.close} onClick={() => dispatch(toggleShowSignIn())} />
				{!isSigningInWithEmail && (
					<>
						<button type="button" className={styles.signInWithButton} onClick={() => handleOAuthSignIn('Google')} disabled={loading}>
							<img src={googleIcon} alt="Google Logo" className={styles.logo} />
							{isSignUp ? 'Sign Up with Google' : 'Sign In with Google'}
						</button>
						<button type="button" className={styles.signInWithButton} onClick={() => handleOAuthSignIn('GitHub')} disabled={loading}>
							<img src={githubIcon} alt="GitHub Logo" className={styles.logo} />
							{isSignUp ? 'Sign Up with GitHub' : 'Sign In with GitHub'}
						</button>
						<button type="button" className={styles.signInWithButton} onClick={() => setIsSigningInWithEmail(true)} disabled={loading}>
							<img src={emailIcon} alt="Email Icon" className={styles.logo} />
							{isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
						</button>
					</>
				)}
				{error !== null && <p className={styles.error}>{error}</p>}
				{isSigningInWithEmail && (
					<form className={styles.form} onSubmit={handleSubmit}>
						<input
							type="email"
							name="userEmail"
							value={email}
							placeholder="Email"
							id="userEmail"
							onChange={handleInputChange}
							className={styles.input}
							onBlur={() => emailValid ? setError(null) : setError('Please enter a valid email address')}
						/>
						<input
							type="password"
							name="userPassword"
							value={password}
							placeholder="Password"
							id="userPassword"
							onChange={handleInputChange}
							className={styles.input}
							onBlur={() => passwordValid ? setError(null) : setError('Password must be at least 8 characters long')}
						/>
						<button type="submit" className={styles.button} disabled={!emailValid || !passwordValid || loading}>
							{loading ? <Spinner /> : isSignUp ? 'Sign Up' : 'Sign In'}
						</button>

					</form>
				)}

				{waitingForVerification && (
					<>
						<button 
							onClick={handleResendEmail} 
							disabled={!canResend} 
							className={styles.resendButton}
						>
							Resend verification email
						</button>
						{waitingForVerification && <p className="paragraph">Wait {countdown} seconds before resending email</p>}
					</>
				)}

				<button onClick={() => setIsSignUp(!isSignUp)} className={styles.toggleButton}>
					{isSignUp ? 'Already have an account? Sign In' : 'Create account'}
				</button>
				{isSigningInWithEmail && (
					<button 
						onClick={() => {
							setIsSigningInWithEmail(false);
							setError(null);
							setEmail('');
							setPassword('');
						}}
						className={styles.toggleButton}
					>
					Go back
					</button>
				)}
			</section>
		);
	}

	
};

export default SignIn;
