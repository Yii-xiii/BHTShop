import React, { useContext, useState, useEffect } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import api from './Components/Api'
import { useParams } from 'react-router'
import './SearchPage.css'
import NotFound from './Components/Notfound.png'
import Product from './Components/Product'

const SearchPage = () => {
    const inParams = useParams()
    
    const [products,setProducts] = useState([])
    const [page, setPage] = useState('1')
    const [title, setTitle] = useState('')

    useEffect(() => {
        const getProducts = async() => {
            if (inParams.keyword === 'none') {
                const data = await api.randomProductListByCategory(inParams.category)
                setProducts(data.data)
                setTitle(inParams.category)

                if (inParams.category === 'women clothes') {
                    setTitle('查找女装商品')
                } else if (inParams.category === 'men clothes') {
                    setTitle('查找男装商品')
                } else if (inParams.category === 'sports') {
                    setTitle('查找运动商品')
                } else if (inParams.category === 'cosmetics') {
                    setTitle('查找美妆商品')
                } else if (inParams.category === 'drinks') {
                    setTitle('查找饮料商品')
                } else if (inParams.category === 'snacks') {
                    setTitle('查找零食商品')
                } else if (inParams.category === 'others') {
                    setTitle('查找其他商品')
                }
            } else if (inParams.category === 'none') {
                const data = await api.searchProduct(page, inParams.keyword)
                setProducts(data.data)
                setTitle(inParams.keyword)
                setTitle('查找有关' + inParams.keyword + '的商品')
            } else if (inParams.keyword !== 'none' && inParams.category !== 'none') {
                const data = await api.searchProductByCategory(page,inParams.category,inParams.keyword)
                setProducts(data.data)
                setTitle('查找有关' + inParams.keyword + '的商品')
            }
        }

        getProducts()
    }, [])

    return (
        <div>
            <Header />

            <div className='search-products-box'>
                <h1>{title}</h1>

                <div className='search-product-out-box'>
                    {products.length === 0 ? 
                    <div className='search-result-not-found-box'>
                        <img src={NotFound} alt='img'/>
                        <h3>找不到结果</h3> 
                    </div>
                    : ''}

                    {products.length > 0 ? 
                    <div className='search-result-found-box'>
                        <div className='search-result-found-items-box'>
                            {products.map((product, index) => (
                                <Product key={index} product={product}/>
                            ))} 
                        </div>
                    </div>
                    : ''}
                </div>
            </div>
                
            <Footer />
        </div>
    )
}   

export default SearchPage
