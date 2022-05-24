import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc, 
  Firestore
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBz_geUjwuHICkaHQJBHb355Ux9wLAGdIY",
    authDomain: "react-crwn-clothing-db-e23b3.firebaseapp.com",
    projectId: "react-crwn-clothing-db-e23b3",
    storageBucket: "react-crwn-clothing-db-e23b3.appspot.com",
    messagingSenderId: "197231787485",
    appId: "1:197231787485:web:605f99ac0de2d8a10b0a34"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"  //ask customer to choose an google account
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    //snapshot allow us to check if an instance exists in a database
    const userSnapShot = await getDoc(userDocRef);

    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    //if usersnapshot is not exist -> we create & set document
    if(!userSnapShot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      }catch(error){
        console.log('error creating the user ', error.message);
      }
    }    

    return userDocRef;
  }
