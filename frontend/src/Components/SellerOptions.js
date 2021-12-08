import React from 'react'
import {Link} from 'react-router-dom'

const SellerOptions = () => {
    return (
        <div className='personal-option-box'>
            <div className='personal-detail-box'>
                <Link className='personal-profile-link' to='/sellerProfile'>
                    <h2>商家信息</h2>
                </Link>
            </div>

            <div className='personal-order-box'>
                <Link className='personal-orders-link' to='/sellerAnalysis'>
                    <span>商家数据</span>
                </Link>
            </div>
        </div>
    )
}

export default SellerOptions
