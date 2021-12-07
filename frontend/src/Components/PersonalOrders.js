import React from 'react'
import PersonalOrdersOption from './PersonalOrdersOption'
import './PersonalOrders.css'
import PersonalOrdersByPage from './PersonalOrdersByPage'

const PersonalOrders = () => {
    return (
        <div className='personal-orders-box'>
            <div className="personal-order-info-title">
                <h1>个人信息</h1>
            </div>

            <div className='display-box'>
                <PersonalOrdersOption />
                <PersonalOrdersByPage />
            </div>
        </div>
    )
}

export default PersonalOrders
