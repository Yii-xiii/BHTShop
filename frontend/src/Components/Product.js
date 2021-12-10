import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Product.css'
import api from './Api'
import { Box, sizeHeight } from '@mui/system'
import { Badge } from '@mui/material'

const Product = ({ product, type, count }) => {
    // Initializing
    const [image, setImages] = useState([])
    const [spec, setSpec] = useState([])

    // Fetch data from database
    const fetchImages = async() => {
        const data = await api.getFirstProductImage(product.id)

        if (data !== undefined) return data.errorCode === '404' ? (console.log('image not found')) : data.data[0]
    }

    const fetchSpec = async() => {
        const data = await api.getProductSpecList(product.id)
        // const data = await response.json()
        
        if (data !== 'undefined') return data.data[0]
    } 

    // Importing data
    useEffect(() => {
        const getImages = async() => {
            const imageFromServer = await fetchImages()
            setImages(imageFromServer)
        }

        const getSpec = async() => {
            const specsFromServer = await fetchSpec()
            setSpec(specsFromServer)
        }

        getImages()
        getSpec()
    }, [product])

    const path = `/product/${product.id}`

    if (type === 'ranked') {
        return (
            <div className='product-out-box'>
                {product.title.length > 0 ? (
                    <Link to={path}>
                            <Box className='product-box'>
                                <Badge badgeContent={count} color='success'
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            color: "black",
                                            backgroundColor: "silver"
                                        }
                                    }}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}>
                                    <div className='image-box'>
                                        <img src={ image? image.image_url : '0'} alt='img'/>
                                    </div>
                                </Badge>
        
                                <h3 className='title-text'>{product.title}</h3>
                                <h5 className='desc-text'>已售出 {product.soldAmount} 件</h5>
                            </Box>
                    </Link>
                ) : console.log('Empty title product found.')}
            </div>
        )
    }

    return (
        <div className='product-out-box'>
            {product.title.length > 0 ? (
                <Link to={path}>
                    <Box className='product-box'>
                            <div className='image-box'>
                                <img src={ image? image.image_url : '0'} alt='img'/>
                            </div>

                            <h3 className='title-text'>{product.title}</h3>
                            <h5 className='desc-text'>¥ {spec.price}</h5>
                    </Box>
                </Link>
            ) : console.log('Empty title product found.')}
        </div>
    )
}

export default Product
