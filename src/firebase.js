// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSubqfEg8re6_yaO45Aj_T59XQZTEF1IE",
  authDomain: "data-vis-f66f5.firebaseapp.com",
  projectId: "data-vis-f66f5",
  storageBucket: "data-vis-f66f5.appspot.com",
  messagingSenderId: "454987217537",
  appId: "1:454987217537:web:5549a17ab5eb01cbe6eb80",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
