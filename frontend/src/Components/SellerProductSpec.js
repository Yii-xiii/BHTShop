import React from 'react'
import './SellerProductSpec.css'

const SellerProductSpec = ({ spec }) => {
    return (
        <div className='spec-box'>
            <span className='spec-product-desc'>{spec.description}</span>
            <span className='spec-product-price'>¥ {spec.price}</span>
            <span className='spec-product-stock'>{spec.stock}</span>
            <span className='spec-product-sold'>{spec.product.soldAmount}</span>
        </div>
    )
}

export default SellerProductSpec
