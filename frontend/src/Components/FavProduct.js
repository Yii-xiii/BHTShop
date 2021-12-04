import React from 'react'
import './FavProduct.css'

const FavProduct = ({ favProduct }) => {
    

    return (
        <div className='fav-product-box'>
            {favProduct.title}
        </div>
    )
}

export default FavProduct
