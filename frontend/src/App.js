import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
import Cookies from 'js-cookie'

function App() {
  const loggedInType = Cookies.get('user')

  if (loggedInType === 'Customer') {
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
          </Routes>
        </div>
      </Router>
    );
  } else if (loggedInType === 'Seller') {
    <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<SellerHomePage />}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/addProduct' element={<AddProductPage />}/>
            <Route path='/sellerOrders' element={<SellerOrdersPage />}/>
            <Route path='/seller/:sellerId' element={<SellerHomePage />}/>
            <Route path='/product/:productId' element={<ProductPage />}/>
            <Route path='/orderList/:userId' element={<OrderListPage />}/>
          </Routes>
        </div>
      </Router>
  }

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
