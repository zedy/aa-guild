// firebase
import { firestore } from '../firebase/firebase.utils';

export const fetchDMList = async () => {
  const collectionRef = firestore.collection('dms');
  const snapShop = await collectionRef.get();
  
  const data = snapShop.docs.map(dm => {
    return dm.data();
  });
 
  return data;
}