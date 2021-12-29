import Cookies from 'js-cookie'
import './SellerOrdersRefundingList.css'
import { useState, useEffect } from 'react'
import api from './Api'

const SellerOrdersRefundingList = ({ order }) => {
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


    const changeFromPendingtoSuccess = async () => {
        console.log(order.order.id, "pending to success")
        await api.sellerUpdateReturnRequest(order.order.id, 'succesful')
        window.location.reload(false)
    }

    const changeFromPendingtoFailed = async () => {
        console.log(order.order.id, "pending to failed")
        await api.sellerUpdateReturnRequest(order.order.id, 'failed')
        window.location.reload(false)
    }

    function CheckRefundPending() {
        return (
            returnRequest.length > 0 ? returnRequest.map((request, index) => (
                (request.description === 'refunding' && request.status === "pending") ? <PrintRefunding /> : console.log("not refund pending")
            )) : console.log("not refund pending")
        )
    }

    function PrintRefunding() {
        return (
            <div className='seller-order-whole-box13'>
                <div className='seller-order-page-box13'>
                    <div className='seller-order-page-description'>
                        <div className='seller-order-page-first-row'>
                            <span>{order.order.time} | Refunding</span>
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

                            <div className='seller-order-button-box'>
                                <div className='seller-order-page-second-row-buttons'>
                                    <button className='seller-order-page-second-row-edit-item-button' onClick={() => changeFromPendingtoSuccess()}>
                                        退款
                                    </button>
                                </div>
                                <div className='seller-order-page-second-row-buttons1'>
                                    <button className='seller-order-page-second-row-edit-item-button1' onClick={() => changeFromPendingtoFailed()}>
                                        拒绝
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (returnRequest.length > 0) {
        return (
            <CheckRefundPending />
        )
    }
    else {
        return null;
    }
}

export default SellerOrdersRefundingList