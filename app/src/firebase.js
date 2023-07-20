import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC_t1ON7QHBb_Ok-Xo-rVj8wIfu8YJJBU4",
  authDomain: "asset-warranty-f6477.firebaseapp.com",
  projectId: "asset-warranty-f6477",
  storageBucket: "asset-warranty-f6477.appspot.com",
  messagingSenderId: "330516463742",
  appId: "1:330516463742:web:104438f1cfe85c5bc8982f",
  measurementId: "G-FGT59EDWKZ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
