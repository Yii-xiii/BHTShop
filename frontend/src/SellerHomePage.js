import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage'

const SellerHomePage = () => {
    const navigate = useNavigate()
    const { sellerId } = useParams()
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Seller') {
        return (
            <div>
                <Header />
                    <h1>TODO SELLER PAGE</h1>
                <Footer />
            </div>
        )
    }

    // if not logged in, redirect to login page
    return (
        <LoginPage />
    )
}

export default SellerHomePage
