import React, { useState } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import api from './Components/Api'

const ChangeProductImage = ({product}) => {
    const [images,setImages] = useState([])

    const changeProductImage = async(e) => {
        e.preventDefault()

        const uploadData = new FormData()
        uploadData.append('images',images)


        const old = await api.getFirstProductImage(product.id)
        const deleteOld = await api.deleteProductImage(product.id, old.data[0].id)
        const imageData = await api.createProductImage(product.id, uploadData)

        //console.log(imageData)
    }

    return (
        <div>
            <Header />

            <div className="box">
                <form onSubmit={changeProductImage}>
                    
                    <div>
                        <label>图片</label>
                        <input 
                            name={images}
                            onChange={event => setImages(event.target.files[0])}
                            type="file" 
                            multiple required/>
                    </div>

                    <div className='button-submit-box'>
                        <button onSubmit={changeProductImage} type='submit' className='button-submit'>提交</button>
                    </div>

                </form>
            </div>

            <Footer />
            
        </div>
    )
}

export default ChangeProductImage
