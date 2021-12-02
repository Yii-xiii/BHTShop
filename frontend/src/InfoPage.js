import './InfoPage.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PersonalInfoPage from './Components/PersonalInfoPage'
import OrderListPage from './Components/OrderListPage'

function InfoPage() {
    return (
        <Router>
            <div className="InfoPage">
                <Header />

                <Routes>
                    <Route path='/personalinfo' element={<PersonalInfoPage />} />
                    <Route path='/orderlist' element={<OrderListPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default InfoPage;