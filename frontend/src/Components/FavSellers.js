import {useState, useEffect} from 'react'
import React from 'react'
import './FavSellers.css'
import api from './Api'
import FavSellerOptions from './FavSellerOptions'
import FavSeller from './FavSeller'
import { Pagination } from '@mui/material'

const FavSellers = () => {
    const [favSellers, setFavSellers] = useState([])
    const [favSellersByPage, setFavSellersByPage] = useState([])
    const [page, setPage] = useState(1)

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const fetchFavSellers = async() => {
        const data = await api.getLatestCustomerFollowshipList()

        // get back list of favProducts
        return data.data
    }

    const fetchFavSellersByPage = async() => {
        const data = await api.getLatestCustomerFollowshipListByPage(page)

        // get back list of favProducts
        return data.data
    }

    useEffect(() => {
        const getFavSellers = async() => {
            const productsFromServer = await fetchFavSellers()
            setFavSellers(productsFromServer)
        }

        const getFavSellersByPage = async() => {
            const productsFromServer = await fetchFavSellersByPage(page)
            setFavSellersByPage(productsFromServer)
        }

        getFavSellers()
        getFavSellersByPage()
    }, [page])

    if (favSellers.length > 0) {
        return (
            <div className='fav-box'>
                <h1>我的收藏</h1>
                
                <div className='user-fav-seller-show-box'>
                    <FavSellerOptions />
    
                    <div className='user-fav-seller-page-box'>
                        <Pagination count={favSellers.length % 10 === 0 ? Math.floor(favSellers.length / 10) : Math.ceil(favSellers.length / 10)} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                    </div>

                    <div className='user-followed-seller-show-box'>
                        {favSellersByPage.map((favSeller, index) => (
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
