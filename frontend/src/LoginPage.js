import React from 'react'
import {useState} from 'react'
import './LoginPage.css'
import {Link} from 'react-router-dom'
import api from './Components/Api'

const LoginPage = () => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])

    const loginAction = async() => {
        const data = await api.login(username, password)

        // console.log('login: ' + data.cookies.user)
        return data.data
    }

    return (
        <div className='login'>
            <div className='login-whole-box'>
                <form className='login-box'>
                    <h1 className='form-head'>登录</h1>
                    
                    <div className='form'>
                        <label>用户名</label>
                        <input 
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            type='username'
                            placeholder='输入用户名'/>
                    </div>

                    <div className='form'>
                        <label>密码</label>
                        <input 
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            type='password' 
                            placeholder='输入密码'/>
                    </div>

                    <div className='button-submit-box'>
                        <button onClick={loginAction} type='submit' className='button-submit'>提交</button>
                    </div>

                    <div className='reg-link-box'>
                        <Link to='/register' className='reg-link'>
                            <h5>还没注册？点此注册</h5>
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
