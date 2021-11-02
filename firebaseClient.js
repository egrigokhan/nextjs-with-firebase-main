import firebase from "firebase";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC6och7jIuX9T71t9yfgw6TZUOs938tIzY",
  authDomain: "shil-me.firebaseapp.com",
  projectId: "shil-me",
  storageBucket: "shil-me.appspot.com",
  messagingSenderId: "1069137458327",
  appId: "1:1069137458327:web:5739a50e575e283609a5d2",
  measurementId: "G-PTNKBF40YH"
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
