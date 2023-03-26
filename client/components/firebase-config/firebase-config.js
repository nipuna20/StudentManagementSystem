import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
apiKey: "AIzaSyDRrkdDjdQ7vRSatiLS4CHTDbl46oshuRk",
  authDomain: "students-d3da5.firebaseapp.com",
  projectId: "students-d3da5",
  storageBucket: "students-d3da5.appspot.com",
  messagingSenderId: "748210407697",
  appId: "1:748210407697:web:7a3e11c87e72c7dd6ea4b0",
  measurementId: "G-EWHMZ8ZJ0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
