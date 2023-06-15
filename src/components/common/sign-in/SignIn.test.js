import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import { signInWithEmail, signUpWithEmail, oAuthSignIn } from '../../../firebase/firebaseAuth';
import * as firebase from 'firebase/auth';

import SignIn from './SignIn';

const mockStore = configureStore();

jest.mock('../../../firebase/firebaseAuth', () => ({
	signUpWithEmail: jest.fn(),
	signInWithEmail: jest.fn(),
	oAuthSignIn: jest.fn(),
	resendVerificationEmail: jest.fn()
}));

jest.mock('firebase/auth', () => ({
	...jest.requireActual('firebase/auth'),
	onAuthStateChanged: jest.fn(),
	auth: jest.fn(() => ({
		currentUser: { emailVerified: true }
	}))
}));

const renderSignIn = (isSignedIn = false) => {
	const store = mockStore({
		ui: {
			menuIsOpen: false,
			cartIsOpen: false,
		},
		user: {
			isSignedIn
		}
	});

	store.dispatch = jest.fn();

	return{
		...render(
			<Provider store={store}>
				<SignIn />
			</Provider>
		),
		store
	};
};

describe('rendering', () => {
	it('renders without crashing', () => {
		renderSignIn();

		const signInContainer = screen.getByTestId('signInContainer');

		expect(signInContainer).toBeInTheDocument();
	});

	it('should render the successful sign in message when isSignedIn = true', () => {
		renderSignIn(true);

		const successfulSignInMessage = screen.getByText('You have successfully signed in!');
		const confirmationBtn = screen.getByRole('button', { name: 'Okay' });

		expect(successfulSignInMessage).toBeInTheDocument();
		expect(confirmationBtn).toBeInTheDocument();
	});
});

describe('input value changes', () => {
	it('updates email and password values correctly', async () => {
		const user = userEvent.setup();

		renderSignIn();

		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });
		
		await user.click(signInWithEmailBtn);

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');

		await user.type(emailInput, 'test@test.com');
		await user.type(passwordInput, 'password');

		expect(emailInput.value).toBe('test@test.com');
		expect(passwordInput.value).toBe('password');
	});
});

describe('email validation', () => {
	it('shows an error message for invalid email', async () => {
		const user = userEvent.setup();

		renderSignIn();

		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });
		await user.click(signInWithEmailBtn);

		const emailInput = screen.getByPlaceholderText('Email');

		await user.type(emailInput, 'invalid-email');
		act(() => {
			emailInput.blur();
		});

		const errorMessage = await screen.findByText('Please enter a valid email address');

		expect(errorMessage).toBeInTheDocument();
	});

	it('does not show an error message for valid email', async () => {
		const user = userEvent.setup();

		renderSignIn();

		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });
		await user.click(signInWithEmailBtn);

		const emailInput = screen.getByPlaceholderText('Email');

		await user.type(emailInput, 'test@test.com');
		act(() => {
			emailInput.blur();
		});

		const errorMessage = screen.queryByText('Please enter a valid email address');

		expect(errorMessage).not.toBeInTheDocument();
	});
});

describe('password validation', () => {
	it('shows an error message for password less than 8 characters', async () => {
		const user = userEvent.setup();

		renderSignIn();

		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });
		await user.click(signInWithEmailBtn);

		const passwordInput = screen.getByPlaceholderText('Password');

		await user.type(passwordInput, 'short');
		act(() => {
			passwordInput.blur();
		});

		const errorMessage = await screen.findByText('Password must be at least 8 characters long');

		expect(errorMessage).toBeInTheDocument();
	});

	it('does not show an error message for password of 8 characters or more', async () => {
		const user = userEvent.setup();

		renderSignIn();

		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });
		await user.click(signInWithEmailBtn);

		const passwordInput = screen.getByPlaceholderText('Password');

		await user.type(passwordInput, 'longpassword');
		act(() => {
			passwordInput.blur();
		});

		const errorMessage = screen.queryByText('Password must be at least 8 characters long');

		expect(errorMessage).not.toBeInTheDocument();
	});
});

