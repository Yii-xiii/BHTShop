import React from 'react'
import {Link} from 'react-router-dom'

const SellerAnalysisOptions = () => {
    return (
        <div className='personal-option-box'>
            <div className='personal-detail-box'>
                <Link className='profile-link2' to='/sellerProfile'>
                    <span>商家信息</span>
                </Link>
            </div>

            <div className='personal-order-box'>
                <Link className='orders-link2' to='/sellerAnalysis'>
                    <h2>商家数据</h2>
                </Link>
            </div>
        </div>
    )
}

export default SellerAnalysisOptions
