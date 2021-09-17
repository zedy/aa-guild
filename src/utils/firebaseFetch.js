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

export const fetchAboutUs = async () => {
  const collectionRef = firestore.doc('misc/aboutus');
  const data = await collectionRef.get().then(data => data.data());
  return data;
};

export const fetchBadges = async () => {
  const collectionRef = firestore.doc('misc/badges');
  const data = await collectionRef.get().then(data => data.data());
  return data;
};

export const fetchAllEvents = async () => {
  return fetchAllOfType('events');
};

export const fetchAllNews = async () => {
  return fetchAllOfType('news', { createdAt: 'desc' });
};

export const fetchAllOfType = async (collectionName, order = null) => {
  let snapShot;
  const collectionRef = firestore.collection(collectionName);

  if (order) {
    const keys = Object.keys(order);
    snapShot = await collectionRef.orderBy(keys[0], order[keys[0]]).get();
  } else {
    snapShot = await collectionRef.get();
  }

  const data = snapShot.docs.map(item => {
    let itemData = item.data();
    itemData.id = item.id;

    return itemData;
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
    playerData.id = user.id;

    if (hasOwnProperty.call(playerData, 'pc')) data.push(playerData);
  });

  return data;
};

export const fetchDndData = async () => {
  const collectionRef = firestore.collection('dnd');
  const snapShot = await collectionRef.get();

  const results1 = snapShot.docs.map(item => {
    return item.data();
  });

  const data = Object.assign({}, results1[0]);

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
