import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import PersonalOrders from './Components/PersonalOrders'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage'

const PersonalOrdersPage = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <div>
                <Header />
                <PersonalOrders />
                <Footer />
            </div>
        )
    }
    
    // if not logged in, redirect to loginPage
    return (
        <LoginPage />
    )
}

export default PersonalOrdersPage
