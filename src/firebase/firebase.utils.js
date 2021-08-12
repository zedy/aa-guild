import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
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

// TODO refactor firebase profile updates functions to reduce duplicate code

// TODO refatctor the response for the firebase update methods to be a object (status, message, reponse)

export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShop = await userRef.get();

  if (!snapShop.exists) {
    const { displayName, email, newUser } = userAuth;
    const createdAt = new Date();
    const gamesPlayed = 0;
    const emailConfirmation = false;
    const profilePic = "";
    const characterPic = "";
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

export const eventRegister = async (event, userId, unregistering) => {
  if (!userId) return false;

  if (!unregistering && event.attendees.includes(userId)) {
    return "already on list";
  }

  const userRef = firestore.doc(`events/${event.id}`);
  const snapShop = await userRef.get();

  let attendees = event.attendees;

  if (unregistering) {
    const index = attendees.indexOf(userId);
    if (index > -1) {
      attendees.splice(index, 1);
    }
  } else {
    attendees.push(userId);
  }

  if (snapShop.exists) {
    try {
      await userRef.update({
        attendees: attendees,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const updatePlayerCharacterProfile = async (user, data) => {
  if (!user) return false;

  const userRef = firestore.doc(`users/${user.id}`);
  const snapShop = await userRef.get();

  if (snapShop.exists) {
    try {
      await userRef.update({
        pc: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const updateUserProfile = async (user, data) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.id}`);
  const snapShop = await userRef.get();

  if (snapShop.exists) {
    try {
      await userRef.update({
        ...data,
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
        newUser: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const imageUpload = async (file, filename, path) => {
  if (!file) return;

  const storage = firebase.storage();
  const storageRef = storage.ref();

  await storageRef
    .child("images/" + path + "/" + filename)
    .put(file)
    .then((snapshot) => {
      console.log(snapshot);
      console.log("Uploaded image!");
    });

  return storageRef
    .child("images/" + path + "/" + filename)
    .getDownloadURL()
    .then((fireBaseUrl) => {
      return fireBaseUrl;
    });
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
