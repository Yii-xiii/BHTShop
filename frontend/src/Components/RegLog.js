import React from 'react'
import './RegLog.css'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import api from './Api'

const RegLog = () => {
    const navigate = useNavigate()
    let loggedInType = Cookies.get('user')
    const username = Cookies.get('username')
    const userId = Cookies.get('user_id')

    const logoutAction = async(e) => {
        e.preventDefault()
        const data = await api.logout()

        if (data.errorCode === 403) {
            console.log('not logged in yet.')
        } else {
            window.location.reload(false)
            navigate('/')
        }
    }

    if (loggedInType === 'Customer') {
        return (
            <div className='div-reglog'>
                <Link className='reglog-link' to='/'>
                    <button onClick={logoutAction} className='btn btn-reglog'>
                        登出
                    </button>
                </Link>

                <Link className='reglog-link' to='/profile'>
                    <h5 className='login-status'>{username}，已登录。</h5>
                </Link>
            </div>
        )
    } else if (loggedInType === 'Seller') {
        return (
            <div className='div-reglog'>
                <Link className='reglog-link' to='/'>
                    <button onClick={logoutAction} className='btn btn-reglog'>
                        登出
                    </button>
                </Link>

                <Link className='reglog-link' to='/sellerProfile'>
                    <h5 className='login-status'>{username}，已登录。</h5>
                </Link>
            </div>
        )
    } else if (loggedInType === 'Admin') {
        return (
            <div className='div-reglog'>
                <Link className='reglog-link' to='/'>
                    <button onClick={logoutAction} className='btn btn-reglog'>
                        登出
                    </button>
                </Link>

                <Link className='reglog-link' to='/admin'>
                    <h5 className='login-status'>管理员，已登录。</h5>
                </Link>
            </div>
        )
    }

    return (
        <div className='div-reglog'>
            <Link className='reglog-link' to='/login'>
                <button className='btn btn-reglog'>
                    登录
                </button>
            </Link>

            <Link className='reglog-link' to='/register'>
                <button className='btn btn-reglog'>
                    注册
                </button>
            </Link>
        </div>
    )
}

export default RegLog
