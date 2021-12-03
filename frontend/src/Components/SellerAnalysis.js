import React from 'react'
import SellerAnalysisOptions from './SellerAnalysisOptions'

const SellerAnalysis = () => {
    return (
        <div className='personal-order-box'>
            <div className="info-title">
                <h1>商家信息</h1>
            </div>

            <div className='display-box'>
                <SellerAnalysisOptions />
                总售出商品
                总售出金额
                追踪人数
                已营业天数
            </div>
        </div>
    )
}

export default SellerAnalysis
