import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAaVNKteh7LJFr5QYXYAQXpkGxFp7GQLU4",
  authDomain: "adventurers-association.firebaseapp.com",
  projectId: "adventurers-association",
  storageBucket: "adventurers-association.appspot.com",
  messagingSenderId: "136905794539",
  appId: "1:136905794539:web:ffa1ed44bdcbb5a1feefae",
  measurementId: "G-BT558FDD69",
};

firebase.initializeApp(firebaseConfig);

// TODO make bypass for emailConfirmation for googleSignIn

export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShop = await userRef.get();

  if (!snapShop.exists) {
    const { displayName, email, newUser } = userAuth;
    const createdAt = new Date();
    const gamesPlayed = 0;
    const emailConfirmation = false;
    const profilePic = '';
    const pc = [];

    try {
      await userRef.set({
        displayName,
        email,
        emailConfirmation,
        gamesPlayed,
        createdAt,
        profilePic,
        newUser,
        pc,
        ...otherData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const updateNewUserFlag = async (user) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.id}`);
  const snapShop = await userRef.get();

  if (snapShop.exists) {
    try {
      await userRef.update({
        newUser: false 
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

// create collection in firebase
// export const addCollectionAndItems = async (collectionKey, items) => {
//   const collectionRef = firestore.collection(collectionKey);
//   const batch = firestore.batch();

//   items.forEach((item) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, item);
//   });

//   return await batch.commit();
// };

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider =
  new firebase.auth.GoogleAuthProvider().setCustomParameters({
    prompt: "select_account",
  });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
