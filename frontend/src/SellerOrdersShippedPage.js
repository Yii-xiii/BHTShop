import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SellerOrdersBody from './Components/SellerOrdersBody'

const SellerOrdersShippedPage = () => {
    return (
        <div>
            <Header />
            <SellerOrdersBody status={'shipped'}/>
            <Footer />
        </div>
    )
}

export default SellerOrdersShippedPage