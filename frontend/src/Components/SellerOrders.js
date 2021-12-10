import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './AddItem.css'
import api from './Api'
import sellerOrdersLogo from './SellerOrders.png'
import Cookies from 'js-cookie'
import Notification from './Notification'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Badge } from '@mui/material'

const SellerOrders = () => {
    const [orders, setOrders] = useState([])
    const loggedInType = Cookies.get('user')

    const fetchOrders = async() => {
        const data = await api.getSellerOrderListByStatusAndPage('paid', 1)
        return data
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
                <Badge badgeContent={orders.length} color='primary' max={99}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <AssignmentOutlinedIcon className='sellerOrders-logo' color='action'/>
                </Badge>
            </Link>
        )
    }

    return (
        <Link className='addItem-link' to='/'>
            <Badge badgeContent={orders.length} color='primary' max={99}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                <AssignmentOutlinedIcon className='sellerOrders-logo' color='action'/>
            </Badge>
            {/* getting orders count and pass in */}
        </Link>
    )
}

export default SellerOrders
