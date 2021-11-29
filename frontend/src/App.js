import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>  
      </div>
    </Router>
  );
}

export default App;
