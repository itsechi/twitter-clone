import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { BottomBar } from './components/BottomBar/BottomBar';

function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <BottomBar />
    </div>
  );
}

export default App;
