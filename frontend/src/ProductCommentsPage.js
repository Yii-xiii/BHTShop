import React from 'react'
import { useParams } from 'react-router'
import Footer from './Components/Footer'
import Header from './Components/Header'
import {useState, useEffect} from 'react'
import api from './Components/Api'
import { Pagination } from '@mui/material'

const ProductCommentsPage = () => {
    const { productId } = useParams()
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)

    const handleChange = (event, value) => {
        setPage(value)
    }

    const fetchProducts = async() => {
        const data = await api.getProductListByPage(page) 
        console.log(data.data)
        return data.data
    }

    useEffect(() => {
        const getProducts = async() => {
            const productsFromServer = await fetchProducts()
            setProducts(productsFromServer)
        }

        getProducts()
    }, [page])

    return (
        <div>
            <Header />
            <Pagination count={10} page={page} onChange={handleChange} />
            <h1>{page}</h1>
            {
                products.map((product, index) => (
                    <span>{product.title}</span>
                ))
            }
             <h1>TODO PRODUCT {productId} COMMENTS</h1>
            <Footer />
        </div>
    )
}

export default ProductCommentsPage
