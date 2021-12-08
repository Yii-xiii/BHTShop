import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import FavProductPage from './FavProductPage'
import CartPage from './CartPage'
import RegisterPage from './RegisterPage'
import ProductPage from './ProductPage'
import ProfilePage from './ProfilePage'
import SellerHomePage from './SellerHomePage'
import AddProductPage from './AddProductPage'
import PersonalOrdersPage from './PersonalOrdersPage';
import AdminPage from './AdminPage';
import SellerAnalysisPage from './SellerAnalysisPage';
import SellerPage from './SellerPage'
import FavSellerPage from './FavSellerPage';
import OrderPage from './OrderPage';
import ProductCommentsPage from './ProductCommentsPage'
import SellerOrdersPaidPage from './SellerOrdersPaidPage';
import SellerOrdersShippedPage from './SellerOrdersShippedPage';
import SellerOrdersDeliveredPage from './SellerOrdersDeliveredPage';
import SellerOrdersReturningPage from './SellerOrdersReturningPage';
import SellerOrdersReturnedPage from './SellerOrdersReturnedPage';
import ReportPage from './ReportPage';
import SearchPage from './SearchPage';
import ReportSuccessPage from './ReportSuccessPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/s/:searchName' element={<SearchPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/favProducts' element={<FavProductPage />}/>
          <Route path='/favSellers' element={<FavSellerPage />}/>
          <Route path='/cart' element={<CartPage />}/>
          <Route path='/addProduct' element={<AddProductPage />}/>
          <Route path='/sOrders/paid' element={<SellerOrdersPaidPage />}/>
          <Route path='/sOrders/shipped' element={<SellerOrdersShippedPage />}/>
          <Route path='/sOrders/delivered' element={<SellerOrdersDeliveredPage />}/>
          <Route path='/sOrders/returning' element={<SellerOrdersReturningPage />}/>
          <Route path='/sOrders/returned' element={<SellerOrdersReturnedPage />}/>
          <Route path='/sellerHome' element={<SellerHomePage />}/>
          <Route path='/product/:productId' element={<ProductPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/sellerProfile' element={<ProfilePage />}/>
          <Route path='/seller/:sellerId' element={<SellerPage />}/>
          <Route path='/sellerAnalysis' element={<SellerAnalysisPage />}/>
          <Route path='/orders/:pageNum' element={<PersonalOrdersPage />}/>
          <Route path='/order/:orderId' element={<OrderPage />}/>
          <Route path='/product/:productId/comments' element={<ProductCommentsPage />}/>
          <Route path='/report/:reportingId' element={<ReportPage />}/>
          <Route path='/report/:reportingId/success' element={<ReportSuccessPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
