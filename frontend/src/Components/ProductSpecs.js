import React from 'react'
import {useState, useEffect} from 'react'
import './ProductSpecs.css'
import api from './Api'
import { useParams } from 'react-router'

const ProductSpecs = () => {
    const { productId } = useParams()
    let [specs, setSpecs] = useState([])

    const fetchSpecs = async() => {
        const data = await api.getProductSpecList(productId)
        // const data = await response.json()

        if (data !== undefined) return data.data
    }

    useEffect(() => {
        const getSpecs = async() => {
            const specsFromServer = await fetchSpecs()
            setSpecs(specsFromServer)
        }

        getSpecs()
    }, [])

    return (
        <div>
            <div className='spec-choose-box'>
                { specs ? (specs.map((spec) => (
                    <button className='spec-button'>
                        {spec.description}
                    </button>
                ))) : console.log('specs not found.')}
            </div>

            <div className='price-box'>
                {/* selected variant price */}
                <span>¥ </span>
            </div>
        </div>
    )
}

export default ProductSpecs
