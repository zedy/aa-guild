// libs
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// data
import TOASTR_MESSAGES from "../data/toastr-messages.data";

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

export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  let status = "success"; // default

  if (!snapShot.exists) {
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
        characterPic,
        profilePic,
        newUser,
        pc,
        ...otherData,
      });
    } catch (err) {
      console.log(err);
      status = "error";
    }
  }

  return {
    status: status,
    message:
      status === "error"
        ? TOASTR_MESSAGES.genericError
        : TOASTR_MESSAGES.updatedCharacter,
    userRef: userRef,
  };
};

export const eventRegister = async (event, userId, unregistering) => {
  if (!userId) return false;

  const userRef = firestore.doc(`events/${event.id}`);
  const snapShot = await userRef.get();

  let attendees = event.attendees;
  let status = "success"; // default
  let successMessage = "";

  if (unregistering) {
    const index = attendees.indexOf(userId);
    if (index > -1) {
      attendees.splice(index, 1);
    }
  } else {
    attendees.push(userId);
  }

  if (snapShot.exists) {
    try {
      await userRef.update({
        attendees: attendees,
      });
      successMessage = unregistering
        ? TOASTR_MESSAGES.eventUnregister
        : TOASTR_MESSAGES.eventRegister;
    } catch (err) {
      console.log(err);
      status = "error";
    }
  }

  return {
    status: status,
    message: status === "error" ? TOASTR_MESSAGES.genericError : successMessage,
  };
};

export const updatePlayerCharacterProfile = async (user, data) => {
  if (!user) return false;

  const userRef = firestore.doc(`users/${user.id}`);
  const snapShot = await userRef.get();

  let status = "success"; // default

  if (snapShot.exists) {
    try {
      await userRef.update({
        pc: data,
      });
    } catch (err) {
      console.log(err);
      status = "error";
    }
  }

  return {
    status: status,
    message:
      status === "error"
        ? TOASTR_MESSAGES.genericError
        : TOASTR_MESSAGES.updatedCharacter,
  };
};

export const updateUserProfile = async (user, data) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.id}`);
  const snapShot = await userRef.get();

  let status = "success"; // default

  if (snapShot.exists) {
    try {
      await userRef.update({
        ...data,
      });
    } catch (err) {
      console.log(err);
      status = "error";
    }
  }

  return {
    status: status,
    message:
      status === "error"
        ? TOASTR_MESSAGES.genericError
        : TOASTR_MESSAGES.updatedUserProfile,
  };
};

export const updateNewUserFlag = async (user) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.id}`);
  const snapShot = await userRef.get();

  if (snapShot.exists) {
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

export const createEvent = async (data) => {
  if (!data) return;

  const collectionRef = firestore.collection("events");

  let response = null;
  let status = "success"; // default

  try {
    const newDataSet = prepareDataForFirestoreFeildsets(data);
    response = await collectionRef.add(newDataSet);
  } catch (err) {
    console.log(err);
    status = "error";
  }

  return {
    response: status === "error" ? null : response.id,
    status: status,
    message:
      status === "error"
        ? TOASTR_MESSAGES.genericError
        : TOASTR_MESSAGES.createdEvent,
  };
};

export const updateEvent = async (eventId, data) => {
  const userRef = firestore.doc(`events/${eventId}`);
  const snapShot = await userRef.get();

  let status = "success"; // default

  if (snapShot.exists) {
    try {
      const newDataSet = prepareDataForFirestoreFeildsets(data);
      await userRef.update(newDataSet);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    status: status,
    message:
      status === "error"
        ? TOASTR_MESSAGES.genericError
        : TOASTR_MESSAGES.updatedEvent,
  };
};

export const updateAttendeesList = async (eventId, list) => {
  const userRef = firestore.doc(`events/${eventId}`);
  const snapShot = await userRef.get();

  let status = "success"; // default

  if (snapShot.exists) {
    try {
      await userRef.update({
        confirmedAttendees: list,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    status: status,
    message:
      status === "error"
        ? TOASTR_MESSAGES.genericError
        : TOASTR_MESSAGES.updatedAttendeesList,
  };
};

export const imageUpload = async (file, filename, path) => {
  if (!file) return;

  const storage = firebase.storage();
  const storageRef = storage.ref();

  await storageRef
    .child("images/" + path + "/" + filename)
    .put(file)
    .then((snapshot) => {
      console.log("Uploaded image!");
    });

  const imgUrl = await storageRef
    .child("images/" + path + "/" + filename)
    .getDownloadURL()
    .then((fireBaseUrl) => {
      return fireBaseUrl;
    });

  return {
    status: "success",
    message: TOASTR_MESSAGES.imageUpload,
    imgUrl: imgUrl,
  };
};

const prepareDataForFirestoreFeildsets = (data) => {
  const newData = Object.assign({}, data);
  const dateChecker = Number.isNaN(Date.parse(data.date));

  newData.date = firebase.firestore.Timestamp.fromDate(
    dateChecker ? new Date(data.date * 1000) : data.date
  ).toDate();
  data.geoLocation = new firebase.firestore.GeoPoint(
    data.latitude,
    data.longitude
  );
  newData.confirmedAttendees = [];
  newData.attendees = [];
  delete newData.latitude;
  delete newData.longitude;

  return newData;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider =
  new firebase.auth.GoogleAuthProvider().setCustomParameters({
    prompt: "select_account",
  });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
