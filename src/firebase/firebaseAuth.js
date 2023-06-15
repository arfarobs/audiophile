import { 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	sendEmailVerification, 
	signOut, 
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	GithubAuthProvider
} from 'firebase/auth';
import { auth } from './firebase';

export const signUpWithEmail = async (email, password) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password);
	await sendEmailVerification(user);
	await signOut(auth);
};

export const signInWithEmail = async (email, password) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password);
	return user;
};

export const resendVerificationEmail = async (email, password) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password);
	await sendEmailVerification(user);
	await signOut(auth);
};

export const oAuthSignIn = async (providerName) => {
	let provider;
	switch(providerName) {
	case 'Google':
		provider = new GoogleAuthProvider();
		break;
	case 'Facebook':
		provider = new FacebookAuthProvider();
		break;
	case 'GitHub':
		provider = new GithubAuthProvider();
		break;
	default:
		throw new Error(`Unsupported provider: ${providerName}`);
	}

	const result = await signInWithPopup(auth, provider);
	return result.user;
};