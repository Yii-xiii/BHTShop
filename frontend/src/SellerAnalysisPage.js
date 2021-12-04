import React from 'react'
import Cookies from 'js-cookie'
import Header from './Components/Header'
import LoginPage from './LoginPage'
import Footer from './Components/Footer'
import SellerAnalysis from './Components/SellerAnalysis'

const SellerAnalysisPage = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Seller') {
        return (
            <div>
                <Header />
                <SellerAnalysis />
                <Footer />
            </div>
        )
    }
    
    // if not logged in, redirect to loginPage
    return (
        <LoginPage />
    )
}

export default SellerAnalysisPage
