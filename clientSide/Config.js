import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDCt_q9aIN7czp4Q-DXkLimo5Sv9EAa_cM",
    authDomain: "journey-to-poland.firebaseapp.com",
    projectId: "journey-to-poland",
    storageBucket: "journey-to-poland.appspot.com",
    messagingSenderId: "230659312476",
    appId: "1:230659312476:web:af6e66d3fc9f7a8340cf99",
    measurementId: "G-LLBV3MMVWM"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase};