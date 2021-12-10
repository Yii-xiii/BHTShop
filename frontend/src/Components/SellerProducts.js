import React from 'react'
import './SellerProducts.css'
import {useState, useEffect} from 'react'
import api from './Api'
import SellerProduct from './SellerProduct'
import Cookies from 'js-cookie'
import { Pagination } from '@mui/material'

const SellerProducts = () => {
    const sellerId = Cookies.get('user_id')

    // Initializing
    const [sellerProducts, setSellerProducts] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    // Fetch data from database
    const fetchSellerProducts = async() => {
        const data = await api.getSellerLatestProductListByPage(sellerId, page)
        // const data = await response.json()
        return data
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    // Importing data
    useEffect(() => {
        const getSellerProducts = async() => {
            const productsFromServer = await fetchSellerProducts()
            setSellerProducts(productsFromServer.data)
            setPageCount(productsFromServer.pageCount)
        }

        getSellerProducts()
    }, [page])

    if (sellerProducts.length > 0) {
        return (
            <div>
                <div className='seller-products-box'>
                    <h1>我的商品</h1>
                </div>
    
                <div className='seller-products-show-box'>
                    <div className='seller-products-page-box'>
                        <Pagination count={pageCount} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                    </div>
    
                    <div className='seller-products'>
                        {sellerProducts.length > 0 ? sellerProducts.map((product, index) => (
                            <SellerProduct key={index} product={product} page={page}/>
                        )) : console.log('Nothing to show.')}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='seller-products-box'>
                <h1>我的商品</h1>
            </div>

            <div className='seller-products-show-box'>
            <h3 className='seller-products-show-box-no-item-show-1'>您的商店目前没有任何商品，</h3>
                <h3 className='seller-products-show-box-no-item-show-2'>请点击右上方的添加图标添加商品哦。</h3>
            </div>
        </div>
    )
}

export default SellerProducts
