import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
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
import SellerOrdersReturnedPage from './SellerOrdersReturnedPage';
import SellerOrdersRefundingPage from './SellerOrdersRefundingPage';
import SellerOrdersRefundedPage from './SellerOrdersRefundedPage';
import SellerOrdersReturnRequestPage from './SellerOrdersReturnRequestPage'
import SellerOrdersCompletedPage from './SellerOrdersCompletedPage';
import ReportPage from './ReportPage';
import SearchPage from './SearchPage';
import ReportSuccessPage from './ReportSuccessPage';
import EditProduct from './EditProduct';
import PostmanHomePage from './PostmanHomePage';
import Cookies from 'js-cookie';

function App() {
  let loggedIn = Cookies.get('user')

  if (loggedIn !== undefined) {
    if (loggedIn === 'Customer') {
      return (
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/search/:keyword/:category' element={<SearchPage />}/>
              <Route path='/register' element={<Navigate to="/" />}/>
              <Route path='/login' element={<Navigate to="/" />}/>
              <Route path='/favProducts' element={<FavProductPage />}/>
              <Route path='/favSellers' element={<FavSellerPage />}/>
              <Route path='/cart' element={<CartPage />}/>
              <Route path='/addProduct' element={<Navigate to="/" />}/>
              <Route path='/sOrders/paid' element={<Navigate to="/" />}/>
              <Route path='/sOrders/shipped' element={<Navigate to="/" />}/>
              <Route path='/sOrders/delivered' element={<Navigate to="/" />}/>
              <Route path='/sOrders/returning' element={<Navigate to="/" />}/>
              <Route path='/sOrders/returned' element={<Navigate to="/" />}/>
              <Route path='/sellerHome' element={<Navigate to="/" />}/>
              <Route path='/product/:productId' element={<ProductPage />}/>
              <Route path='/profile' element={<ProfilePage />}/>
              <Route path='/admin' element={<Navigate to="/" />}/>
              <Route path='/sellerProfile' element={<Navigate to="/" />}/>
              <Route path='/seller/:sellerId' element={<SellerPage />}/>
              <Route path='/sellerAnalysis' element={<Navigate to="/" />}/>
              <Route path='/orders' element={<PersonalOrdersPage />}/>
              <Route path='/order/:orderId' element={<OrderPage />}/>
              <Route path='/product/:productId/comments' element={<ProductCommentsPage />}/>
              <Route path='/product/:productId/edit' element={<EditProduct />}/>
              <Route path='/report/:reportType/:reportingId' element={<ReportPage />}/>
              <Route path='/report/:reportType/:reportingId/success' element={<ReportSuccessPage />}/>
              <Route path='/postHome' element={<Navigate to="/" />}/>
            </Routes>
          </div>
        </Router>
      );
    } else if (loggedIn === 'Seller') {
      return (
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={<Navigate to="/sellerHome" />}/>
              <Route path='/search/:keyword/:category' element={<Navigate to="/sellerHome" />}/>
              <Route path='/register' element={<Navigate to="/sellerHome" />}/>
              <Route path='/login' element={<Navigate to="/sellerHome" />}/>
              <Route path='/favProducts' element={<Navigate to="/sellerHome" />}/>
              <Route path='/favSellers' element={<Navigate to="/sellerHome" />}/>
              <Route path='/cart' element={<Navigate to="/sellerHome" />}/>
              <Route path='/addProduct' element={<AddProductPage />}/>
              <Route path='/sOrders/paid' element={<SellerOrdersPaidPage />}/>
              <Route path='/sOrders/shipped' element={<SellerOrdersShippedPage />}/>
              <Route path='/sOrders/delivered' element={<SellerOrdersDeliveredPage />}/>
              <Route path='/sOrders/returning' element={<SellerOrdersReturningPage />}/>
              <Route path='/sOrders/returned' element={<SellerOrdersReturnedPage />}/>
              <Route path='/sellerHome' element={<SellerHomePage />}/>
              <Route path='/product/:productId' element={<ProductPage />}/>
              <Route path='/profile' element={<Navigate to="/sellerHome" />}/>
              <Route path='/admin' element={<Navigate to="/sellerHome" />}/>
              <Route path='/sellerProfile' element={<ProfilePage />}/>
              <Route path='/seller/:sellerId' element={<SellerPage />}/>
              <Route path='/sellerAnalysis' element={<SellerAnalysisPage />}/>
              <Route path='/orders' element={<Navigate to="/sellerHome" />}/>
              <Route path='/order/:orderId' element={<Navigate to="/sellerHome" />}/>
              <Route path='/product/:productId/comments' element={<ProductCommentsPage />}/>
              <Route path='/product/:productId/edit' element={<EditProduct />}/>
              <Route path='/report/:reportType/:reportingId' element={<ReportPage />}/>
              <Route path='/report/:reportType/:reportingId/success' element={<ReportSuccessPage />}/>
              <Route path='/postHome' element={<Navigate to="/sellerHome" />}/>
            </Routes>
          </div>
        </Router>
      );
    } else if (loggedIn === 'Postman') {
      return (
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={<Navigate to="/postHome" />}/>
              <Route path='/search/:keyword/:category' element={<Navigate to="/postHome" />}/>
              <Route path='/register' element={<Navigate to="/postHome" />}/>
              <Route path='/login' element={<Navigate to="/postHome" />}/>
              <Route path='/favProducts' element={<Navigate to="/postHome" />}/>
              <Route path='/favSellers' element={<Navigate to="/postHome" />}/>
              <Route path='/cart' element={<Navigate to="/postHome" />}/>
              <Route path='/addProduct' element={<Navigate to="/postHome" />}/>
              <Route path='/sOrders/paid' element={<Navigate to="/postHome" />}/>
              <Route path='/sOrders/shipped' element={<Navigate to="/postHome" />}/>
              <Route path='/sOrders/delivered' element={<Navigate to="/postHome" />}/>
              <Route path='/sOrders/returning' element={<Navigate to="/postHome" />}/>
              <Route path='/sOrders/returned' element={<Navigate to="/postHome" />}/>
              <Route path='/sellerHome' element={<Navigate to="/postHome" />}/>
              <Route path='/product/:productId' element={<Navigate to="/postHome" />}/>
              <Route path='/profile' element={<ProfilePage />}/>
              <Route path='/admin' element={<Navigate to="/postHome" />}/>
              <Route path='/sellerProfile' element={<Navigate to="/postHome" />}/>
              <Route path='/seller/:sellerId' element={<Navigate to="/postHome" />}/>
              <Route path='/sellerAnalysis' element={<Navigate to="/postHome" />}/>
              <Route path='/orders' element={<Navigate to="/postHome" />}/>
              <Route path='/order/:orderId' element={<Navigate to="/postHome" />}/>
              <Route path='/product/:productId/comments' element={<Navigate to="/postHome" />}/>
              <Route path='/product/:productId/edit' element={<Navigate to="/postHome" />}/>
              <Route path='/report/:reportType/:reportingId' element={<Navigate to="/postHome" />}/>
              <Route path='/report/:reportType/:reportingId/success' element={<Navigate to="/postHome" />}/>
              <Route path='/postHome' element={<PostmanHomePage />}/>
            </Routes>
          </div>
        </Router>
      );
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/search/:keyword/:category' element={<SearchPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/favProducts' element={<FavProductPage />}/>
          <Route path='/favSellers' element={<FavSellerPage />}/>
          <Route path='/cart' element={<CartPage />}/>
          <Route path='/addProduct' element={<AddProductPage />}/>
          <Route path='/sOrders/paid' element={<SellerOrdersPaidPage />}/>
          <Route path='/sOrders/shipped' element={<SellerOrdersShippedPage />}/>
          <Route path='/sOrders/delivered' element={<SellerOrdersDeliveredPage />}/>
          <Route path='/sOrders/returned' element={<SellerOrdersReturnedPage />} />
          <Route path='/sOrders/refunding' element={<SellerOrdersRefundingPage />} />
          <Route path='/sOrders/refunded' element={<SellerOrdersRefundedPage />} />
          <Route path='/sOrders/returning' element={<SellerOrdersReturnRequestPage />} />
          <Route path='/sOrders/completed' element={<SellerOrdersCompletedPage />} />
          <Route path='/sellerHome' element={<SellerHomePage />} />
          <Route path='/product/:productId' element={<ProductPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/sellerProfile' element={<ProfilePage />}/>
          <Route path='/seller/:sellerId' element={<SellerPage />}/>
          <Route path='/sellerAnalysis' element={<SellerAnalysisPage />}/>
          <Route path='/orders' element={<PersonalOrdersPage />}/>
          <Route path='/order/:orderId' element={<OrderPage />}/>
          <Route path='/product/:productId/comments' element={<ProductCommentsPage />}/>
          <Route path='/product/:productId/edit' element={<EditProduct />}/>
          <Route path='/report/:reportType/:reportingId' element={<ReportPage />}/>
          <Route path='/report/:reportType/:reportingId/success' element={<ReportSuccessPage />}/>
          <Route path='/postHome' element={<PostmanHomePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
