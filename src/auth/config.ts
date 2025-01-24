import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBbQg3O7SjC10U_lB0PF3oYp5l5JelUUbQ',
  authDomain: 'material-kit-72dfc.firebaseapp.com',
  projectId: 'material-kit-72dfc',
  storageBucket: 'material-kit-72dfc.firebasestorage.app',
  messagingSenderId: '895920943992',
  appId: '1:895920943992:web:a02bfca8660483a32d8e8d',
  measurementId: 'G-QXQ8ETFE8J',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
