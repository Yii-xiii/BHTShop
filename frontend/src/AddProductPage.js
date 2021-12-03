import React, { useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './AddProductPage.css'
import api from './Components/Api'
import axios from 'axios'

const AddProductPage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [images,setImages] = useState([])
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

        if (specs.length == 0) {
            setErrorMessage("至少输入一个规格")
        } else {
            const uploadData = new FormData()
            uploadData.append('images',images)
    
            const data = await api.createProduct(title,description,category)
            const imageData = await api.createProductImage(data.data[0].id, uploadData)

            const result = await Promise.all(specs.map(async (spec) => { 
                await api.createProductSpec(data.data[0].id, spec.description, spec.price, spec.stock)
            }))

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

                <form onSubmit={addProduct}>

                    <Error />

                    <div class="form-group m-3" style={{margin: 'auto'}}>
                        <label>类型</label>
                        <select name="category" class="form-control" value={category} onChange={event => setCategory(event.target.value)}>
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

                    <div className='form'>
                        <label>标题</label>
                        <input 
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                            placeholder='输入标题' required/>
                    </div>

                    <div className='form'>
                        <label>描述</label>
                        <input 
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            placeholder='输入描述'/>
                    </div>
                    
                    <div>
                        <label>图片</label>
                        <input 
                            name={images}
                            onChange={event => setImages(event.target.files[0])}
                            type="file" 
                            required/>
                    </div>

                    <div>
                        <label>规格</label>
                        <table>
                            <tr>
                                <th>描述</th>
                                <th>价格</th>
                                <th>库存</th>
                                <th></th>
                            </tr>

                            {specs.map((spec, index) => (
                                <tr>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="description"
                                            value={spec.description}
                                            onChange={event => handleSpecChange(index, event)} 
                                            placeholder="输入描述"
                                            required/>
                                    </td>

                                    <td>
                                        <input 
                                            type="number"
                                            step="0.01" 
                                            name="price"
                                            value={spec.price}
                                            onChange={event => handleSpecChange(index, event)} 
                                            min = "0"
                                            required/>
                                    </td>

                                    <td>
                                        <input 
                                            type="number"
                                            name="stock"
                                            value={spec.stock}
                                            onChange={event => handleSpecChange(index, event)} 
                                            min = "0"
                                            required/>
                                    </td>

                                    <td>
                                        <button onClick={() => deleteSpec(index)}>-</button>
                                    </td>
                                </tr>
                            ))}
                        </table>

                    </div>

                    <div>
                        <button onClick={addSpec}>+</button>
                    </div>

                    <div className='button-submit-box'>
                        <button onSubmit={addProduct} type='submit' className='button-submit'>提交</button>
                    </div>
                </form>
            </div>

            <Footer />
            
        </div>
    )
}

export default AddProductPage
