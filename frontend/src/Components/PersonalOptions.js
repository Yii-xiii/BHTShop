import React from 'react'
import {Link} from 'react-router-dom'
import './PersonalOptions.css'

const PersonalOptions = () => {
    return (
        <div className='personal-option-box'>
            <div className='personal-detail-box'>
                <Link className='personal-profile-link' to='/profile'>
                    <h2>个人信息</h2>
                </Link>
            </div>

            <div className='personal-order-box'>
                <Link className='personal-orders-link' to='/orders/1'>
                    <span>所有订单</span>
                </Link>
            </div>
        </div>
    )
}

export default PersonalOptions
