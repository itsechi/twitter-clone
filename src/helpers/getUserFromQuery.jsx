import { db, storage } from './firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

export const getUserFromQuery = async (username) => {
  const userQuery = query(
    collection(db, 'profiles'),
    where('username', '==', username)
  );
  const querySnapshot = await getDocs(userQuery);
  const data = querySnapshot.docs[0].data();

  const storageRef = ref(storage, `${data.username}.jpg`);
  const bannerRef = ref(storage, `${data.username}_banner.jpg`);
  const profilePicture = await getDownloadURL(storageRef);
  const bannerPicture = await getDownloadURL(bannerRef)
    .then((url) => url)
    .catch(async (error) => {
      if (error.code === 'storage/object-not-found') {
        const bannerRef = ref(storage, `default_banner.jpg`);
        return await getDownloadURL(bannerRef);
      }
    });
    
  const user = {
    ...data,
    profilePicture,
    bannerPicture
  };
  return user;
};
