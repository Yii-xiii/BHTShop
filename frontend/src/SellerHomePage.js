import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SellerProducts from './Components/SellerProducts'

const SellerHomePage = () => {
    // if not logged in, redirect to login page
    return (
        <div>
            <Header />
            <SellerProducts />
            <Footer />
        </div>
    )
}

export default SellerHomePage
