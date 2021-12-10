import React, { useState } from 'react'
import './RegisterPage.css'
import {Link, useNavigate} from 'react-router-dom'
import api from './Components/Api'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Cookies from 'js-cookie'
import HomePage from './HomePage'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import HomeIcon from '@mui/icons-material/Home'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [username,setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [phoneNum, setPhoneNumber] = useState([])
    const [address, setAddress] = useState([])
    const [seller, setSeller] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [registerType, setRegisterType] = useState('customer')

    const validUsername = /^[A-Za-z0-9._]+$/;
    const validPassword = /^[A-Za-z0-9._]+$/;
    const validPhoneNumber = /^[0-9]+$/;

    const loginAction = async() => {
        const data = await api.login(username, password)

        if (data.errorCode === 403) {
            console.log(data)
            setPassword('')
            setErrorMessage("Invalid username or password.")
        } else {
            if (Cookies.get('user') === 'Customer') {
                navigate('/')
            } else if (Cookies.get('user') === 'Seller') {
                navigate('/sellerHome')
            } else if (Cookies.get('user') === 'Postman') {
                navigate('/postHome')
            }
        }
    }

    const handleTypeChange = (event, value) => {
        setRegisterType(value)
    }

    const createUser = async (e) => {
        e.preventDefault()

        console.log(username + " " + password + " " + phoneNum + " " + address)

        if (!validUsername.test(username)) {
            setErrorMessage("Invalid username : Only [A-Z,a-z,0-9,.,_] are allowed.")
        } else if (!validPassword.test(password)) {
            setErrorMessage("Invalid password : Only [A-Z,a-z,0-9,.,_] are allowed.")
        } else if (!validPhoneNumber.test(phoneNum)) {
            setErrorMessage("Invalid phone number : Only [0-9] are allowed.")
        } else {
            setErrorMessage("")
            //console.log(data)

            var data
            if (registerType === 'seller') {
                data = await api.createSeller(username, password,phoneNum,address)
                console.log(data)
            } else if (registerType === 'customer') {
                data = await api.createCustomer(username, password,phoneNum,address)
                console.log(data)
            } else if (registerType === 'postman') {
                data = await api.createPostman(username, password, phoneNum, address)
                console.log(data)
            }

            if (data.errorCode === 400) {
                setErrorMessage("Username already exists")
            } else {
                //TODO
                loginAction()
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

    const isCustomer = (e) => {
        setSeller(false)
    }

    const isSeller = (e) => {
        setSeller(true)
    }

    const loggedInType = Cookies.get('user')

    if (loggedInType === 'Customer') {
        return (
            <HomePage />
        )
    }

    return (
        <div className='register'>
            <Header />

            <div className='register-whole-box'>
                <form className='register-box' onSubmit={createUser}>
                    <h1 className='register-form-head'>注册</h1>

                    <Error />

                    <div className='register-form'>
                        <label className='form-label' ><AccountCircleIcon /></label>
                        <input
                            onChange={event => setUsername(event.target.value)}
                            type='username'
                            placeholder='输入用户名'/>
                    </div>

                    <div className='register-form'>
                        <label className='form-label'><LockIcon /></label>
                        <input
                            onChange={event => setPassword(event.target.value)}
                            type='password'
                            placeholder='输入密码'/>
                    </div>

                    <div className='register-form'>
                        <label className='form-label'><ContactPhoneIcon /></label>
                        <input
                            onChange={event => setPhoneNumber(event.target.value)}
                            type='phoneNumber'
                            placeholder='输入电话号码'/>
                    </div>

                    <div className='register-form'>
                        <label className='form-label'><HomeIcon /></label>
                        <input
                            onChange={event => setAddress(event.target.value)}
                            type='address'
                            placeholder='输入地址'/>
                    </div>

                    <div className='user-type-box'>

                        <RadioGroup value={registerType} onChange={handleTypeChange} row className="reg-row-radio-buttons-group">
                            <FormControlLabel labelPlacement="start" value="customer" control={<Radio />} label="用户" />
                            <FormControlLabel labelPlacement="start" value="seller" control={<Radio />} label="商家" />
                            <FormControlLabel labelPlacement="start" value="postman" control={<Radio />} label="派送员" />
                        </RadioGroup>

        
                    </div>

                    <div className='register-button-submit-box'>
                        <button onSubmit={createUser} type='submit' className='register-button-submit'>提交</button>
                    </div>

                    <div className='register-reg-link-box'>
                        <Link to='/login' className='register-reg-link'>
                            <h5>已有账户？点此登录</h5>
                        </Link>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default RegisterPage

