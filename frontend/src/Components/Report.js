import React from 'react'
import './Report.css'
import {Link} from 'react-router-dom'
import api from './Api'
import { useState, useEffect } from 'react/cjs/react.development'

const Report = ({ report }) => {
    const [reportId, setReportId] = useState('')
    const [reportType, setReportType] = useState('')
    const [reportPath, setReportPath] = useState('')
    const [actionText, setActionText] = useState('')
    const [reportStatus, setReportStatus] = useState('')
    const [reportUser, setReportUser] = useState('')
    const [reportingDesc, setReportingDesc] = useState('')
    const [reportedUserId, setReportedUserId] = useState('')
    const [reportCommentId, setReportCommentId] = useState('')
    const [reportProductId, setReportProductId] = useState('')

    const handleAction = async() => {
        if (reportType === '客户举报') {
            if (reportStatus === '待处理') {
                await api.deleteSeller(reportedUserId)
                await api.adminUpdateReport(reportId, 'successful')
                setReportStatus('已处理 ')
                window.location.reload(false)
            }
        } else if (reportType === '评价举报') {
            if (reportStatus === '待处理') {
                await api.deleteProductComment(reportCommentId)
                await api.adminUpdateReport(reportId, 'successful')
                setReportStatus('已处理')
                window.location.reload(false)
            }
        } else if (reportType === '商品举报') {
            if (reportStatus === '待处理') {
                await api.deleteProduct(reportProductId)
                await api.adminUpdateReport(reportId, 'successful')
                setReportStatus('已处理')
                window.location.reload(false)
            }
        }
    }

    const handleReject = async() => {
        await api.adminUpdateReport(reportId, 'rejected')
        window.location.reload(false)
    }

    const fetchInitiates = async() => {
        setReportId(report.id)
        setReportUser(report.reportingUser.username)

        if (report.status === 'pending') {
            setReportStatus('待处理')
        } else if (report.status === 'successful') {
            setReportStatus('已处理')
        } else if (report.status === 'rejected') {
            setReportStatus('已拒绝')
        }
        
        if (report.reportedUser !== undefined) {
            setReportType('客户举报')
            setReportPath(`/seller/${report.reportedUser.id}`)
            setActionText('封锁商家')
            setReportingDesc(report.reportedUser.username)
            setReportedUserId(report.reportedUser.id)
        } else if (report.reportedComment !== undefined) {
            setReportType('评价举报')
            setActionText('删除评价')
            setReportingDesc(report.reportedComment.description)
            setReportCommentId(report.reportedComment.id)
        } else if (report.reportedProduct !== undefined) {
            setReportType('商品举报')
            setReportPath(`/product/${report.reportedProduct.id}`)
            setActionText('下架商品')
            setReportingDesc(report.reportedProduct.title)
            setReportProductId(report.reportedProduct.id)
        }
    }
    
    useEffect(() => {
        const getInitiate = async() => {
            await fetchInitiates()
        }

        getInitiate()
    }, [report])

    return (
        <div className='report-out-box'>
            <div className='report-in-box'>
                {
                    reportType === '客户举报' ? 
                    <div className='report-title-box'>
                        <span>{reportType + ' | ' + reportStatus}</span>

                        <div className='report-title-text-box'>
                            <h3 className='report-username-show'>{reportUser}</h3>
                            <h5>举报了用户</h5>
                            <Link className='report-admin-link' to={reportPath}>
                                <h3 className='report-username-show'>{reportingDesc}</h3>
                            </Link>
                        </div>
                    </div> : ''
                }

                {
                    reportType === '评价举报' ? 
                    <div className='report-title-box'>
                        <span>{reportType + ' | ' + reportStatus}</span>

                        <div className='report-title-text-box'>
                            <h3 className='report-username-show'>{reportUser}</h3>
                            <h5>举报了评论</h5>
                            <h3 className='report-username-show'>{reportingDesc}</h3>
                        </div>
                    </div> : ''
                }

                {
                    reportType === '商品举报' ? 
                    <div className='report-title-box'>
                        <span>{reportType + ' | ' + reportStatus}</span>
                        <div className='report-title-text-box'>
                            <h3 className='report-username-show'>{reportUser}</h3>
                            <h5>举报了商品</h5>
                            <Link className='report-admin-link' to={reportPath}>
                                <h3 className='report-username-show'>{reportingDesc}</h3>
                            </Link>
                        </div>
                    </div> : ''
                }
            
                <div className='admin-report-desc-box'>
                    <span>{report.description}</span>
                </div>

                <div className='admin-report-button-box'>
                    <button className='admin-report-action-button' onClick={() => handleAction()}>
                        <h4>{actionText}</h4>
                    </button>

                    <button className='admin-report-reject-button' onClick={() => handleReject()}>
                        <h4>拒绝</h4>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Report
