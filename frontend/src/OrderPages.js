import './OrderPages.css'

import React from 'react'
import api from './Components/Api'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'

const OrderPages = () => {
    const { orderId } = useParams()
    const [orderStatus, setOrderStatus] = useState([])

    const fetchOrderStatus = async () => {
        const data = await api.getLatestOrderStatus(orderId)
        console.log(data.data[0]);
        return data.data[0]
    }


    useEffect(() => {
        const getOrderStatus = async () => {
            const orderStatusFromServer = await fetchOrderStatus()
            setOrderStatus(orderStatusFromServer)
        }

        getOrderStatus()
    }, [])

    //orderStatus.status = 'Paid';

    if (orderStatus.status === 'Paid') {
        return (
            <div className='progressButton'>
                <div className='paid'>
                    <ul>
                        <li><label><h7>已付款</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>

            </div>
        )
    }
    else if (orderStatus.status === 'Delivering') {
        return (
            <div className='progressButton'>
                <div className='paid'>
                    <ul>
                        <li><label><h7>已付款</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='delivering'>
                    <ul>
                        <li><label><h7>运输中</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
            </div>
        )
    }
    else if (orderStatus.status === 'Delivered') {
        return (
            <div className='progressButton'>
                <div className='paid'>
                    <ul>
                        <li><label><h7>已付款</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='delivering'>
                    <ul>
                        <li><label><h7>运输中</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='delivered'>
                    <ul>
                        <li><label><h7>已签收</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>


                    <button id='confirm'>确认收货</button>
                    <button id='return'>申请退货</button>
                </div>
            </div>
        )
    }
    else if (orderStatus.status === 'Returned') {
        return (
            <div className='progressButton'>
                <div className='paid'>
                    <ul>
                        <li><label><h7>已付款</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='delivering'>
                    <ul>
                        <li><label><h7>运输中</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='delivered'>
                    <ul>
                        <li><label><h7>已签收</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='returned'>
                    <ul>
                        <li><label><h7>已退货</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
            </div>
        )
    }
    else if (orderStatus.status === 'Done') {
        return (
            <div className='progressButton' >
                <div className='paid'>
                    <ul>
                        <li><label><h7>已付款</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='delivering'>
                    <ul>
                        <li><label><h7>运输中</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='delivered'>
                    <ul>
                        <li><label><h7>已签收</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>
                </div>
                <div className='done'>
                    <ul>
                        <li><label><h7>已完成</h7></label></li>
                    </ul>

                    <div className='descriptionbox'>
                        <h5>get description</h5>
                    </div>

                    <button id='confirm'>评价</button>
                </div>
            </div >
        )
    }

    return (
        <h1>error</h1>
    )

}

export default OrderPages

