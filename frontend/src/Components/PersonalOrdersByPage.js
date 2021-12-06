import React from 'react'
import api from './Api'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import PersonalOrder from './PersonalOrder'
import { useParams } from 'react-router'
import './PersonalOrdersByPage.css'

const PersonalOrdersByPage = () => {
    const { pageNum } = useParams()
    const [orderList, setOrderList] = useState([])

    const fetchOrderList = async() => {
        const data = await api.getLatestCustomerOrderListByPage(Cookies.get('user_id'), pageNum)
        console.log(data.data);
        return data.data
    }

    useEffect(() => {
        const getOrderList = async() => {
            const specsFromServer = await fetchOrderList()
            setOrderList(specsFromServer)
        }

        getOrderList()
    }, [])

    return (
        <div className='orders-out-box'>
            {orderList.map((order, index) => (
                <PersonalOrder key={index} order={order}/>
            ))}
        </div>
    )
}

export default PersonalOrdersByPage
