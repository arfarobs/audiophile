import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBsds_u3BrNfOQPFpZcUKBbQIYbLQxFR5Q',
	authDomain: 'audiophile-faa70.firebaseapp.com',
	projectId: 'audiophile-faa70',
	storageBucket: 'audiophile-faa70.appspot.com',
	messagingSenderId: '558525668359',
	appId: '1:558525668359:web:1b9ebae49212981b3c9ea2'
};

const app = initializeApp(firebaseConfig);

//Firestore
const db = getFirestore(app);

//Auth
const auth = getAuth(app);

export { db, auth };