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

    const addProduct = async(e) => {
        e.preventDefault()

        const uploadData = new FormData()
        uploadData.append('images',images)

        const data = await api.createProduct(title,description,category)
        const imageData = await api.createProductImage(data.data[0].id, uploadData)

        console.log(data)
        console.log(imageData)
    }

    return (
        <div>
            <Header />

            <div className="box">
                <form onSubmit={addProduct}>

                    <div class="form-group m-3" style={{margin: 'auto'}}>
                        <label>类型</label>
                        <select name="category" class="form-control" onChange={event => setCategory(event.target.value)}>
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
                            name={images.url}
                            onChange={event => setImages(event.target.files[0])}
                            type="file" 
                            multiple required/>
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
