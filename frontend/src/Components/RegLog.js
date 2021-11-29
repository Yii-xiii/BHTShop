import React from 'react'
import './RegLog.css'
import {Link} from 'react-router-dom'

const RegLog = () => {
    return (
        <div className='div-reglog'>
            <Link className='reglog-link' to='/login'>
                <button className='btn btn-reglog'>
                    注册 / 登录
                </button>
            </Link>
        </div>
    )
}

export default RegLog
