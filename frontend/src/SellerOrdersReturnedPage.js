import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SellerOrdersBody from './Components/SellerOrdersBody'

const SellerOrdersReturnedPage = () => {
    return (
        <div>
            <Header />
            <SellerOrdersBody status={'returned'}/>
            <Footer />
        </div>
    )
}

export default SellerOrdersReturnedPage
