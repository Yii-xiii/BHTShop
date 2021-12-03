import React from 'react'
import api from './Api'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

const SellerDetails = () => {
    let userId = Cookies.get('user_id')
    const [seller, setSeller] = useState([])

    // Fetch data from database
    const fetchSeller = async() => {
        const data = await api.getSeller(userId)
        console.log(data.data[0])
        return data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getSeller = async() => {
            const productsFromServer = await fetchSeller()
            setSeller(productsFromServer)
        }

        getSeller()
    }, [])

    return (
        <div className='details-box'>
            <div className="id-box">
                <h3>用户名:</h3>
                <span>{seller.username}</span>
            </div>

            <div className="type-box">
                <h3>用户类型:</h3>
                <span>{seller.user}</span>
            </div>

            <div className='address-box'>
                <h3>地址:</h3>
                <span>{seller.address}</span>
            </div>   

            <div className='phone-box'>
                <h3>电话 :</h3>
                <span>{seller.phoneNumber}</span>
            </div>
        </div>
    )
}

export default SellerDetails
