import React from 'react'
import {Link} from 'react-router-dom'
import './ProductDescription.css'

const ProductDescription = ({ product }) => {    
    let seller = product.seller

    return (
        <div className='description-outer-box'>
            <div className='description-spec-title'>
                <h5>商品规格</h5>
            </div>

            <div className='description-seller-box'>
                <h5>商家</h5>
                {/* link to seller page */}
                <Link className='seller-page-link' to=''>
                    <span>{seller.username}</span>
                </Link>
            </div>

            <div className='description-seller-box'>
                <h5>库存</h5>
                {/* stock count here */}
                <span>{seller.username}</span>
            </div>

            <div className='description-details-title'>
                <h5>商品描述</h5>
            </div>

            <div className='description-details-text-box'>
                <span>{product.description}</span> 
            </div>
        </div>
    )
}

export default ProductDescription
