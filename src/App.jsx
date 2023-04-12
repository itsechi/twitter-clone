import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { BottomBar } from './components/BottomBar/BottomBar';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

  return (
    <div className="app">
      <Header />
      <Home />
      {!user && <BottomBar signInWithGoogle={signInWithGoogle} />}
    </div>
  );
}

export default App;
