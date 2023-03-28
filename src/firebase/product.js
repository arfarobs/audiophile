import { db } from './firebase';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

const productsCollection = collection(db, 'products');

const getProductById = async (id) => {
	const docRef = doc(productsCollection, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return false;
	}
};

const getProductsByCategory = async (category) => {
	const q = query(productsCollection, where('category', '==', category), orderBy('new', 'desc'));

	const querySnapshot = await getDocs(q);

	return querySnapshot;
};

export { getProductById, getProductsByCategory };