import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import { FollowerList } from './pages/FollowerList/FollowerList';
import { Header } from './components/Header/Header';
import { BottomBar } from './components/BottomBar/BottomBar';
import { LoginModal } from './components/LoginModal/LoginModal';
import { getUserFromRef } from './helpers/getUserFromRef';

// firebase
import { auth, db, storage } from './helpers/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

// react
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  const [modal, setModal] = React.useState(false);
  const [loggedUser, setLoggedUser] = React.useState();

  React.useEffect(() => {
    setModal(false);
    checkUser(user);
  }, [user]);

  const openModal = (e) => {
    if (e.target.dataset.id === 'icons') return;
    if (user) return;
    setModal(true);
  };

  const checkUser = async (user) => {
    if (!user) return;
    let userData;
    if (user.isAnonymous) {
      userData = {
        username: 'guest',
        displayName: 'Guest',
        followers: [],
        following: [],
      };
    } else {
      userData = {
        username: user.email.split('@')[0],
        displayName: user.displayName,
        followers: [],
        following: [],
      };
    }
    const docRef = doc(db, 'profiles', userData.username);
    const userObject = await getUserFromRef(docRef);
    if (!userObject) {
      uploadProfilePicture(user.photoURL, userData.username);
      try {
        await setDoc(docRef, {
          ...userData,
        });
      } catch (error) {
        console.error('Error saving user data fo Firebase Database', error);
      }
    }
    setLoggedUser(userObject);
    onSnapshot(docRef, async () => {
      const userObject = await getUserFromRef(docRef);
      setLoggedUser(userObject);
    });
  };

  const uploadProfilePicture = (url, username) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const storageRef = ref(storage, `${username}.jpg`);
        uploadBytes(storageRef, blob);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    signOut(auth);
    setLoggedUser('');
  };

  const joinAsGuest = () => {
    signInAnonymously(auth);
  };

  return (
    <div className="app">
      <Router>
        {modal && (
          <LoginModal
            signInWithGoogle={signInWithGoogle}
            joinAsGuest={joinAsGuest}
            setModal={setModal}
          />
        )}
        <Header signOut={signOutUser} loggedUser={loggedUser} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<Home loggedUser={loggedUser} openModal={openModal} />}
          />
          <Route
            path="/:id"
            element={<Profile loggedUser={loggedUser} openModal={openModal} />}
          />
          <Route
            path="/:id/replies"
            element={<Profile loggedUser={loggedUser} openModal={openModal} />}
          />
          <Route
            path="/:id/media"
            element={<Profile loggedUser={loggedUser} openModal={openModal} />}
          />
          <Route
            path="/:id/likes"
            element={<Profile loggedUser={loggedUser} openModal={openModal} />}
          />
          <Route
            path="/:id/following"
            element={<FollowerList loggedUser={loggedUser} />}
          />
          <Route
            path="/:id/followers"
            element={<FollowerList loggedUser={loggedUser} />}
          />
        </Routes>

        {!user && <BottomBar openModal={openModal} />}
      </Router>
    </div>
  );
}

export default App;
