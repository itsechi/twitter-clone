import { getDoc } from 'firebase/firestore';

export const getUser = async (ref) => {
  const docRef = ref;
  const docSnap = await getDoc(docRef);
  let user;

  if (docSnap.exists()) user = docSnap.data();
  return user;
};

