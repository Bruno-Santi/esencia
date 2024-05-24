import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCrS3UEmQWYy_c9YaOZ6AKlAGIBBfPoJhY",
  authDomain: "esencia-53f38.firebaseapp.com",
  projectId: "esencia-53f38",
  storageBucket: "esencia-53f38.appspot.com",
  messagingSenderId: "723201692956",
  appId: "1:723201692956:web:2395ab8d0e0c2c0554d6d9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
