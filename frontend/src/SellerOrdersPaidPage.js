import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SellerOrdersBody from './Components/SellerOrdersBody'

const SellerOrdersPaidPage = () => {
    return (
        <div>
            <Header />
            <SellerOrdersBody status={'paid'}/>
            <Footer />
        </div>
    )
}

export default SellerOrdersPaidPage
