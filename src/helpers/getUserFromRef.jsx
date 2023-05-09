import { getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export const getUserFromRef = async (reference) => {
  const storage = getStorage();

  const docRef = reference;
  const docSnap = await getDoc(docRef);
  let user;

  if (docSnap.exists()) {
    let data = docSnap.data();
    const storageRef = ref(storage, `${data.username}.jpg`);
    user = await getDownloadURL(storageRef)
      .then((url) => {
        user = {
          ...data,
          profilePicture: url,
        };
        return user;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return user;
};
