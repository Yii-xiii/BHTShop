import React from 'react'
import {Link} from 'react-router-dom'
import './PersonalOrdersOptions.css'

const PersonalOrdersOption = () => {
    return (
        <div className='option-box'>
            <div className='detail-box2'>
                <Link className='profile-link2' to='/profile'>
                    <span>个人信息</span>
                </Link>
            </div>

            <div className='order-box2'>
                <Link className='orders-link2' to='/orders'>
                    <h2>所有订单</h2>
                </Link>
            </div>
        </div>
    )
}

export default PersonalOrdersOption
