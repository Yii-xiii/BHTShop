import React from 'react'
import './ProductComments.css'
import { useParams } from 'react-router'
import {useState, useEffect} from 'react'
import api from './Api'
import ProductComment from './ProductComment'

const ProductComments = () => {
    const { productId } = useParams()
    const [comments, setComments] = useState([])

    const fetchComments = async() => {
        const data = await api.getLatestProductCommentList(productId)
        // const data = await response.json()

        console.log(data.data)
        
        return data.data
    }

    // Importing data
    useEffect(() => {
        const getComments = async() => {
            const commentsFromServer = await fetchComments()
            
            setComments(commentsFromServer)
        }

        getComments()
    }, [])

    return (
        <div className='product-review-outer-box'>
            <div className='review-title'>
                <h5>商品评价</h5>
            </div>

            <div className='reviews-box'>
                {comments.length > 0 ? comments.map((comment, index) => (
                    <ProductComment key={index} comment={comment}/>
                )) : <span>此商品暂时没有任何评价。</span>}
            </div>
        </div>
    )
}

export default ProductComments
