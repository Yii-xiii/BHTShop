import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import FavPage from './FavPage'
import CartPage from './CartPage'
import RegisterPage from './RegisterPage'
import ProductPage from './ProductPage'
import ProfilePage from './ProfilePage'
import OrderListPage from './OrderListPage'
import SellerHomePage from './SellerHomePage'
import AddProductPage from './AddProductPage'
import SellerOrdersPage from './SellerOrdersPage';
import PersonalOrdersPage from './PersonalOrdersPage';
import AdminPage from './AdminPage';
import SellerAnalysisPage from './SellerAnalysisPage';

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
          <Route path='/seller' element={<SellerHomePage />}/>
          <Route path='/product/:productId' element={<ProductPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/sellerProfile' element={<ProfilePage />}/>
          <Route path='/sellerAnalysis' element={<SellerAnalysisPage />}/>
          <Route path='/orderList/' element={<OrderListPage />}/>
          <Route path='/orders' element={<PersonalOrdersPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
