import React from 'react'
import {Link} from 'react-router-dom'
import './FavProductOptions.css'

const FavProductOptions = () => {
    return (
        <div className='fav-product-option-box'>
            <div className='fav-product-detail-box'>
                <Link className='fav-product-profile-link' to='/favProducts'>
                    <h2>商品</h2>
                </Link>
            </div>

            <div className='fav-product-order-box'>
                <Link className='fav-product-orders-link' to='/favSellers'>
                    <span>商家</span>
                </Link>
            </div>
        </div>
    )
}

export default FavProductOptions
