import React from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import PostmanGraph from './Components/PostmanGraph'
import PostmanWorkspace from './Components/PostmanWorkspace'
import './PostmanHomePage.css'

const PostmanHomePage = () => {
    return (
        <div>
            <Header />
            <PostmanGraph />
            <div className='postman-page-workspace-limit-box'>
                <PostmanWorkspace />
            </div>
            
            <Footer />
        </div>
    )
}

export default PostmanHomePage
