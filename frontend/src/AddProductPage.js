import React, { useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './AddProductPage.css'
import api from './Components/Api'
import { useNavigate } from 'react-router'

const AddProductPage = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [images,setImages] = useState([])
    const [imagePath, setImagePath] = useState([])
    const [specs,setSpecs] = useState([{description : "", price : 0, stock : 0}])
    const [errorMessage,setErrorMessage] = useState("")

    const handleSpecChange = (i, e) => {
        let newSpecs = [...specs]
        newSpecs[i][e.target.name] = e.target.value
        setSpecs(newSpecs)
    }

    const addSpec = () => {
        setSpecs([...specs, {description : "", price : 0, stock : 0}])
    }

    const deleteSpec = (i) => {
        let newSpecs = [...specs]
        let data = newSpecs.splice(i,1)
        console.log(data)
        setSpecs(newSpecs)
    }
    
    const addProduct = async(e) => {
        e.preventDefault()

        if (specs.length === 0) {
            setErrorMessage("至少输入一个规格")
        } else {
            const uploadData = new FormData()
            uploadData.append('images',images)
    
            const data = await api.createProduct(title,description,category)
            const imageData = await api.createProductImage(data.data[0].id, uploadData)

            const result = await Promise.all(specs.map(async (spec) => { 
                await api.createProductSpec(data.data[0].id, spec.description, spec.price, spec.stock)
            }))

            navigate('/sellerHome')    
        
            // const specsData = await api.getProductSpecList(data.data[0].id)
            // console.log(data)
            // console.log(imageData)
            // console.log(specsData)
        }
        
    }

    function Error() {
        if (errorMessage === "") {
            return (null)
        } else {
            return (
                <div className='alert'>
                    {errorMessage}
                </div>
            )
        }
    }

    return (
        <div>
            <Header />

            <div className="box">
                <div className='inner-box'>
                    <h1 className='add-product-title'>添加商品</h1>

                    <form onSubmit={addProduct}>
                        <Error />

                        <div class="form-type-group">
                            <h5>类型</h5>
                            <select name="category" class="form-type-select" value={category} onChange={event => setCategory(event.target.value)}>
                                <option value='none'>-----</option>

                                <option value='women clothes'>女装</option>
                                <option value='men clothes'>男装</option>
                                <option value='sports'>运动</option>
                                <option value='cosmetics'>美妆</option>
                                <option value='drinks'>饮料</option>
                                <option value='snacks'>零食</option>
                                <option value='others'>其他</option>
                                
                            </select>
                        </div>

                        <div className='form-title-group'>
                            <h5>标题</h5>

                            <div className='form-title-input'>
                                <textarea
                                    value={title}
                                    onChange={event => setTitle(event.target.value)}
                                    placeholder='输入标题' required/>
                            </div>
                        </div>

                        <div className='form-title-group'>
                            <h5>描述</h5>

                            <div className='form-title-input'>
                                <textarea 
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                    placeholder='输入描述'/>
                            </div>
                        </div>

                        <div className='form-image-group'>
                            <h5>图片</h5>

                            <div className='form-image-input'>
                                <div className='image-preview-box'>
                                    <img src={imagePath} alt='preview-img'/>
                                </div>

                                <input 
                                    name={images}
                                    onChange={event => {setImages(event.target.files[0]); setImagePath(URL.createObjectURL(event.target.files[0]))}}
                                    type="file" 
                                    accept='image/*'
                                    required/>
                            </div>
                        </div>

                        <div className='form-table'>
                            <table>
                                <tr>
                                    <th>规格</th>
                                    <th>价格</th>
                                    <th>库存</th>
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
                                                    placeholder="输入描述"
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
                                            <button onClick={() => deleteSpec(index)}>-</button>
                                        </td>
                                    </tr>
                                ))}
                            </table>

                        </div>

                        <div className='addSpecButton-box'>
                            <button onClick={addSpec}>+</button>
                        </div>

                        <div className='button-submit-box'>
                            <button onSubmit={addProduct} type='submit' className='button-submit'>提交</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
            
        </div>
    )
}

export default AddProductPage
