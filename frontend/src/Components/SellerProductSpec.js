import React from 'react'
import './SellerProductSpec.css'

const SellerProductSpec = ({ spec }) => {
    return (
        <div className='spec-box'>
            <div className='spec-inner-left-box'>
                <span className='spec-product-desc'>{spec.description}</span>
                <span className='spec-product-stock'>库存: {spec.stock}</span>
            </div>
            
            <span className='spec-product-price'>¥ {spec.price}</span>
        </div>
    )
}

export default SellerProductSpec
