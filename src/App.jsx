import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { BottomBar } from './components/BottomBar/BottomBar';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './helpers/firebase';
import React from 'react';
import { LoginModal } from './components/LoginModal/LoginModal';

function App() {
  const [user] = useAuthState(auth);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    setModal(false);
  }, [user]);

  const openModal = (e) => {
    if (e.target.dataset.id === 'icons') return;
    if (user) return;
    setModal(true);
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
      {modal && <LoginModal signInWithGoogle={signInWithGoogle} />}
      <Header signOut={signOutUser} />
      <Home openModal={openModal} />
      {!user && <BottomBar signInWithGoogle={signInWithGoogle} />}
    </div>
  );
}

export default App;
