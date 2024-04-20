



import {
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBU67cget9nnH918wuhmQiX1E0y42ZedqE",
  authDomain: "spck-web-intentsive.firebaseapp.com",
  databaseURL: "https://spck-web-intentsive-default-rtdb.firebaseio.com",
  projectId: "spck-web-intentsive",
  storageBucket: "spck-web-intentsive.appspot.com",
  messagingSenderId: "682430296120",
  appId: "1:682430296120:web:6b793db2b52e5cb8e236cd",
  measurementId: "G-733ERTEJ9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 




