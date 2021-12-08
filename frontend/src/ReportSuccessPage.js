import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router'
import Footer from './Components/Footer'
import Header from './Components/Header'
import './ReportSuccessPage.css'

const ReportSuccessPage = () => {
    const navigate = useNavigate()

    function navigateToHome() {
        if (Cookies.get('user') === 'Customer') {
            navigate('/')
        } else if (Cookies.get('user') === 'Seller') {
            navigate('/sellerHome')
        }
    }
    

    return (
        <div>
            <Header />
            
            <div className='report-success-whole-box'>
                <div className='report-success-page-out-box'>
                    <div className='report-success-head'>
                        <h1>举报页面</h1>
                    </div>  

                    <div className='report-success-info-box'>
                        <span>举报成功！</span>
                    </div>

                    <div className='report-success-button-submit-box'>
                        <button onClick={() => navigateToHome()} type='submit' className='report-success-button-submit'>返回主页</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ReportSuccessPage
