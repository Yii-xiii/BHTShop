import React from 'react'
import {Link} from 'react-router-dom'
import './FavSellerOptions.css'

const FavSellerOptions = () => {
    return (
        <div className='fav-seller-option-box'>
            <div className='fav-seller-detail-box'>
                <Link className='fav-seller-profile-link' to='/favProducts'>
                    <span>商品</span>
                </Link>
            </div>

            <div className='fav-seller-order-box'>
                <Link className='fav-seller-orders-link' to='/favSellers'>
                    <h2>商家</h2>
                </Link>
            </div>
        </div>
    )
}

export default FavSellerOptions
