import React from 'react'
import './ProductDescription.css'

const ProductDescription = ({ productId }) => {
    

    return (
        <div className='description-outer-box'>
            <div className='description-spec-title'>
                <h5>商品规格</h5>
            </div>


            <div className='description-details-title'>
                <h5>商品描述</h5>
            </div>
        </div>
    )
}

export default ProductDescription
