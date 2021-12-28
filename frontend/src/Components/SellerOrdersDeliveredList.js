import './SellerOrdersDeliveredList.css'
import { useState, useEffect } from 'react'
import api from './Api'

const SellerOrdersDeliveredList = ({ order }) => {
    const [image, setImages] = useState([])
    const [returnRequest, setReturnRequest] = useState([])

    const fetchReturnRequest = async () => {
        const data = await api.getReturnRequest(order.order.id)
        console.log(data.data[0])
        return data.data

    }

    const fetchImages = async () => {
        const data = await api.getFirstProductImage(order.order.productSpec.product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
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

        getImages()
        getReturnRequest()
    }, [])

    function CheckDelivered() {
        return (
            returnRequest.length > 0 ? returnRequest.map((request, index) => (
                //console.log(request.order.productSpec.product.title, request.description, request.order.id, order.order.id)
                (request.status === "failed" && request.description === "returning") ? <PrintDelivered /> : <CheckReceived />
            )) : console.log("not delivered")
        )
    }

    function CheckReceived() {
        return (
            returnRequest.length > 0 ? returnRequest.map((request, index) => (
                //console.log(request.order.productSpec.product.title, request.description, request.order.id, order.order.id)
                (request.description === "received") ? <PrintCompleted /> : console.log("no received")
            )) : console.log("not delivered")
        )
    }

    const changeFromReceivedtoCompleted = async () => {
        await api.createOrderStatus(order.order.id, 'completed', 'Completed.')
        window.location.reload(false)
    }

    function PrintCompleted() {
        return (
            <div className='seller-order-whole-box9'>
                <div className='seller-order-page-box9'>
                    <div className='seller-order-page-description'>
                        <div className='seller-order-page-first-row'>
                            <span>{order.order.time} | Delivered</span>
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

                                <div className='seller-order-page-second-row-buttons3'>
                                    <button className='seller-order-page-second-row-edit-item-button3' onClick={() => changeFromReceivedtoCompleted()}>
                                        完成订单
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function PrintDelivered() {
        return (
            <div className='seller-order-whole-box4'>
                <div className='seller-order-page-box4'>
                    <div className='seller-order-page-description'>
                        <div className='seller-order-page-first-row'>
                            <span>{order.order.time} | Delivered</span>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (returnRequest.length === 0) {
        return (
            <PrintDelivered />
        )
    }
    else {
        return (
            <CheckDelivered />
        )
    }

    /*return (
        <div>
            <PrintDelivered />
            <CheckDelivered />
        </div>
    )*/
    return null;
}

export default SellerOrdersDeliveredList