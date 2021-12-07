import React from 'react'
import SellerLatestProducts from './SellerLatestProducts'
import SellerPageOptions from './SellerPageOptions'
import './SellerPageProducts.css'
import SellerRankedProducts from './SellerRankedProducts'

const SellerPageProducts = () => {
    return (
        <div>
            <div className='seller-page-products-out-box'>
                <SellerPageOptions />
                <SellerRankedProducts />
                <SellerLatestProducts />
            </div>
        </div>
    )
}

export default SellerPageProducts
