import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import Header from './Components/Header'
import Footer from './Components/Footer'
import FavPage from './FavPage'
import CartPage from './CartPage'
import RegisterPage from './RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/fav' element={<FavPage />}/>
          <Route path='/cart' element={<CartPage />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
