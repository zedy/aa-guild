// libs
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// utils
import {
  firebaseResponseSuccess,
  firebaseResponseError
} from './firebase-response';

// configs
var firebaseConfig = {
  apiKey: 'AIzaSyAaVNKteh7LJFr5QYXYAQXpkGxFp7GQLU4',
  authDomain: 'adventurers-association.firebaseapp.com',
  projectId: 'adventurers-association',
  storageBucket: 'adventurers-association.appspot.com',
  messagingSenderId: '136905794539',
  appId: '1:136905794539:web:ffa1ed44bdcbb5a1feefae',
  measurementId: 'G-BT558FDD69'
};

firebase.initializeApp(firebaseConfig);

// APIS
const firestoreGetDoc = async collectionRef => {
  const doc = await collectionRef.get().then(object => {
    const data = object.data();

    data.id = object.id;

    return data;
  });

  return doc;
};

const firestoreApiUpdate = async (docType, id, payload = null) => {
  const collectionRef = firestore.doc(`${docType}/${id}`);
  const snapShot = await collectionRef.get();

  if (snapShot.exists) {
    try {
      await collectionRef.update(payload);
      const updatedDoc = await firestoreGetDoc(collectionRef);
      const firestoreResponse = new firebaseResponseSuccess();

      firestoreResponse.payload = updatedDoc;

      return firestoreResponse;
    } catch (err) {
      console.log(err);
      return new firebaseResponseError(err.message);
    }
  }
};

const firestoreApiCreate = async (docType, payload) => {
  const collectionRef = firestore.collection(docType);

  try {
    const response = await collectionRef.add(payload);
    const firestoreResponse = new firebaseResponseSuccess();
    const createdDoc = await firestoreGetDoc(collectionRef.doc(response.id));

    firestoreResponse.payload = createdDoc;

    return firestoreResponse;
  } catch (err) {
    console.log(err);
    return new firebaseResponseError(err.message);
  }
};

const firestoreApiSet = async (docType, id, payload, overwrite = false) => {
  const collectionRef = firestore.doc(`${docType}/${id}`);
  const snapShot = await collectionRef.get();
  const firestoreResponse = new firebaseResponseSuccess();

  if (!snapShot.exists || overwrite) {
    try {
      await collectionRef.set(payload);
      firestoreResponse.payload = { collectionRef: collectionRef };
    } catch (err) {
      console.log(err);
      return new firebaseResponseError(err.message);
    }
  } else {
    firestoreResponse.payload = { collectionRef: collectionRef };
    firestoreResponse.status = 'unchanged';
  }

  return firestoreResponse;
};
//

// Misc
// About us
export const updateAboutUs = async data => {
  if (!data) return new firebaseResponseError().response;

  data.createdAt = firebase.firestore.Timestamp.fromDate(new Date()).toDate();

  const response = await firestoreApiSet('misc', 'aboutus', data, true);

  return sendFirebaseResponse('aboutUsUpdate', response);
};

//

// NEWS
export const createNews = async data => {
  if (!data) return new firebaseResponseError().response;

  data.createdAt = firebase.firestore.Timestamp.fromDate(new Date()).toDate();

  const response = await firestoreApiCreate('news', data);

  return sendFirebaseResponse('createdNews', response);
};

export const updateNews = async (newsId, data) => {
  if (!data && !newsId.length) return new firebaseResponseError().response;

  data.createdAt = firebase.firestore.Timestamp.fromDate(new Date()).toDate();

  const firestoreResponse = await firestoreApiUpdate('news', newsId, data);

  return sendFirebaseResponse('updatedNews', firestoreResponse);
};

// Events
export const eventRegister = async (event, userId, unregistering) => {
  if (!event && !userId.length) return new firebaseResponseError().response;

  let attendees = event.attendees;

  if (unregistering) {
    const index = attendees.indexOf(userId);
    if (index > -1) {
      attendees.splice(index, 1);
    }
  } else {
    attendees.push(userId);
  }

  const payload = {
    attendees: attendees
  };

  const firestoreResponse = await firestoreApiUpdate(
    'events',
    event.id,
    payload
  );

  const message = unregistering ? 'eventUnregister' : 'eventRegister';

  return sendFirebaseResponse(message, firestoreResponse);
};

