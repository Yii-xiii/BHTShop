import './ReportPage.css'

import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Header from './Components/Header'
import Footer from './Components/Footer'

const ReportPage = () => {

    const username = Cookies.get('username')

    const createReport = async () => {
        //send to administrator
    }

    return (
        <div>
            <Header />

            <div className='head'>
                <h1>举报页面</h1>
            </div>

            <div className='infobox'>
                <h3>欲举报用户名 : get from order(seller username)</h3>
                <h3>举报用户名 : {username}</h3>
            </div>

            <div className='form'>
                <label className='form-label'><h4>举报原因</h4></label>
                <input type='reason' placeholder='输入举报原因' />
            </div>

            <div className='button-submit-box'>
                <button onSubmit={createReport} type='submit' className='button-submit'>提交</button>
            </div>

            <Footer />
        </div>
    )
}

export default ReportPage
