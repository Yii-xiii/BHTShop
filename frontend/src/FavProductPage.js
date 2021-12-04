import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage'
import FavProducts from './Components/FavProducts'

const FavProductPage = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <div>
                <Header />
                <FavProducts />
                <Footer />
            </div>
        )
    }
    
    // if not logged in, redirect to loginPage
    return (
        <LoginPage />
    )
}

export default FavProductPage
