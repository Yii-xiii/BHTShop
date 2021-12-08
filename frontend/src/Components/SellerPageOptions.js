import React from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router'
import './SellerPageOptions.css'

const SellerPageOptions = () => {
    const { sellerId } = useParams()
    const path = `/seller/${sellerId}`

    return (
        <div className='seller-page-option-box'>
            <div className='seller-page-home-box'>
                <Link className='seller-page-home-link' to={path}>
                    <h2>主页</h2>
                </Link>
            </div>

            <div className='seller-page-all-product-box'>
                <Link className='seller-page-all-product-link' to={path}>
                    <span>所有商品</span>
                </Link>
            </div>
        </div>
    )
}

export default SellerPageOptions
