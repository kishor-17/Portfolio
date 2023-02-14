// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqJTJ8OsTa9npv06blQbQoG0mTHrsgGhw",
    authDomain: "portfolio-e6f01.firebaseapp.com",
    projectId: "portfolio-e6f01",
    storageBucket: "portfolio-e6f01.appspot.com",
    messagingSenderId: "1030552690536",
    appId: "1:1030552690536:web:dd89758f5e3a56e6a180dd",
    measurementId: "G-ZE8BRFHVSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export { db };