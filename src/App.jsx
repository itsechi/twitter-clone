import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { BottomBar } from './components/BottomBar/BottomBar';
import { LoginModal } from './components/LoginModal/LoginModal';
import { Profile } from './components/Profile/Profile';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './helpers/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './helpers/firebase';
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
    const userData = {
      username: user.email.split('@')[0],
      displayName: user.displayName,
      profilePicture: user.photoURL,
      followers: [],
      following: [],
    };
    try {
      await setDoc(doc(db, 'profiles', userData.username), {
        ...userData,
      });
    } catch (error) {
      console.error('Error saving user data fo Firebase Database', error);
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <div className="app">
      <Router>
        {modal && (
          <LoginModal signInWithGoogle={signInWithGoogle} setModal={setModal} />
        )}
        <Header signOut={signOutUser} user={user} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<Home openModal={openModal} user={user} />}
          />
          <Route path="/:id" element={<Profile user={user} />} />
        </Routes>

        {!user && <BottomBar signInWithGoogle={signInWithGoogle} />}
      </Router>
    </div>
  );
}

export default App;
