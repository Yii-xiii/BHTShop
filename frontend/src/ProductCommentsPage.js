import React from 'react'
import { useParams } from 'react-router'
import Footer from './Components/Footer'
import Header from './Components/Header'
import {useState, useEffect} from 'react'
import api from './Components/Api'
import { FormControlLabel, Pagination, Radio, RadioGroup } from '@mui/material'
import ProductComment from './Components/ProductComment'
import './ProductCommentsPage.css'

const ProductCommentsPage = () => {
    const { productId } = useParams()
    const [page, setPage] = useState(1)
    const [comments, setComments] = useState([])
    const [filter, setFilter] = useState('All')

    const handleFilterChange = (event, value) => {
        setFilter(value)
    }

    const fetchComments = async() => {
        if (filter === 'All') {
            const data = await api.getProductCommentList(productId)
            return data.data
        } else if (filter === '5Star') {
            const data = await api.getProductCommentListByRating(productId, 5)
            return data.data
        } else if (filter === '4Star') {
            const data = await api.getProductCommentListByRating(productId, 4)
            return data.data
        } else if (filter === '3Star') {
            const data = await api.getProductCommentListByRating(productId, 3)
            return data.data
        } else if (filter === '2Star') {
            const data = await api.getProductCommentListByRating(productId, 2)
            return data.data
        } else if (filter === '1Star') {
            const data = await api.getProductCommentListByRating(productId, 1)
            return data.data
        }
    }
    
    useEffect(() => {
        const getComments = async() => {
            const commentsFromServer = await fetchComments()
            setComments(commentsFromServer)
        }

        getComments()
    }, [filter])

    return (
        <div>
            <Header />
            
            <h1 className='all-comments-header-title'>所有评价</h1>

            <RadioGroup value={filter} onChange={handleFilterChange} row className="row-radio-buttons-group">
                <div className='row-radio-buttons'>
                    <FormControlLabel value="All" control={<Radio />} labelPlacement="start" label="全部" />
                    <FormControlLabel value="5Star" control={<Radio />} labelPlacement="start" label="5星" className='row-radio-button'/>
                    <FormControlLabel value="4Star" control={<Radio />} labelPlacement="start" label="4星" className='row-radio-button'/>
                    <FormControlLabel value="3Star" control={<Radio />} labelPlacement="start" label="3星" className='row-radio-button'/>
                    <FormControlLabel value="2Star" control={<Radio />} labelPlacement="start" label="2星" className='row-radio-button'/>
                    <FormControlLabel value="1Star" control={<Radio />} labelPlacement="start" label="1星" className='row-radio-button'/>
                </div>
                
            </RadioGroup>

            <div className='all-comments-show-box'>
                {
                    comments.length > 0 ? comments.map((comment, index) => (
                        <ProductComment key={index} comment={comment} type='all-comments'/>
                    )) : '' 
                }
            </div>
            

            <Footer />
        </div>
    )
}

export default ProductCommentsPage
