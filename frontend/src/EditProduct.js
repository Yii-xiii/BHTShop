import React, { useEffect, useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import api from './Components/Api'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import './EditProduct.css'
import { TextareaAutosize } from '@mui/material'

const EditProduct = () => {
    const navigate = useNavigate()
    const inParams = useParams()
    const [product, setProduct] = useState([])
    const [specs,setSpecs] = useState([])
    const [dltSpecs, setDltSpecs] = useState([])
    const [image,setImage] = useState('')
    const [images,setImages] = useState([])
    const [imagePath, setImagePath] = useState([])
    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [category, setCategory] = useState('')
    const [errorMessage,setErrorMessage] = useState("")
    const [status,setStatus] = useState(0)
    const [changeImage, setChangeImage] = useState(false)

    useEffect(() => {
        const getProduct = async() => {
            const prod = await api.getProduct(inParams.productId)
            console.log(prod.data[0])
            setProduct(prod.data[0])

            const specs = await api.getProductSpecList(inParams.productId)
            console.log(specs.data)
            setSpecs(specs.data)

            const img = await api.getFirstProductImage(inParams.productId)
            console.log(img.data[0])
            setImage(img.data[0])
            setImagePath(img.data[0].image_url)
            setStatus(1)
        }

        getProduct()
    }, [])

    const handleSpecChange = (i, e) => {
        let newSpecs = [...specs]
        newSpecs[i][e.target.name] = e.target.value
        setSpecs(newSpecs)
    }

    const addSpec = () => {
        setSpecs([...specs, {description : "", price : 0, stock : 0}])
    }

    const deleteSpec = async (i, e) => {
        e.preventDefault()

        let newSpecs = [...specs]
        let data = newSpecs.splice(i,1)
        console.log(data)
        setDltSpecs(prev => [...prev, data])
        setSpecs(newSpecs)
        console.log(specs)
        console.log(dltSpecs)
    }

    const submitProduct = async(e) => {
        e.preventDefault()

        console.log(product)
        console.log(specs)
        // const data = await api.updateProduct(title,description,category)

        // console.log(data)

        if (specs.length === 0) {
            setErrorMessage("????????????????????????")
        } else {
            if (changeImage) {            
                const uploadData = new FormData()
                uploadData.append('images',images)
                const dltImg = await api.deleteProductImage(product.id, image.id)
                const imageData = await api.createProductImage(product.id, uploadData)
            }
            const data = await api.updateProduct(product.id,product.title,product.description,product.category)

            const result = await Promise.all(specs.map(async (spec) => {
                if (spec.id == undefined) {
                    await api.createProductSpec(product.id, spec.description, spec.price, spec.stock)
                } else {
                    await api.updateProductSpec(product.id, spec.id, spec.description, spec.price, spec.stock)
                }
            }))

            const dltSpec = await Promise.all(dltSpecs.map(async (spec) => {
                console.log(spec[0].id)
                if (spec[0].id != undefined) {
                    await api.deleteProductSpec(product.id,spec[0].id)
                }
            }))

            navigate('/sellerHome')    
        
            // const specsData = await api.getProductSpecList(data.data[0].id)
            // console.log(data)
            // console.log(imageData)
            // console.log(specsData)
        }
    }

    const handleImageChange = () => {
        if (changeImage) {
            setImagePath(image.image_url)
            setImages([])
        }
        setChangeImage(prev => !prev)
    }

    function ChangeImage() {
        if (changeImage) {
            return (
                <div className='form-image-group'>
                    {/* <h5>????????????</h5> */}

                    <div className='form-image-input'>
                        {/* <div className='image-preview-box'>
                            <img src={imagePath} alt='preview-img'/>
                        </div> */}

                        <input 
                            name={images}
                            onChange={event => {setImages(event.target.files[0]); setImagePath(URL.createObjectURL(event.target.files[0])); console.log(images)}}
                            type="file" 
                            accept='image/*'
                            value={images.name}
                            required/>
                    </div>
                </div>
            )
        } else {
            return(null)
        }
    }

    return (
        <div>
            <Header />
                <div className='edit-product-outmost-box'>
                
                
                {status === 0 ? <h1>?????????</h1> : 

                        <div className="edit-product-outer-box">
                            <h1>????????????</h1>
                            <form onSubmit={submitProduct}>

                                <div className='edit-product-preview-box'>
                                    <img src={imagePath} alt='edit-product-preview-img' className="product-image"/>
                                </div>

                                <div className='edited-image-button-submit-box'>
                                    {/* <button onClick={() => {handleImageChange()}} >????????????</button> */}
                                    <input
                                        type="checkbox"
                                        value={changeImage}
                                        onClick={() => {handleImageChange()}} />
                                    <span>????????????</span>
                                </div>

                                <div className='choose-image-button-box'>
                                    <input 
                                        name={images}
                                        onChange={event => {if (changeImage) {setImages(event.target.files[0]); setImagePath(URL.createObjectURL(event.target.files[0]));}}}
                                        type="file"
                                        accept='image/*'/>
                                </div>

                                <div class="edit-item-type-form-box">
                                    <h4>??????</h4>
                                    <select name="category" className="edit-item-type-form-box-control" value={product.category} onChange={event => setProduct(prev => ({...prev, category : event.target.value}))}>
                                        <option value='none'>-----</option>

                                        <option value='women clothes'>??????</option>
                                        <option value='men clothes'>??????</option>
                                        <option value='sports'>??????</option>
                                        <option value='cosmetics'>??????</option>
                                        <option value='drinks'>??????</option>
                                        <option value='snacks'>??????</option>
                                        <option value='others'>??????</option>
                                        
                                    </select>
                                </div>

                                <div className='edit-product-title-area-box'>
                                    <h4>??????</h4>
                                    <TextareaAutosize 
                                        className='edit-product-text-area-box'
                                        value={product.title}
                                        onChange={event => setProduct(prev => ({...prev, title : event.target.value}))}
                                        placeholder='????????????' required/>
                                </div>

                                <div className='edit-product-title-area-box'>
                                    <h4>??????</h4>
                                    <TextareaAutosize 
                                        className='edit-product-desc-area-box'
                                        value={product.description}
                                        onChange={event => setProduct(prev => ({...prev, description : event.target.value}))}
                                        placeholder='????????????'/>
                                </div>

                                <div className='edit-product-form-table'>
                                    <table>
                                        <tr>
                                            <th>??????</th>
                                            <th>??????</th>
                                            <th>??????</th>
                                            <th></th>
                                        </tr>

                                        {specs.map((spec, index) => (
                                            <tr>
                                                <td>
                                                    <div className='spec-form'>
                                                        <input 
                                                            className='spec-description'
                                                            type="text" 
                                                            name="description"
                                                            value={spec.description}
                                                            onChange={event => handleSpecChange(index, event)} 
                                                            placeholder="????????????"
                                                            required/>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='spec-form'>
                                                        <input 
                                                            className='spec-price'
                                                            type="number"
                                                            step="0.01" 
                                                            name="price"
                                                            value={spec.price}
                                                            onChange={event => handleSpecChange(index, event)} 
                                                            min = "0"
                                                            required/>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='spec-form'>
                                                        <input 
                                                            className='spec-stock'
                                                            type="number"
                                                            name="stock"
                                                            value={spec.stock}
                                                            onChange={event => handleSpecChange(index, event)} 
                                                            min = "0"
                                                            required/>
                                                    </div>
                                                </td>

                                                <td>
                                                    <button className='edit-delete-spec-button' onClick={event => deleteSpec(index, event)}>-</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className='addSpecButton-box'>
                                    <button onClick={addSpec}>+</button>
                                </div>

                                <div className='edit-button-submit-box'>
                                    <button onSubmit={submitProduct} type='submit' className='edit-product-button-submit'>??????</button>
                                    <button onClick={() => navigate('/sellerHome')} className='cancel-edit-product-button-submit'>??????</button>
                                </div>

                            </form>
                        </div>

                }          

                </div>       
                {console.log(product)}
            <Footer />
            
        </div>
    )
}

export default EditProduct
