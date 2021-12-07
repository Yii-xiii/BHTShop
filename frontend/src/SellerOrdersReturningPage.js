import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SellerOrdersBody from './Components/SellerOrdersBody'

const SellerOrdersReturningPage = () => {
    return (
        <div>
            <Header />
            <SellerOrdersBody status={'returning'}/>
            <Footer />
        </div>
    )
}

export default SellerOrdersReturningPage
