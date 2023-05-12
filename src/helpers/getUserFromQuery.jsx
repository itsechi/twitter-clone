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
  const profilePic = await getDownloadURL(storageRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error(error);
    });
  const bannerPic = await getDownloadURL(bannerRef)
    .then((url) => url)
    .catch(() => {
      'https://pbs.twimg.com/profile_banners/1085262492610240512/1616676981/600x200';
    });
  const user = {
    ...data,
    profilePicture: profilePic,
    bannerPicture: bannerPic,
  };
  return user;
};
