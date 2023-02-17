// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC12VH7eHD8pjBLB7EA3l36lqOw8cXuzsY",
  authDomain: "learnfirebase-1695c.firebaseapp.com",
  projectId: "learnfirebase-1695c",
  storageBucket: "learnfirebase-1695c.appspot.com",
  messagingSenderId: "386845891676",
  appId: "1:386845891676:web:3c3020b53d7e8e13df9a99",
  measurementId: "G-J7NPNVQV25"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);