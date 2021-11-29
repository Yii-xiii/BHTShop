import React from 'react'
import './RegLog.css'
import {Link} from 'react-router-dom'

const RegLog = () => {
    return (
        <Link className='reglog-link' to='/login'>
            <div className='div-reglog'>
                <button className='btn btn-reglog'>
                    注册 / 登录
                </button>
            </div> 
        </Link>
    )
}

export default RegLog