export const updateEvent = async (eventId, data) => {
  if (!data && !eventId.length) return new firebaseResponseError().response;

  const newDataSet = prepareDataForFirestoreFeildsets(data);
  const firestoreResponse = await firestoreApiUpdate(
    'events',
    eventId,
    newDataSet
  );

  return sendFirebaseResponse('updatedEvent', firestoreResponse);
};

export const createEvent = async data => {
  if (!data) return new firebaseResponseError().response;

  const newDataSet = prepareDataForFirestoreFeildsets(data);
  const response = await firestoreApiCreate('events', newDataSet);

  return sendFirebaseResponse('createdEvent', response);
};

export const updateAttendeesList = async (eventId, list) => {
  if (!eventId.length && !list.length)
    return new firebaseResponseError().response;

  const payload = {
    confirmedAttendees: list
  };

  const firestoreResponse = await firestoreApiUpdate(
    'events',
    eventId,
    payload
  );

  return sendFirebaseResponse('updatedAttendeesList', firestoreResponse);
};
//

// Users
export const updateNewUserFlag = async user => {
  if (!user) return new firebaseResponseError().response;

  const payload = {
    newUser: false
  };

  await firestoreApiUpdate('users', user.id, payload);
};

export const updatePlayerCharacterProfile = async (user, data) => {
  if (!user && !data) return new firebaseResponseError().response;

  const payload = {
    pc: data
  };

  const firestoreResponse = await firestoreApiUpdate('users', user.id, payload);

  return sendFirebaseResponse('updatedCharacter', firestoreResponse);
};

export const updateUserProfile = async (user, data) => {
  if (!user && !data) return new firebaseResponseError().response;

  const payload = {
    ...data
  };

  const firestoreResponse = await firestoreApiUpdate('users', user.id, payload);

  return sendFirebaseResponse('updatedUserProfile', firestoreResponse);
};

export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return new firebaseResponseError().response;

  const { displayName, email } = userAuth;
  const payload = {
    displayName,
    email,
    emailConfirmation: false,
    gamesPlayed: 0,
    createdAt: new Date(),
    characterPic: '',
    profilePic: '',
    pc: [],
    ...otherData
  };

  const firestoreResponse = await firestoreApiSet(
    'users',
    userAuth.uid,
    payload
  );

  return sendFirebaseResponse('updatedCharacter', firestoreResponse);
};

// IMAGE [self contained, for now]
export const imageUpload = async (file, filename, path) => {
  if (!file) return new firebaseResponseError().response;

  const storage = firebase.storage();
  const storageRef = storage.ref();

  await storageRef
    .child('images/' + path + '/' + filename)
    .put(file)
    .then(snapshot => {
      console.log('Uploaded image!');
    });

  const imgUrl = await storageRef
    .child('images/' + path + '/' + filename)
    .getDownloadURL()
    .then(fireBaseUrl => {
      return fireBaseUrl;
    });

  const firestoreResponse = new firebaseResponseSuccess();
  const payload = { imgUrl: imgUrl };

  return sendFirebaseResponse('imageUpload', firestoreResponse, payload);
};
//

// Helper methods
const prepareDataForFirestoreFeildsets = data => {
  const newData = Object.assign({}, data);
  const dateChecker = Number.isNaN(Date.parse(data.date));

  newData.date = firebase.firestore.Timestamp.fromDate(
    dateChecker ? new Date(data.date * 1000) : data.date
  ).toDate();
  newData.geoLocation = new firebase.firestore.GeoPoint(
    data.latitude,
    data.longitude
  );
  newData.confirmedAttendees = [];
  newData.attendees = [];

  delete newData.latitude;
  delete newData.longitude;

  return newData;
};

const sendFirebaseResponse = (message, firestoreResponse, payload) => {
  if (firestoreResponse.status === 'success') {
    firestoreResponse.message = message;
  }

  if (payload) {
    firestoreResponse.payload = payload;
  }

  return firestoreResponse.response;
};
//

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider =
  new firebase.auth.GoogleAuthProvider().setCustomParameters({
    prompt: 'select_account'
  });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
