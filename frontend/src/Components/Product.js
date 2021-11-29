import React from 'react'

const Product = ({ product }) => {
    return (
        <div>
            <h3>{product.title}</h3>
            <h5>{product.description}</h5>
        </div>
    )
}

export default Product
