import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <div className="App">
          <Header />
          <Toaster position="top-center"/>
          <div className="container">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
          </div>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
