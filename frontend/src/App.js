import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import Header from './Components/Header'
import Footer from './Components/Footer'
import FavPage from './FavPage'
import CartPage from './CartPage'
import RegisterPage from './RegisterPage'
import ProductPage from './ProductPage'
import PersonalInfoPage from './PersonalInfoPage'
import OrderListPage from './OrderListPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/fav' element={<FavPage />}/>
          <Route path='/cart' element={<CartPage />}/>
          <Route path='/product/:productId' element={<ProductPage />}/>
          <Route path='/user/:userId' element={<PersonalInfoPage />}/>
          <Route path='/orderList/:userId' element={<OrderListPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
