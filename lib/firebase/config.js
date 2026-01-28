// /lib/firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJTIv_qOchLt9a_MGhKBDzwQtho5WvkPk",
  authDomain: "portfolio-242c0.firebaseapp.com",
  projectId: "portfolio-242c0",
  storageBucket: "portfolio-242c0.firebasestorage.app",
  messagingSenderId: "505340186946",
  appId: "1:505340186946:web:4d3169cccf4cdee0aaf8db",
  measurementId: "G-PJSFBLEB6F",
};

// Prevent re-init when Next.js hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
