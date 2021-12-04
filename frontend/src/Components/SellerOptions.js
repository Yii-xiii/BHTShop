import React from 'react'
import {Link} from 'react-router-dom'

const SellerOptions = () => {
    return (
        <div className='option-box'>
            <div className='detail-box'>
                <Link className='profile-link' to='/sellerProfile'>
                    <h2>商家信息</h2>
                </Link>
            </div>

            <div className='order-box'>
                <Link className='orders-link' to='/sellerAnalysis'>
                    <span>商家数据</span>
                </Link>
            </div>
        </div>
    )
}

export default SellerOptions
