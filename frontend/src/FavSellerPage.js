import React from 'react'
import FavSellers from './Components/FavSellers'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage'

const FavSellerPage = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <div>
                <Header />
                <FavSellers />
                <Footer />
            </div>
        )
    }
    
    // if not logged in, redirect to loginPage
    return (
        <LoginPage />
    )
}

export default FavSellerPage
