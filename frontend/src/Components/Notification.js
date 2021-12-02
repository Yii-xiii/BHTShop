import React from 'react'
import './Notification.css'

const Notification = ({ count, type }) => {
    if (type === 'fav' && count > 0) {
        return (
            <span className='fav-count'>{count}</span>
        )
    } else if (type === 'cart' & count > 0) {
        return (
            <span className='cart-count'>{count}</span>
        )
    }

    return (
        <div>
            
        </div>
    )
}

export default Notification
