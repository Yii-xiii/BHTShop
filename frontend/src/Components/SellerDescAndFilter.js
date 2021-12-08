import React from 'react'
import { useParams } from 'react-router'
import api from './Api'
import {useState, useEffect} from 'react'
import './SellerDescAndFilter.css'

const SellerDescAndFilter = () => {
    const {sellerId} = useParams()

    const [seller, setSeller] = useState([])

    // Fetch data from database
    const fetchSeller = async() => {
        const data = await api.getSeller(sellerId)
        // const data = await response.json()
        return data.data[0]
    }

    // Importing data
    useEffect(() => {
        const getSeller = async() => {
            const sellerFromServer = await fetchSeller()
            setSeller(sellerFromServer)
        }

        getSeller()
    }, [])

    return (
        <div className='seller-desc-and-filter-outer-box'>
            <div className='seller-desc-box'>
                <h2>{seller.username}</h2>
                
                <div className='seller-desc-texts-box'>
                    <h4>注册于: </h4>
                    <span>{seller.joinDate}</span>
                </div>

                <div className='seller-desc-texts-box'>
                    <h4>粉丝数: </h4>
                    <span> 0</span>
                </div>

                <div className='seller-desc-texts-box'>
                    <h4>评价: </h4>
                    <span> 0</span>
                </div>

                <div className='seller-desc-buttons-box'>
                    <button className='seller-desc-follow-button'>
                        关注
                    </button>

                    <button className='seller-desc-report-button'>
                        举报
                    </button>
                </div>
            </div>

            <div className='seller-filter-box'>
                <div className='seller-filter-by-type-box'>
                    <h3>按种类排序</h3>
                    <span>女装</span>
                    <span>男装</span>
                    <span>运动</span>
                    <span>美妆</span>
                    <span>饮料</span>
                    <span>零食</span>
                    <span>其他</span>
                </div>

                <div className='seller-filter-by-rating-box'>
                    <h3>按评价排序</h3>
                    <span>由低到高</span>
                    <span>由高到低</span>
                </div>

                <div className='seller-filter-by-price-box'>
                    <h3>按价格排序</h3>
                    <span>由低到高</span>
                    <span>由高到低</span>
                </div>
            </div>
        </div>
    )
}

export default SellerDescAndFilter
