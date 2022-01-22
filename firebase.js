// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYqdMo2D7E8Nw9dorbI8aJHnMp4LxitUc",
  authDomain: "bespeak-development.firebaseapp.com",
  projectId: "bespeak-development",
  storageBucket: "bespeak-development.appspot.com",
  messagingSenderId: "425255547348",
  appId: "1:425255547348:web:19ba806b45814bdd636641",
  measurementId: "G-71Q68G6YH7"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const db = firebase.firestore()
const auth = firebase.auth()
//const analytics = getAnalytics(app);

export { auth };
