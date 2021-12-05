import './Rating.css'

import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

const Rating = () => {

    const [images, setImages] = useState([])

    const createComment = async () => {
        //send to administrator
    }

    return (
        <div>
            <Header />

            <div className='head'>
                <h1>评价</h1>
            </div>

            <div className='ratingbox'>
                <input type="radio" name="star" id="star1"/><label for="star1"></label>
                <input type="radio" name="star" id="star2"/><label for="star2"></label>
                <input type="radio" name="star" id="star3"/><label for="star3"></label>
                <input type="radio" name="star" id="star4"/><label for="star4"></label>
                <input type="radio" name="star" id="star5"/><label for="star5"></label>
            </div>

            <div className='form-image-group'>
                <h5>图片</h5>

                <div className='form-image-input'>
                    <input
                        name={images}
                        onChange={event => setImages(event.target.files[0])}
                        type="file"
                        required />
                </div>
            </div>

            <div className='form'>
                <label className='form-label'></label>
                <input type='comment' placeholder='输入评价' />
            </div>

            <div className='button-submit-box'>
                <button onSubmit={createComment} type='submit' className='button-submit'>提交</button>
            </div>

            <Footer />
        </div>
    )
}

export default Rating
