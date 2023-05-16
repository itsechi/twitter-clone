import { getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const getUserFromRef = async (reference) => {
  const docSnap = await getDoc(reference);
  let user;

  if (docSnap.exists()) {
    const data = docSnap.data();
    const pictureRef = ref(storage, `${data.username}.jpg`);
    const bannerRef = ref(storage, `${data.username}_banner.jpg`);

    const profilePicture = await getDownloadURL(pictureRef);
    const bannerPicture = await getDownloadURL(bannerRef)
      .then((url) => url)
      .catch(async (error) => {
        if (error.code !== 'storage/object-not-found') return;
        const bannerRef = ref(storage, `default_banner.jpg`);
        return await getDownloadURL(bannerRef);
      });

    user = {
      ...data,
      profilePicture,
      bannerPicture,
    };
  }
  return user;
};
