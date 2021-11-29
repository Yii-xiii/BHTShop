import React from 'react'
import Product from './Product'

const Products = ({ products }) => {
    return (
        <>
            {products.map((product, index) => (
                <Product key={index} product={product}/>
            ))}  
        </>
    )
}

export default Products
