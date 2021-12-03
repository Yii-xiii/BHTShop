import React from 'react'
import PersonalOrdersOption from './PersonalOrdersOption'
import './PersonalOrders.css'

const PersonalOrders = () => {
    return (
        <div className='personal-order-box'>
            <div className="info-title">
                <h1>个人信息</h1>
            </div>

            <div className='display-box'>
                <PersonalOrdersOption />
            </div>
        </div>
    )
}

export default PersonalOrders
