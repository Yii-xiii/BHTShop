import React, { useContext, useState, useEffect } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import api from './Components/Api'
import Cookies from 'js-cookie'

const SearchPage = () => {
    const keyword = Cookies.get("keyword")
    const category = Cookies.get("category")
    console.log(keyword)
    console.log(category)
    
    const [products,setProducts] = useState([{data:"??"}])
    const [page, setPage] = useState(1)

    useEffect( async () => {
        if (keyword == undefined) {
            const data = await api.randomProductListByCategory(category)
            console.log(data)
            setProducts(data.data)
        } else if (category == undefined) {
            const data = await api.searchProduct(page,keyword)
            console.log(data)
            setProducts([{data: [1,2]}])
            console.log(products)
        } else {
            const data = await api.searchProductByCategory(page,category,keyword)
            console.log(data)
            setProducts(data.data)
        }
        console.log(products)
    }, page)

    return (
        <div>
            <Header />
                Searching for {keyword}

            <Footer />
        </div>
    )
}   

export default SearchPage
