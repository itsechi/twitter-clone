import { db } from './firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export const getUserFromQuery = async (username) => {
  const storage = getStorage();

  const userQuery = query(
    collection(db, 'profiles'),
    where('username', '==', username)
  );
  const querySnapshot = await getDocs(userQuery);
  const data = querySnapshot.docs[0].data();
  const storageRef = ref(storage, `${data.username}.jpg`);
  const user = await getDownloadURL(storageRef)
    .then((url) => {
      const user = {
        ...data,
        profilePicture: url,
      };
      return user;
    })
    .catch((error) => {
      console.error(error);
    });
  return user;
};
