import React from 'react'
import NavBar from './NavBar'
import RegLog from './RegLog'
import './Login.css'

const Login = () => {
    return (
        <div className='login'>
            <RegLog />
            <NavBar />

            <div className='login-whole-box'>
                <form className='login-box'>
                    <h1 className='form-head'>注册 / 登录</h1>
                    
                    <div className='form'>
                        <label>邮箱</label>
                        <input 
                            type='email' 
                            placeholder='输入邮箱'/>
                    </div>

                    <div className='form'>
                        <label>密码</label>
                        <input 
                            type='password' 
                            placeholder='输入密码'/>
                    </div>

                    <button type='submit' className='button-submit'>提交</button>
                </form>
            </div>
        </div>
    )
}

export default Login
