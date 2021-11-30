import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Home'
import FavPage from './FavPage'
import CartPage from './CartPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/fav' element={<FavPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>  
      </div>
    </Router>
  );
}

export default App;
