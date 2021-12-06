import React from 'react'
import {Link} from 'react-router-dom'
import './PersonalOptions.css'

const PersonalOptions = () => {
    return (
        <div className='option-box'>
            <div className='detail-box'>
                <Link className='profile-link' to='/profile'>
                    <h2>个人信息</h2>
                </Link>
            </div>

            <div className='order-box'>
                <Link className='orders-link' to='/orders/1'>
                    <span>所有订单</span>
                </Link>
            </div>
        </div>
    )
}

export default PersonalOptions
