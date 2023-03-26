import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClwul1vE1H-aRF4XO1xjUAj0deK2DKEKE",
  authDomain: "studentapp-2ba13.firebaseapp.com",
  projectId: "studentapp-2ba13",
  storageBucket: "studentapp-2ba13.appspot.com",
  messagingSenderId: "66413962867",
  appId: "1:66413962867:web:1b8c2553bfeca57cb9ec06",
  measurementId: "G-GSD7W7V7LK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
