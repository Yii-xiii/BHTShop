import React from 'react'
import './ProductComment.css'
import fiveStarLogo from './5Star.png'
import fourStarLogo from './4Star.png'
import threeStarLogo from './3Star.png'
import twoStarLogo from './2Star.png'
import oneStarLogo from './1Star.png'
import { Rating } from '@mui/material'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { useNavigate } from 'react-router'

const ProductComment = ({ comment, type }) => {
    const navigate = useNavigate()
    const commentReportPath = `/report/comment/${comment.id}`

    if (type === 'all-comments') {
        return (
            <div className='white-comment-out-box'>
                <div className='comment-box'>
                    <div className='comment-title'>
                        <h4>{comment.order.customer.username}</h4>
                        <span>购买了</span>
                        <h4>{comment.order.productSpec.description}</h4>
                    </div>
                    
                    <div className='comment-rating'>
                        <Rating size='small' value={comment.rating} readOnly/>
                    </div>
                    
                    <div className='comment-description'>
                        {comment.description}   
                    </div>
                    
                    <div className='comment-time'>
                        {comment.time}
                    </div>
                </div>
    
                <div>
                    <button className='comment-report-button' onClick={() => navigate(commentReportPath)}> 
                        <ReportOutlinedIcon />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='comment-out-box'>
            <div className='comment-box'>
                <div className='comment-title'>
                    <h4>{comment.order.customer.username}</h4>
                    <span>购买了</span>
                    <h4>{comment.order.productSpec.description}</h4>
                </div>
                
                <div className='comment-rating'>
                    <Rating size='small' value={comment.rating} readOnly/>
                </div>
                
                <div className='comment-description'>
                    {comment.description}   
                </div>
                
                <div className='comment-time'>
                    {comment.time}
                </div>
            </div>

            <div>
                <button className='comment-report-button' onClick={() => navigate(commentReportPath)}> 
                    <ReportOutlinedIcon />
                </button>
            </div>
        </div>
    )
}

export default ProductComment
