import React from 'react'
import './ProductComment.css'
import fiveStarLogo from './5Star.png'
import fourStarLogo from './4Star.png'
import threeStarLogo from './3Star.png'
import twoStarLogo from './2Star.png'
import oneStarLogo from './1Star.png'

const ProductComment = ({ comment }) => {
    let photo
    
    if (comment.rating === 5) {
        photo = fiveStarLogo
    } else if (comment.rating === 4) {
        photo = fourStarLogo
    } else if (comment.rating === 3) {
        photo = threeStarLogo
    } else if (comment.rating === 2) {
        photo = twoStarLogo
    } else if (comment.rating === 1) {
        photo = oneStarLogo
    }

    return (
        <div>
            <div className='comment-box'>
                <div className='comment-title'>
                    <h4>{comment.order.customer.username}</h4>
                    <span>购买了</span>
                    <h4>{comment.order.productSpec.description}</h4>
                </div>
                
                <div className='comment-rating'>
                    <img src={photo} alt='img'/>
                </div>
                
                <div className='comment-description'>
                    {comment.description}   
                </div>
                
                <div className='comment-time'>
                    {comment.time}
                </div>
                
            </div>
            
        </div>
    )
}

export default ProductComment
