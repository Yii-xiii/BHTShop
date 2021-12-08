import React from 'react'
import './SellerProducts.css'
import {useState, useEffect} from 'react'
import api from './Api'
import SellerProduct from './SellerProduct'

const SellerProducts = () => {
    // Initializing
    const [sellerProducts, setSellerProducts] = useState([])

    // Fetch data from database
    const fetchSellerProducts = async() => {
        const data = await api.getSellerLatestProductList()
        // const data = await response.json()

        return data.data
    }

    // Importing data
    useEffect(() => {
        const getSellerProducts = async() => {
            const productsFromServer = await fetchSellerProducts()
            setSellerProducts(productsFromServer)
        }

        getSellerProducts()
    }, [])

    if (sellerProducts.length > 0) {
        return (
            <div>
                <div className='seller-products-box'>
                    <h1>我的商品</h1>
                </div>
    
                <div className='seller-products-show-box'>
                    <div className='seller-product-header'>
                        <h2 className='seller-product-photo-title'>图片</h2>
                        <h2 className='seller-product-spec-title'>规格</h2>
                        <h2 className='seller-product-price-title'>价格</h2>
                        <h2 className='seller-product-stock-title'>库存</h2>
                        <h2 className='seller-product-sold-title'>销量</h2>
                    </div>
    
                    <div className='seller-products'>
                        {sellerProducts.length > 0 ? sellerProducts.map((product, index) => (
                            <SellerProduct key={index} product={product}/>
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
