import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import React from 'react'
import './FavSellers.css'
import api from './Api'
import FavSellerOptions from './FavSellerOptions'
import { FavSeller } from './FavSeller'

const FavSellers = () => {
    const [favSellers, setFavSellers] = useState([])

    const fetchFavSellers = async() => {
        const data = await api.getLatestCustomerFollowshipListByPage(1)

        // get back list of favProducts
        return data.data
    }

    useEffect(() => {
        const getFavSellers = async() => {
            const productsFromServer = await fetchFavSellers()
            setFavSellers(productsFromServer)
        }

        getFavSellers()
    }, [])

    if (favSellers.length > 0) {
        return (
            <div className='fav-box'>
                <h1>我的收藏</h1>
                
                <div className='user-fav-seller-show-box'>
                    <FavSellerOptions />
    
                    <div className='user-followed-seller-show-box'>
                        {favSellers.map((favSeller, index) => (
                            <FavSeller key={index} favSeller={favSeller.seller}/>
                        ))} 
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='fav-box'>
            <h1>我的收藏</h1>
            
            <div className='user-fav-seller-show-box'>
                <FavSellerOptions />

                <div className='user-no-following-seller-show-box'>
                    <h4>您还未关注任何商店。</h4>
                </div>
            </div>
        </div>
    )
}

export default FavSellers
