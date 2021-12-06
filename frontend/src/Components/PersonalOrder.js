import React from 'react'
import api from './Api'
import './PersonalOrder.css'
import {useState, useEffect} from 'react'
import DeliveryLogo from './Delivery.png'
import StoreLogo from './Store.png'
import { Link } from 'react-router-dom'

const PersonalOrder = ({ order }) => {
    const [orderStatus, setOrderStatus] = useState([])
    const [image, setImages] = useState([])

    const fetchOrderStatus = async() => {
        const data = await api.getLatestOrderStatus(order.id)
        console.log(data.data[0]);
        return data.data[0]
    }

    const fetchImages = async() => {
        const data = await api.getFirstProductImage(order.productSpec.product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    useEffect(() => {
        const getOrderStatus = async() => {
            const orderStatusFromServer = await fetchOrderStatus()
            setOrderStatus(orderStatusFromServer)
        }

        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        getOrderStatus()
        getImages()
    }, [])

    const orderPath = `/order/${order.id}`

    return (
        <div>
            <Link className='order-link' to={orderPath}>
            <div className='order-show-box'>
                <div className='order-image-box'>
                    <img src={ image? image.image_url : '0'} alt='img'/>
                </div>
                
                <div className='order-description-box'>                    
                    <div className='seller-description'>
                        <img className='seller-logo' src={StoreLogo} alt='img'/>
                        <span>{order.productSpec.product.seller.username}</span>
                    </div>

                    <div className='order-description'>
                        <h3>{order.productSpec.product.title}</h3>
                    </div>

                    <div className='order-description'>
                        <span className='order-description-text'>{order.productSpec.product.description}</span>
                    </div>

                    <div className='order-description'>
                        <span className='order-quantity'>x{order.quantity}</span>
                    </div>

                    <div className='order-description'>
                        <span className='order-price'>¥ {order.totalPrice}</span>
                    </div>

                    <div className='delivery-status'>
                        <img className='delivery-status-logo' src={DeliveryLogo} alt='img'/>
                        <span>{orderStatus.status}</span>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default PersonalOrder
