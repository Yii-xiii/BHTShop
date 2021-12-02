import './OrderList.css'

import React from 'react'
import { Link } from 'react-router-dom'

const PersonalInfo = () => {
    return (
        <Link className='orderlist-link' to='/orderlist'>
            <div className='text'>
                <h1>所有订单</h1>
            </div>
        </Link>
    )
}

export default OrderList