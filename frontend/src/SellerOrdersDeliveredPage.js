import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SellerOrdersBody from './Components/SellerOrdersBody'

const SellerOrdersDeliveredPage = () => {
    return (
        <div>
            <Header />
            <SellerOrdersBody status={'delivered'}/>
            <Footer />
        </div>
    )
}

export default SellerOrdersDeliveredPage
