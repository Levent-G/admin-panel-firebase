// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo1ijshvfsU2Vu_zXw7NZbvMZ1BK-R6fI",
  authDomain: "admin-panel-e11cd.firebaseapp.com",
  projectId: "admin-panel-e11cd",
  storageBucket: "admin-panel-e11cd.appspot.com",
  messagingSenderId: "994191246604",
  appId: "1:994191246604:web:e1c74ddf05c362edfa3529",
  measurementId: "G-Z2F71NK0MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);