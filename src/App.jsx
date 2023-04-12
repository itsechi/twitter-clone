import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { BottomBar } from './components/BottomBar/BottomBar';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './helpers/firebase';
import React from 'react';

function App() {
  const [user] = useAuthState(auth);
  console.log(user)

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    signOut(auth);
  }

  return (
    <div className="app">
      <Header signOut={signOutUser} />
      <Home />
      {!user && <BottomBar signInWithGoogle={signInWithGoogle} />}
    </div>
  );
}

export default App;
