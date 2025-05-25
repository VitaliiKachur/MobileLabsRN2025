import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIx6_to78B7SC0nrFR185AJLPxDcxI428",
  authDomain: "authapp-c71a7.firebaseapp.com",
  projectId: "authapp-c71a7",
  storageBucket: "authapp-c71a7.firebasestorage.app",
  messagingSenderId: "1085392171558",
  appId: "1:1085392171558:web:fda8ce467944bdcf356ce7"
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestoreDb = getFirestore(firebaseApp);

export { firebaseAuth, firestoreDb };