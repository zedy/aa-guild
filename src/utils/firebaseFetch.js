// firebase
import { firestore } from '../firebase/firebase.utils';

// TODO refactor these fetch methods in one dynamic one

export const fetchDMList = async () => {
  const collectionRef = firestore.collection('dms');
  const snapShop = await collectionRef.get();
  
  const data = snapShop.docs.map(dm => {
    return dm.data();
  });
 
  return data;
}

export const fetchAllEvents = async () => {
  const collectionRef = firestore.collection('events');
  const snapShop = await collectionRef.get();
  
  const data = snapShop.docs.map(event => {
    let eventData = event.data();
    eventData.id = event.id;
    
    return eventData;
  });
 
  return data;
}