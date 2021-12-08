import React from 'react'
import {useState} from 'react'
import './LoginPage.css'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Cookies from 'js-cookie'

const LoginPage = () => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [errorMessage,setErrorMessage] = useState("")
    const navigate = useNavigate()

    const loginAction = async(e) => {
        e.preventDefault()
        const data = await api.login(username, password)
        console.log(Cookies.get('user'))

        if (data.errorCode === 403) {
            console.log(data)
            setPassword('')
            setErrorMessage("Invalid username or password.")
        } else {
            if (Cookies.get('user') === 'Customer') {
                navigate('/')
            } else if (Cookies.get('user') === 'Seller') {
                navigate('/sellerHome')
            } else if (Cookies.get('user') === 'Admin') {
                navigate('/admin')
            }
        }
    }

    function Error() {
        if (errorMessage === "") {
            return (null)
        } else {
            return (
                <div className='alert'>
                    {errorMessage}
                </div>
            )
        }
    }
    
    return (
        <div className='login'>
            <Header />

            <div className='login-whole-box'>
                <form className='login-box' onSubmit={loginAction}>
                    <h1 className='form-head'>登录</h1>

                    <Error />
                    
                    <div className='form'>
                        <label>用户名</label>
                        <input 
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            type='username'
                            placeholder='输入用户名' required/>
                    </div>

                    <div className='form'>
                        <label>密码</label>
                        <input 
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            type='password' 
                            placeholder='输入密码' required/>
                    </div>

                    <div className='button-submit-box'>
                        <button onSubmit={loginAction} type='submit' className='button-submit'>提交</button>
                    </div>

                    <div className='reg-link-box'>
                        <Link to='/register' className='reg-link'>
                            <h5>还没注册？点此注册</h5>
                        </Link> 
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default LoginPage
