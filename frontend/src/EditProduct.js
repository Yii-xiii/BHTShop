import React, { useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import api from './Components/Api'

const EditProduct = ({product}) => {
    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)
    const [category, setCategory] = useState(product.category)

    const editProduct = async(e) => {
        e.preventDefault()

        const data = await api.updateProduct(title,description,category)

        console.log(data)
    }

    return (
        <div>
            <Header />

            <div className="box">
                <form onSubmit={editProduct}>

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

                    <div className='button-submit-box'>
                        <button onSubmit={editProduct} type='submit' className='button-submit'>提交</button>
                    </div>
                </form>
            </div>

            <Footer />
            
        </div>
    )
}

export default EditProduct
