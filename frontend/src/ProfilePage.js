import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import PersonalInfo from './Components/PersonalInfo'
import Cookies from 'js-cookie'
import LoginPage from './LoginPage'

const ProfilePage = () => {
	const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <div>
                <Header />
				<PersonalInfo />
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
