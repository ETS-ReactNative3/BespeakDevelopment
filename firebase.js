// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app"
import '@react-native-firebase/storage'
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  clientId: '425255547348-lvphp4mp667hst7t4a7tn71sj1ukgumj.apps.googleusercontent.com',
  appId: '1:425255547348:android:f0a39b1a6c310190636641',
  apiKey: 'AIzaSyCGXpsDa2xnakOUd3C7CigGHzwVtTjrEH8',
  storageBucket: 'bespeak-development.appspot.com',
  messagingSenderId: '425255547348',
  projectId: 'bespeak-development',
  databaseURL: 'https://bespeak-development-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const db = app.firestore()
const storage = app.storage()
const auth = firebase.auth()
//const analytics = getAnalytics(app);

export { auth, db, storage};
