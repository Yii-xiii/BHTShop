import React from 'react'
import {useState, useEffect} from 'react'
import './SellerProduct.css'
import api from './Api'
import SellerProductSpec from './SellerProductSpec'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useNavigate } from 'react-router'

const SellerProduct = ({ product }) => {
    const navigate = useNavigate()
    const [image, setImages] = useState([])
    const [specs, setSpecs] = useState([])

    const fetchImages = async() => {
        const data = await api.getFirstProductImage(product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchSpecs = async() => {
        const data = await api.getProductSpecList(product.id)

        return data.data
    }

    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getSpecs = async() => {
            const specsFromServer = await fetchSpecs()
            setSpecs(specsFromServer)
        }

        getImages()
        getSpecs()
    }, [])

    const deleteProduct = async() => {
        await api.deleteProduct(product.id)

        window.location.reload(false)
    }

    return (
        <div className='seller-product-box'>
            <div className='seller-image-box'>
                <img src={ image? image.image_url : '0'} alt='img'/>
            </div>

            <div className='seller-product-specs'>
                <div className='product-title-box'>
                    <h3>{product.title}</h3>
                </div>
                
                <div className='product-spec-box'>
                    {specs.map((spec, index) => (
                        <SellerProductSpec key={index} spec={spec}/>
                    ))}

                    <div className='product-sold-amount-span-box'>
                        <span>已售出: {product.soldAmount}</span>
                    </div>
                </div>
            </div>
            
            <div className='buttons-box'>
                <button className='edit-button' onClick={() => navigate(`/product/${product.id}/edit`)}>
                    <EditOutlinedIcon />
                </button>

                <button className='delete-button' onClick={() => deleteProduct()}>
                    <DeleteOutlineOutlinedIcon />
                </button>
            </div>
        </div>
    )
}

export default SellerProduct
