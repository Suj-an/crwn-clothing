import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBIFXvBWR8ClBzcyY9bJ3n5csXHFn8wAFE",
  authDomain: "crwn-db-9eec6.firebaseapp.com",
  databaseURL: "https://crwn-db-9eec6.firebaseio.com",
  projectId: "crwn-db-9eec6",
  storageBucket: "crwn-db-9eec6.appspot.com",
  messagingSenderId: "462791215628",
  appId: "1:462791215628:web:cea9c9cb94d4426f2abc29",
  measurementId: "G-QEN6D91XKN"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  //console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
