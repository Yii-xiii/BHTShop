import React from 'react'
import './RegisterPage.css'
import {Link} from 'react-router-dom'

const RegisterPage = () => {


    return (
        <div className='register'>
            <div className='register-whole-box'>
                <form className='register-box'>
                    <h1 className='form-head'>注册</h1>
                    
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

                    <div className='user-type-box'>
                        <label>用户</label>
                        <input className='checkbox-box' name='user-type' type='checkbox' value='user'/>

                        <label className='in-user-type-box'>商家</label>
                        <input className='checkbox-box' name='user-type' type='checkbox' value='seller'/>
                    </div>

                    <div className='button-submit-box'>
                        <button type='submit' className='button-submit'>提交</button>
                    </div>

                    <div className='reg-link-box'>
                        <Link to='/login' className='reg-link'>
                            <h5>已有账户？点此登录</h5>
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage

