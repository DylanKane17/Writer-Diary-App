import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGj2Ioo3rEveh_Pk_SGgR1DRg5lIKhI34",
    authDomain: "firstproject-b2e92.firebaseapp.com",
    databaseURL: "https://firstproject-b2e92-default-rtdb.firebaseio.com",
    projectId: "firstproject-b2e92",
    storageBucket: "firstproject-b2e92.firebasestorage.app",
    messagingSenderId: "662417103667",
    appId: "1:662417103667:web:b3a4c5a71f616a6ba2bc46",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  export {app, auth}