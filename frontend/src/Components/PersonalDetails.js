import Cookies from 'js-cookie'
import api from './Api'
import {useState, useEffect} from 'react'
import React from 'react'
import './PersonalDetails.css'

const PersonalDetails = () => {
    let userId = Cookies.get('user_id')
    const [customer, setCustomer] = useState([])

    // Fetch data from database
    const fetchCustomer = async() => {
        const data = await api.getCustomer(userId)
        console.log(data.data[0])
        return data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getCustomer = async() => {
            const productsFromServer = await fetchCustomer()
            setCustomer(productsFromServer)
        }

        getCustomer()
    }, [])

    return (
        <div className='details-box'>
            <div className="id-box">
                <h3>用户名:</h3>
                <span>{customer.username}</span>
            </div>

            <div className="type-box">
                <h3>用户类型:</h3>
                <span>{customer.user}</span>
            </div>

            <div className='address-box'>
                <h3>地址:</h3>
                <span>{customer.address}</span>
            </div>   

            <div className='phone-box'>
                <h3>电话 :</h3>
                <span>{customer.phoneNumber}</span>
            </div>
        </div>
    )
}

export default PersonalDetails
