import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCurk_XXXZpZ_iR-UlumeWNvtMD7ueqEI",
    authDomain: "login-signup-form-163d6.firebaseapp.com",
    projectId: "login-signup-form-163d6",
    storageBucket: "login-signup-form-163d6.appspot.com",
    messagingSenderId: "655435865142",
    appId: "1:655435865142:web:e7b475ae507b63528a0c97",
    measurementId: "G-7CL1PGTV7L"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };