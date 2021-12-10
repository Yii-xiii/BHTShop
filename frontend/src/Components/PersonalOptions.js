import Cookies from 'js-cookie'
import React from 'react'
import {Link} from 'react-router-dom'
import './PersonalOptions.css'

const PersonalOptions = () => {
    if (Cookies.get('user') === 'Customer') {
        return (
            <div className='personal-option-box'>
                <div className='personal-detail-box'>
                    <Link className='personal-profile-link' to='/profile'>
                        <h2>个人信息</h2>
                    </Link>
                </div>
    
                <div className='personal-order-box'>
                    <Link className='personal-orders-link' to='/orders'>
                        <span>所有订单</span>
                    </Link>
                </div>
            </div>
        )
    } else if (Cookies.get('user') === 'Postman') {
        return (
            <div className='personal-option-box'>
                <div className='personal-detail-box'>
                    <Link className='personal-profile-link' to='/profile'>
                        <h2>个人信息</h2>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='personal-option-box'>
            <div className='personal-detail-box'>
                <Link className='personal-profile-link' to='/profile'>
                    <h2>个人信息</h2>
                </Link>
            </div>

            <div className='personal-order-box'>
                <Link className='personal-orders-link' to='/orders'>
                    <span>所有订单</span>
                </Link>
            </div>
        </div>
    )
}

export default PersonalOptions
