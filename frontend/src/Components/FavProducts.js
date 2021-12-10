import {useState, useEffect} from 'react'
import './FavProducts.css'
import api from './Api'
import FavProduct from './FavProduct'
import FavProductOptions from './FavProductOptions'
import { Pagination } from '@mui/material'

const FavProducts = () => {
    // Initializing
    const [favProductsByPage, setFavProductsByPage] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(1)

    // Fetch data from database

    const fetchFavProductsByPage = async() => {
        const data = await api.getLatestCustomerCollectionListByPage(page)
        // get back list of favProducts
        return data
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    useEffect(() => {

        const getFavProductsByPage = async() => {
            const productsFromServer = await fetchFavProductsByPage()
            setFavProductsByPage(productsFromServer.data)
            setPageCount(productsFromServer.pageCount)
        }

        getFavProductsByPage()
    }, [page])

    return (
        <div className='fav-box'>
            <h1>我的收藏</h1>
            
            <div className='fav-show-box'>
                <FavProductOptions />

                <div className='fav-list-page-box'>
                    <Pagination count={pageCount} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                </div>
                
                <div className='fav-list-box'>
                    {favProductsByPage.map((favProduct, index) => (
                        <FavProduct key={index} favProduct={favProduct.product}/>
                    ))} 
                </div>
                
            </div>
        </div>
    )
}

export default FavProducts
