import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  return (
    <Router>
      <div className="App">
          <Header />
          <Toaster position="top-center"/>
          <div className="container">
              <Routes>
                <Route path="/" element={<Home/>} />
              </Routes>
          </div>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
