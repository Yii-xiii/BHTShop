import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './AddItem.css'
import api from './Api'
import Cookies from 'js-cookie'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Badge } from '@mui/material'
import './SellerOrders.css'

const SellerOrders = () => {
    const [orders, setOrders] = useState([])
    const loggedInType = Cookies.get('user')

    const fetchOrders = async() => {
        const data = await api.getSellerOrderListByStatusAndPage('paid', 1)
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
                <Badge badgeContent={orders.length} color='primary' max={99}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    
                    <div className='seller-order-black-logo-top-right'>
                        <AssignmentOutlinedIcon className='sellerOrders-logo' />
                    </div>
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

                <div className='seller-order-black-logo-top-right'>
                    <AssignmentOutlinedIcon className='sellerOrders-logo' />
                </div>
            </Badge>
        </Link>
    )
}

export default SellerOrders
