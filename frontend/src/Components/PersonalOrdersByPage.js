import React from 'react'
import api from './Api'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import PersonalOrder from './PersonalOrder'

const PersonalOrdersByPage = () => {
    const [orderList, setOrderList] = useState([])

    const fetchOrderList = async() => {
        const data = await api.getLatestCustomerOrderListByPage(Cookies.get('user_id'), 1)

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
        <div>
            {orderList.map((order, index) => (
                <PersonalOrder key={index} order={order}/>
            ))}
        </div>
    )
}

export default PersonalOrdersByPage
