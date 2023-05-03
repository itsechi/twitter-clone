import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { BottomBar } from './components/BottomBar/BottomBar';
import { LoginModal } from './components/LoginModal/LoginModal';
import { Profile } from './components/Profile/Profile';
import { FollowerList } from './components/FollowerList/FollowerList';

// firebase
import { auth, db } from './helpers/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

// react
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

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
        profilePicture: '',
        followers: [],
        following: [],
      };
    } else {
      userData = {
        username: user.email.split('@')[0],
        displayName: user.displayName,
        profilePicture: user.photoURL,
        followers: [],
        following: [],
      };
    }
    const docRef = doc(db, 'profiles', userData.username);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(docRef, {
          ...userData,
        });
      } catch (error) {
        console.error('Error saving user data fo Firebase Database', error);
      }
    }
    setLoggedUser(userData);
    onSnapshot(docRef, (doc) => {
      setLoggedUser(doc.data());
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
            setModal={setModal}
            joinAsGuest={joinAsGuest}
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
