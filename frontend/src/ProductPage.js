import React from 'react'
import {useParams} from 'react-router-dom'

const ProductPage = () => {
    const { id } = useParams()

    return (
        <div>
            <h1>TODO Item:{id} Page</h1>
        </div>
    )
}

export default ProductPage
