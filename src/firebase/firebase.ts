// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
//import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'movie-app-61cba.firebaseapp.com',
  projectId: 'movie-app-61cba',
  storageBucket: 'movie-app-61cba.firebasestorage.app',
  messagingSenderId: '676037651755',
  appId: '1:676037651755:web:2ec03647d71b0b43e0696e',
  measurementId: 'G-W3B1NG6M7E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth();
