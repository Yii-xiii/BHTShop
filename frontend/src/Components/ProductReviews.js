import React from 'react'
import './ProductReviews.css'
import { useParams } from 'react-router'
import {useState, useEffect} from 'react'
import api from './Api'

const ProductReviews = () => {
    const { productId } = useParams()
    const [comments, setComments] = useState([])

    const fetchComments = async() => {
        const data = await api.getProductCommentList(productId)
        // const data = await response.json()
        
        return data
    }

    // Importing data
    useEffect(() => {
        const getComments = async() => {
            const productFromServer = await fetchComments()
            
        }

        getComments()
    }, [])

    return (
        <div className='product-review-outer-box'>
            <div className='review-title'>
                <h5>商品评价</h5>
            </div>
        </div>
    )
}

export default ProductReviews
