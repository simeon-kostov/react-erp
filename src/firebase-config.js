import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration
const config = {
    apiKey: "AIzaSyDgi6_xCIKBgzFjIMQSJw_hQHFXLBk6qis",
    authDomain: "production-management-passat.firebaseapp.com",
    databaseURL: "https://production-management-passat-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "production-management-passat",
    storageBucket: "production-management-passat.appspot.com",
    messagingSenderId: "1083723939126",
    appId: "1:1083723939126:web:bb97d951a6b98ff7324797"
};

// Initialize Firebase
firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.firestore();

// Update Firestore Settings
db.settings({ timestampsInSnapshots: true })

// Secondary App Reference for new user creation 
export const secondaryApp = firebase.initializeApp(config, "Secondary");
