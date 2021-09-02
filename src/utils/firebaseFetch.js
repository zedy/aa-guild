// firebase
import { firestore } from '../firebase/firebase.utils';

// TODO refactor these fetch methods into one dynamic one

export const fetchDMList = async () => {
  const collectionRef = firestore.collection('dms');
  const snapShot = await collectionRef.get();

  const data = snapShot.docs.map(dm => {
    return dm.data();
  });

  return data;
};

export const fetchAllEvents = async () => {
  const collectionRef = firestore.collection('events');
  const snapShot = await collectionRef.get();

  const data = snapShot.docs.map(event => {
    let eventData = event.data();
    eventData.id = event.id;

    return eventData;
  });

  return data;
};

export const fetchUser = async userId => {
  const userRef = firestore.doc(`users/${userId}`);
  const data = await userRef.get().then(user => {
    const userData = user.data();
    userData.id = userId;
    return userData;
  });

  return data;
};

export const fetchAllPlayersData = async () => {
  let data = [];
  const collectionRef = firestore.collection('users');
  const snapShot = await collectionRef.orderBy('gamesPlayed', 'desc').get();

  snapShot.docs.forEach(user => {
    const playerData = user.data();

    if (hasOwnProperty.call(playerData, 'pc')) data.push(playerData);
  });

  return data;
};

export const fetchDndData = async () => {
  let data = {};
  const collectionRef = firestore.collection('dnd');
  const snapShot = await collectionRef.get();

  const results1 = snapShot.docs.map(item => {
    return item.data();
  });

  data.class = results1[0].class;
  data.race = results1[0].race;

  const snapShot2 = await collectionRef
    .doc('SreTdEm1OwPrqp7s73dF')
    .collection('subClass')
    .get();

  const results2 = snapShot2.docs.map(item => {
    return item.data();
  });

  data.subClass = results2[0];

  return data;
};
