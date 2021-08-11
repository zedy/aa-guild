// firebase
import { firestore } from '../firebase/firebase.utils';

// TODO refactor these fetch methods into one dynamic one

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

export const fetchDndData = async () => {
  let data = {};
  const collectionRef = firestore.collection('dnd');
  const snapShop = await collectionRef.get();

  const results1 = snapShop.docs.map(item => {
    return item.data();    
  });

  data.class = results1[0].class;
  data.race = results1[0].race; 

  const snapShop2 = await collectionRef.doc('SreTdEm1OwPrqp7s73dF').collection('subClass').get();

  const results2 = snapShop2.docs.map(item => {
    return item.data();    
  });

  data.subClass = results2[0]; 

  return data;
}