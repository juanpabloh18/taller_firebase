// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzfFE5OAsqa979VH2BQSOBAhhOJvbMLF0",
  authDomain: "tallercrud-8b593.firebaseapp.com",
  projectId: "tallercrud-8b593",
  storageBucket: "tallercrud-8b593.appspot.com",
  messagingSenderId: "625360534194",
  appId: "1:625360534194:web:662ef3876d2aadd13e67ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };