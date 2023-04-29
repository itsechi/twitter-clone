import { db } from './firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';

export const getUserFromQuery = async (username) => {
  const userQuery = query(
    collection(db, 'profiles'),
    where('username', '==', username)
  );
  const querySnapshot = await getDocs(userQuery);
  const user = querySnapshot.docs[0];
  return user;
};
