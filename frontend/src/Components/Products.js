import React from 'react'
import Product from './Product'

const Products = ({ products, type }) => {
    return (
        <>
            {products.map((product, index) => (
                <Product key={index} product={product} type={type}/>
            ))}  
        </>
    )
}

export default Products
