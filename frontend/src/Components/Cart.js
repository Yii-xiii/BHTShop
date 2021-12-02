import React from 'react'
import {Link} from 'react-router-dom'
import cartLogo from './Cart.png'
import Notification from './Notification'
import './Cart.css'
import Cookies from 'js-cookie'

const Cart = ({count}) => {
    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <Link className='cart-link' to='/cart'>
                <img className='cart-logo' src={cartLogo} alt='logo'/>
                {/* getting cart count and pass in */}
                <Notification count='0' type='cart'/>
            </Link>
        )
    }
    
    return (
        <Link className='cart-link' to='/login'>
            <img className='cart-logo' src={cartLogo} alt='logo'/>
            {/* getting cart count and pass in */}
            <Notification count='0' type='cart'/>
        </Link>
    )
}

export default Cart
