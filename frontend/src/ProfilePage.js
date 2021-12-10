import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import PersonalInfo from './Components/PersonalInfo'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage'
import SellerInfo from './Components/SellerInfo'

const ProfilePage = () => {
	let loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer' || loggedInType === 'Postman') {
        return (
            <div>
                <Header />
				<PersonalInfo />
				<Footer />
            </div>
        )
    } else if (loggedInType === 'Seller') {
        return (
            <div>
                <Header />
                <SellerInfo />
				<Footer />
            </div>
        )
    }
    
    // if not logged in, redirect to loginPage
    return (
        <LoginPage />
    )
}

export default ProfilePage
