import React from 'react'
import {useState, useEffect} from 'react'
import './ProductSpecs.css'
import api from './Api'
import { useParams } from 'react-router'

const ProductSpecs = () => {
    const { productId } = useParams()
    const [specs, setSpecs] = useState([])
    const [price, setPrice] = useState('0.00')
    const [stock, setStock] = useState('')
    const [selectedSpec, setSelectedSpec] = useState('')
    const [quantity, setQuantity] = useState('1')

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
            setStock(specsFromServer[0].stock)
            setSelectedSpec(specsFromServer[0].id)
            setQuantity('1')
        }

        getSpecs()
    }, [])

    const changeStatus = (newPrice, newStock, newId) => {
        setPrice(newPrice)
        setStock(newStock)
        setSelectedSpec(newId)
        setQuantity('1')
    }

    const changeQuantity = (event) => {
        let value = event.target.value
        setQuantity(value)
    }

    return (
        <div>
            <div className='price-box'>
                <span>¥ {price}</span>
            </div>

            <div className='spec-choose-box'>
                { specs ? (specs.map((spec, index) => (
                    <button key={index} onClick={() => changeStatus(spec.price, spec.stock, spec.id, '1')}>
                        {spec.description}
                    </button>
                ))) : console.log('specs not found.')}
            </div>

            <div className='quantity-box'>
                <span>数量: </span>

                <input 
                    className='quantity-selection'
                    type="number"
                    name="stock"
                    min = "1"
                    max = {stock}
                    value={quantity}
                    onChange={event => changeQuantity(event)} 
                    required/>

                selected: {quantity}
            </div>

            <div className='add-to-cart-box'>
                <button>
                    加入购物车
                </button>
                
                <span>库存: {stock}</span>
            </div>
        </div>
    )
}

export default ProductSpecs
