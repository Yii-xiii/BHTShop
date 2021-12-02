import React from 'react'
import {Link} from 'react-router-dom'
import './AddItem.css'
import sellerOrdersLogo from './SellerOrders.png'
import Cookies from 'js-cookie'
import Notification from './Notification'

const SellerOrders = () => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Seller') {
        return (
            // link to userId fav list
            <Link className='addItem-link' to='/sellerOrders'>
                <img className='addItem-logo' src={sellerOrdersLogo} alt='logo'/>
                {/* getting orders count and pass in */}
                <Notification count='0' type='fav'/>
            </Link>
        )
    }

    return (
        <Link className='addItem-link' to='/'>
            <img className='sellerOrders-logo' src={sellerOrdersLogo} alt='logo'/>
            {/* getting orders count and pass in */}
            <Notification count='0' type='fav'/>
        </Link>
    )
}

export default SellerOrders
