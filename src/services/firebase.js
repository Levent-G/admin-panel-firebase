// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // <-- Storage eklendi

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo1ijshvfsU2Vu_zXw7NZbvMZ1BK-R6fI",
  authDomain: "admin-panel-e11cd.firebaseapp.com",
  projectId: "admin-panel-e11cd",
  storageBucket: "admin-panel-e11cd.appspot.com",
  messagingSenderId: "994191246604",
  appId: "1:994191246604:web:e1c74ddf05c362edfa3529",
  measurementId: "G-Z2F71NK0MN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // <-- Storage servisi başlatıldı

// Export
export { auth, db, storage };