describe('form submission', () => {
	it('calls the sign-up function when isSignUp is true', async () => {
		const user = userEvent.setup();
	
		renderSignIn();
	
		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });
		await user.click(signInWithEmailBtn);
	
		const toggleSignUpButton = screen.getByRole('button', { name: 'Create account' });
		await user.click(toggleSignUpButton);
	
		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		await user.type(emailInput, 'test@test.com');
		await user.type(passwordInput, 'password');
	
		const submitButton = screen.getByRole('button', { name: 'Sign Up' });
		await user.click(submitButton);
	
		expect(signUpWithEmail).toHaveBeenCalledWith('test@test.com', 'password');
	});
	
	it('calls the sign-in function when isSignUp is false', async () => {
		const user = userEvent.setup();
	
		renderSignIn();
	
		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });
		await user.click(signInWithEmailBtn);
	
		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		await user.type(emailInput, 'test@test.com');
		await user.type(passwordInput, 'password');
	
		const submitButton = screen.getByRole('button', { name: 'Sign In' });
		await user.click(submitButton);
	
		expect(signInWithEmail).toHaveBeenCalledWith('test@test.com', 'password');
	});	
});

describe('OAuth Sign-In', () => {
	it('calls the signInWithGoogle function when Google Sign In button is clicked', async () => {
		const user = userEvent.setup();

		renderSignIn();

		const signInWithGoogleBtn = screen.getByRole('button', { name: 'Google Logo Sign In with Google' });
		await user.click(signInWithGoogleBtn);

		expect(oAuthSignIn).toHaveBeenCalledWith('Google');
	});

	it('calls the signInWithGitHub function when GitHub Sign In button is clicked', async () => {
		const user = userEvent.setup();

		renderSignIn();

		const signInWithGitHubBtn = screen.getByRole('button', { name: 'GitHub Logo Sign In with GitHub' });
		await user.click(signInWithGitHubBtn);

		expect(oAuthSignIn).toHaveBeenCalledWith('GitHub');
	});
});

describe('Sign Up Toggle', () => {
	it('switches the isSignUp state when clicked', async () => {
		const { getByText } = renderSignIn();
		
		const createAccountButton = getByText('Create account');
		userEvent.click(createAccountButton);
		
		expect(await screen.findByText('Already have an account? Sign In')).toBeInTheDocument();

		const signInButton = getByText('Already have an account? Sign In');
		userEvent.click(signInButton);
		
		expect(await screen.findByText('Create account')).toBeInTheDocument();
	});
});

describe('store dicpatches', () => {
	it('should dispatch the signIn action on successful sign-in', async () => {
		signInWithEmail.mockResolvedValueOnce({ emailVerified: true });

		const user = userEvent.setup();
		
		const { store } = renderSignIn();

		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });

		await user.click(signInWithEmailBtn);

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
	
		await user.type(emailInput, 'test@test.com');
		await user.type(passwordInput, 'password');

		const signInBtn = screen.getByRole('button', { name: 'Sign In' });
	
		await user.click(signInBtn);
		
		await act(() => Promise.resolve());
	
		expect(store.dispatch).toHaveBeenCalledWith({type: 'user/signIn'});
	});

	it('should dispatch the toggleShowSignIn action on successful sign-in', async () => {
		const user = userEvent.setup();
		
		const { store } = renderSignIn(true);

		const confirmationBtn = screen.getByRole('button', { name: 'Okay' });

		await user.click(confirmationBtn);

		expect(store.dispatch).toHaveBeenCalledWith({type: 'ui/toggleShowSignIn'});
	});

	it('should not dispatch any actions on an unsucessful sign in', async () => {
		signInWithEmail.mockRejectedValueOnce(new Error('Invalid email or password'));

		const user = userEvent.setup();

		const { store } = renderSignIn();

		const signInWithEmailBtn = screen.getByRole('button', { name: 'Email Icon Sign In with Email' });

		await user.click(signInWithEmailBtn);

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');

		await user.type(emailInput, 'test@test.com');
		await user.type(passwordInput, 'password');

		const signInBtn = screen.getByRole('button', { name: 'Sign In' });

		await user.click(signInBtn);
		
		await act(() => Promise.resolve());

		expect(store.dispatch).not.toHaveBeenCalled();
	});
});

describe('Firebase Auth State Changes', () => {
	beforeEach(() => {
		firebase.onAuthStateChanged.mockClear();
	});

	it('calls onAuthStateChanged when the component mounts', () => {
		renderSignIn();

		expect(firebase.onAuthStateChanged).toHaveBeenCalled();
	});

	it('dispatches signIn when user email is verified', async () => {
		const { store } = renderSignIn();

		const user = { emailVerified: true };
		act(() => {
			firebase.onAuthStateChanged.mock.calls[0][1](user);
		});

		expect(store.dispatch).toHaveBeenCalledWith({ type: 'user/signIn' });
	});
});