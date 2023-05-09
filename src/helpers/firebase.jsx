import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBoe7kSRFU2kijdwHZ2k-bSlf5LIWOgC3w',
  authDomain: 'twitterclone-1e1bc.firebaseapp.com',
  projectId: 'twitterclone-1e1bc',
  storageBucket: 'twitterclone-1e1bc.appspot.com',
  messagingSenderId: '599627039699',
  appId: '1:599627039699:web:7671bc316e7b422afde526',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
