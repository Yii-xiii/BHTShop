import React from 'react'
import './SellerOrder.css'
import {useState, useEffect} from 'react'
import api from './Api'

const SellerOrder = ({ order }) => {
    const [image, setImages] = useState([])

    const fetchImages = async() => {
        const data = await api.getFirstProductImage(order.order.productSpec.product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        getImages()
    }, [])

    const changeFromPaidtoShipped = async() => {
        await api.createOrderStatus(order.order.id, 'shipped', 'Shipped.')
        window.location.reload(false)
    }

    if (order.status === 'paid') {
        return (
            <div>
                <div className='seller-order-page-box'>
    
                    <div className='seller-order-page-description'>
                        <div className='seller-order-page-first-row'>
                            <span>{order.order.time} | {order.status}</span>
                        </div>
                       
                        <div className='seller-order-page-second-row'>
                            <div className='seller-order-page-second-row-image'>
                                <img src={image? image.image_url : '0'} alt='img'/>
                            </div>
    
                            <div className='seller-order-page-second-row-desc'>
                                <div className='seller-order-page-second-row-details'>
                                    <h4>买家: </h4>
                                    <span>{order.order.customer.username}</span>
                                </div>
    
                                <div className='seller-order-page-second-row-details'>
                                    <h4>地址: </h4>
                                    <span>{order.order.customer.address}</span>
                                </div>
                                
                                <div className='seller-order-page-second-row-details'>
                                    <h4>商品: </h4>
                                    <span>{order.order.productSpec.product.title}</span>
                                </div>
    
                                <div className='seller-order-page-second-row-details'>
                                    <h4>规格: </h4>
                                    <span>{order.order.productSpec.description}</span>
                                </div>
                                
                                <div className='seller-order-page-second-row-details'>
                                    <h4>数量: </h4>
                                    <span>x{order.order.quantity}</span>
                                </div>
                            </div>
    
                            <div className='seller-order-page-second-row-buttons'>
                                <button className='seller-order-page-second-row-edit-item-button' onClick={() => changeFromPaidtoShipped()}>
                                    出货
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='seller-order-page-box'>

                <div className='seller-order-page-description'>
                    <div className='seller-order-page-first-row'>
                        <span>{order.order.time} | {order.status}</span>
                    </div>
                   
                    <div className='seller-order-page-second-row'>
                        <div className='seller-order-page-second-row-image'>
                            <img src={image? image.image_url : '0'} alt='img'/>
                        </div>

                        <div className='seller-order-page-second-row-desc'>
                            <div className='seller-order-page-second-row-details'>
                                <h4>买家: </h4>
                                <span>{order.order.customer.username}</span>
                            </div>

                            <div className='seller-order-page-second-row-details'>
                                <h4>地址: </h4>
                                <span>{order.order.customer.address}</span>
                            </div>
                            
                            <div className='seller-order-page-second-row-details'>
                                <h4>商品: </h4>
                                <span>{order.order.productSpec.product.title}</span>
                            </div>

                            <div className='seller-order-page-second-row-details'>
                                <h4>规格: </h4>
                                <span>{order.order.productSpec.description}</span>
                            </div>
                            
                            <div className='seller-order-page-second-row-details'>
                                <h4>数量: </h4>
                                <span>x{order.order.quantity}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerOrder
