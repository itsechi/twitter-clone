import { getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const getUserFromRef = async (reference) => {
  const docRef = reference;
  const docSnap = await getDoc(docRef);
  let user;

  if (docSnap.exists()) {
    let data = docSnap.data();
    const storageRef = ref(storage, `${data.username}.jpg`);
    const bannerRef = ref(storage, `${data.username}_banner.jpg`);
    const profilePic = await getDownloadURL(storageRef)
      .then((url) => {
        return url;
        // const user = {
        //   ...data,
        //   profilePicture: url,
        // };
        // return user;
      })
      .catch((error) => {
        console.error(error);
      });
      const bannerPic = await getDownloadURL(bannerRef).then((url) => url).catch(() => 'https://pbs.twimg.com/profile_banners/1085262492610240512/1616676981/600x200');
      user = {
        ...data,
        profilePicture: profilePic,
        bannerPicture: bannerPic
      }
  }
  return user;
};
