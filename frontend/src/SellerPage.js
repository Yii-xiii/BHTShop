import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SellerDescAndFilter from './Components/SellerDescAndFilter'
import SellerPageProducts from './Components/SellerPageProducts'
import './SellerPage.css'

const SellerPage = () => {
    return (
        <div>
            <Header />
            
            <div className='seller-page-body-outer-box'>
                <div className='seller-page-left-part-box'>
                    <SellerDescAndFilter />
                </div>

                <div className='seller-page-right-part-box'>
                    <SellerPageProducts />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SellerPage
