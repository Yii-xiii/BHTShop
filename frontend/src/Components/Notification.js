import React from 'react'
import './Notification.css'

const Notification = ({ count, type }) => {
    if (type == 'fav') {
        return (
            <span className='fav-count'>{count}</span>
        )
    } else if (type == 'cart') {
        return (
            <span className='cart-count'>{count}</span>
        )
    }

}

export default Notification
