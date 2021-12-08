import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './AddItem.css'
import api from './Api'
import sellerOrdersLogo from './SellerOrders.png'
import Cookies from 'js-cookie'
import Notification from './Notification'

const SellerOrders = () => {
    const [orders, setOrders] = useState([])
    const loggedInType = Cookies.get('user')

    const fetchOrders = async() => {
        const data = await api.getSellerOrderListByStatus('paid')

        return data.data
    }

    useEffect(() => {
        const getOrders = async() => {
            const ordersFromServer = await fetchOrders()
            setOrders(ordersFromServer)
        }

        getOrders()
    }, [])

    if (loggedInType === 'Seller') {
        return (
            // link to userId fav list
            <Link className='addItem-link' to='/sOrders/paid'>
                <img className='addItem-logo' src={sellerOrdersLogo} alt='logo'/>
                {/* getting orders count and pass in */}
                <Notification count={orders.length} type='cart'/>
            </Link>
        )
    }

    return (
        <Link className='addItem-link' to='/'>
            <img className='sellerOrders-logo' src={sellerOrdersLogo} alt='logo'/>
            {/* getting orders count and pass in */}
            <Notification count='0' type='cart'/>
        </Link>
    )
}

export default SellerOrders
