import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './PostmanOrder.css'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import api from './Api';
import Cookies from 'js-cookie';

const PostmanOrder = ({ order, orderStatusFilter }) => {
    const [address, setAddress] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [orderId, setOrderId] = useState('')
    const [orderTime, setOrderTime] = useState('')
    const [orderStatus, setOrderStatus] = useState('')
    const [orderPath, setOrderPath] = useState('')
    const [productName, setProductName] = useState('')
    const [quantity, setQuantity] = useState('')

    console.log(order)

    const fetchInitiates = async() => {
        setAddress(order.address)
        setOrderId(order.id)
        setOrderTime(order.time)
        setUsername(order.customer.username)
        setPhone(order.phoneNumber)
        setOrderPath(`/order/${order.id}`)
        setProductName(order.productSpec.product.title)
        setQuantity(order.quantity)

        if (orderStatusFilter === 'pending') {
            setOrderStatus('待派送')
        } else if (orderStatusFilter === 'delivered') {
            setOrderStatus('已完成')
        }
    }
    
    const handleDeliver = async() => {
        const description = `Delivered by ${Cookies.get('username')}`
        console.log(description)
        await api.createOrderStatus(orderId, 'delivered', description)
        window.location.reload(false)
    }

    useEffect(() => {
        const getInitiate = async() => {
            await fetchInitiates()
        }

        getInitiate()
    }, [order])

    return (
        
            <div className='postman-order-out-box'>
                <div className='postman-order-in-box'>
                    <div className='postman-order-title-box'>
                        <Link to={orderPath} className='postman-order-link'>
                            <span>{orderTime + ' | ' + orderStatus}</span>

                            <div className='postman-order-product-text-box'>
                                <h4 className='postman-order-username-show'>{productName}</h4>
                                <span className='postman-order-username-show'>x{quantity}</span>
                            </div>

                            <div className='postman-order-address-box'>
                                <LocationOnOutlinedIcon />
                                <h4>{address}</h4>
                            </div>
                            
                            <div className='postman-order-personal-info-box'>
                                <PersonOutlineOutlinedIcon />
                                <span>{username}</span>
                                <ContactPhoneOutlinedIcon />
                                <span>{phone}</span>
                            </div>
                        </Link>
                        
                        {
                            orderStatus === '待派送' ? 
                            <div className='postman-deliver-button-box'>
                                <button className='postman-deliver-action-button' onClick={() => handleDeliver()}>
                                    <h4>已完成派送</h4>
                                </button>
                            </div> : ''
                        }
                    </div>
                </div>
            </div>

    )
}

export default PostmanOrder
