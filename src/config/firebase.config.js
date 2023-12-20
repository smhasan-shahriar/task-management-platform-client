// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4g153rTqDFLP7T9PNmhGh5LKqedPBDMc",
  authDomain: "task-management-platform-8a176.firebaseapp.com",
  projectId: "task-management-platform-8a176",
  storageBucket: "task-management-platform-8a176.appspot.com",
  messagingSenderId: "526357986644",
  appId: "1:526357986644:web:fa89ef4a77188591dd5cc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 