import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage'

const CartPage = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <div>
                <Header />
    
                <h1>TODO User Cart List</h1>
    
                <Footer />
            </div>
        )
    }
    
    // if not logged in, redirect to loginPage
    return (
        <LoginPage />
    )
}

export default CartPage
