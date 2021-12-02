import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import FavPage from './FavPage'
import CartPage from './CartPage'
import RegisterPage from './RegisterPage'
import ProductPage from './ProductPage'
import PersonalInfoPage from './PersonalInfoPage'
import OrderListPage from './OrderListPage'
import SellerHomePage from './SellerHomePage'
import AddProductPage from './AddProductPage'
import SellerOrdersPage from './SellerOrdersPage';

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
          <Route path='/addProduct' element={<AddProductPage />}/>
          <Route path='/sellerOrders' element={<SellerOrdersPage />}/>
          <Route path='/seller/:sellerId' element={<SellerHomePage />}/>
          <Route path='/product/:productId' element={<ProductPage />}/>
          <Route path='/user/:userId' element={<PersonalInfoPage />}/>
          <Route path='/orderList/:userId' element={<OrderListPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
