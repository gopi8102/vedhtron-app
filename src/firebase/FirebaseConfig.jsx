
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBH0DSlb4A_gxqG_dO7RoZCcHb07yqHZa0",
  authDomain: "e-comm-app-f533c.firebaseapp.com",
  projectId: "e-comm-app-f533c",
  storageBucket: "e-comm-app-f533c.firebasestorage.app",
  messagingSenderId: "1063065228126",
  appId: "1:1063065228126:web:3b96786a0d74c6df6fb5cf"
};


const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };