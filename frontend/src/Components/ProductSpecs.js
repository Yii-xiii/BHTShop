import React from 'react'
import {useState, useEffect} from 'react'
import './ProductSpecs.css'
import api from './Api'
import { useParams } from 'react-router'

const ProductSpecs = () => {
    const { productId } = useParams()
    const [specs, setSpecs] = useState([])
    const [price, setPrice] = useState('0.00')

    const fetchSpecs = async() => {
        const data = await api.getProductSpecList(productId)
        // const data = await response.json()

        if (data !== undefined) return data.data
    }

    useEffect(() => {
        const getSpecs = async() => {
            const specsFromServer = await fetchSpecs()
            setSpecs(specsFromServer)
            setPrice(specsFromServer[0].price)
        }

        getSpecs()
    }, [])

    const changePrice = (newPrice) => {
        setPrice(newPrice)
    }

    return (
        <div>
            <div className='spec-choose-box'>
                { specs ? (specs.map((spec, index) => (
                    <button key={index} onClick={() => changePrice(spec.price)}>
                        {spec.description}
                    </button>
                ))) : console.log('specs not found.')}
            </div>

            <div className='price-box'>
                {/* selected variant price */}
                <span>¥ {price}</span>
            </div>

            <div className='add-to-cart-box'>
                <button>
                    加入购物车
                </button>
            </div>
        </div>
    )
}

export default ProductSpecs
