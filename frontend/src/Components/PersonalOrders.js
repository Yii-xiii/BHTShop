import React from 'react'
import PersonalOrdersOption from './PersonalOrdersOption'
import './PersonalOrders.css'
import PersonalOrdersByPage from './PersonalOrdersByPage'

const PersonalOrders = () => {
    return (
        <div className='personal-order-box'>
            <div className="info-title">
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
