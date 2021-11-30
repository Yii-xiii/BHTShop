import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import FavPage from './FavPage'
import CartPage from './CartPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/fav' element={<FavPage />}/>
          <Route path='/cart' element={<CartPage />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
