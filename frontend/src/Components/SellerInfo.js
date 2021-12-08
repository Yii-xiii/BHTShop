import React from 'react'
import SellerDetails from './SellerDetails'
import SellerOptions from './SellerOptions'

const SellerInfo = () => {
    return (
        <div className='personal-info-box'>
            <div className="personal-info-title">
                <h1>商家信息</h1>
            </div>

            <div className='personal-info-display-box'>
                <SellerOptions />
                <SellerDetails />
            </div>
        </div>
    )
}

export default SellerInfo