import React from 'react'
import Product from './Product'

const Products = ({ products, type }) => {
    let count = 1

    return (
        <>
            {products.map((product, index) => (
                <Product key={index} product={product} type={type} count={count++}/>
            ))}  
        </>
    )
}

export default Products
