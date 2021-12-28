import Cookies from 'js-cookie'
import './SellerOrdersPaidList.css'
import { useState, useEffect } from 'react'
import api from './Api'

const SellerOrdersPaidList = ({ order }) => {
    const [image, setImages] = useState([])
    const [returnRequest, setReturnRequest] = useState([])
    const [returnList, setReturnList] = useState([])
    const sellerId = Cookies.get('user_id')

    const fetchImages = async () => {
        const data = await api.getFirstProductImage(order.order.productSpec.product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchReturnRequest = async () => {
        const data = await api.getReturnRequest(order.order.id)
        console.log(data.data[0])
        return data.data

    }

    const fetchReturnList = async () => {
        const data = await api.getSellerLatestReturnRequestList(sellerId)
        console.log(data.data[0])
        return data.data

    }

    useEffect(() => {
        const getImages = async () => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getReturnRequest = async () => {
            const returnRequestFromServer = await fetchReturnRequest()
            setReturnRequest(returnRequestFromServer)
        }

        const getReturnList = async () => {
            const returnListFromServer = await fetchReturnList()
            setReturnList(returnListFromServer)
        }

        getImages()
        getReturnRequest()
        getReturnList()
    }, [])


    const changeFromPaidtoShipped = async () => {
        await api.createOrderStatus(order.order.id, 'shipped', 'Shipped.')
        window.location.reload(false)
    }

    function CheckReturnRequest() {
        if (returnRequest.length > 0) {
            return (returnRequest.map((request, index) => (
                (request.description === 'refunding' && request.status === 'failed') ? <PrintPaid /> : console.log("not refund pending"))))
        }
        else {
            return null;
        }
    }

    function PrintPaid() {
        return (
            <div className='seller-order-whole-box1'>
                <div className='seller-order-page-box1'>
                    <div className='seller-order-page-description'>
                        <div className='seller-order-page-first-row'>
                            <span>{order.order.time} | Paid</span>
                        </div>

                        <div className='seller-order-page-second-row'>
                            <div className='seller-order-page-second-row-image'>
                                <img src={image ? image.image_url : '0'} alt='img' />
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

    if (returnRequest.length === 0) {
        return (
            <div className='seller-box'>
                <PrintPaid />
            </div>
        )
    }
    else {
        return (
            <div className='seller-box'>
                <CheckReturnRequest />
            </div>
        )
    }
}

export default SellerOrdersPaidList