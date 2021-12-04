import React from 'react'
import FavSellerOptions from './FavSellerOptions'

const FavSellers = () => {
    return (
        <div className='fav-box'>
            <h1>我的收藏</h1>
            
            <div className='fav-show-box'>
                <FavSellerOptions />
                
            </div>
        </div>
    )
}

export default FavSellers
