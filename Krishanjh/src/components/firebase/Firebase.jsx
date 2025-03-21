import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4EIjmX1D-nEAypQe0v-ur7abBoBiJ9Sg",
  authDomain: "login-c0978.firebaseapp.com",
  projectId: "login-c0978",
  storageBucket: "login-c0978.appspot.com",
  messagingSenderId: "94996974324",
  appId: "1:94996974324:web:13ecb707e827a8bac3eca1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
