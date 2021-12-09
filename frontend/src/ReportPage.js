import './ReportPage.css'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { useNavigate, useParams } from 'react-router'
import api from './Components/Api'

const ReportPage = () => {
    const navigate = useNavigate()
    const { reportingId, reportType } = useParams()
    const username = Cookies.get('username')
    const [reportingName, setReportingName] = useState('')
    const [reportingTitle, setReportingTitle] = useState('')
    const [reportingUser, setReportingUser] = useState([])
    const [reportingProduct, setReportingProduct] = useState([])
    const [reportingComment, setReportingComment] = useState([])
    const [reportReason, setReportReason] = useState('')
    const [description, setDescription] = useState('')

    const fetchReportingUser = async() => {
        if (Cookies.get('user') === 'Customer') {
    
            const data = await api.getSeller(reportingId)
            setReportingTitle('欲举报用户名: ')
            setReportingName(data.data[0].username)

        } else if (Cookies.get('user') === 'Seller') {
            // get user's username
            const data = await api.getCustomer(reportingId)
            setReportingTitle('欲举报用户名: ')
            setReportingName(data.data[0].username)
        } else {
            navigate('/login')
        }
    }

    const fetchReportingProduct = async() => {
        if (Cookies.get('user') === 'Customer') {
            const data = await api.getProduct(reportingId)
            setReportingTitle('欲举报商品: ')
            setReportingName(data.data[0].title)
        } else if (Cookies.get('user') === 'Seller') {
            // seller can't report own product
        } else {
            navigate('/login')
        }
    }

    const fetchReportingComment = async() => {
        if (Cookies.get('user') === 'Customer' || Cookies.get('user') === 'Seller') {
            const data = await api.getProductComment(reportingId)
            setReportingTitle('欲举报留言: ')
            setReportingName(data.data[0].description)
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        const getReportingUser = async() => {
            const userFromServer = await fetchReportingUser()
            setReportingUser(userFromServer)
        }

        const getReportingProduct = async() => {
            const productFromServer = await fetchReportingProduct()
            setReportingProduct(productFromServer)
        }

        const getReportingComment = async() => {
            const commentFromServer = await fetchReportingComment()
            setReportingComment(commentFromServer)
        }

        if (reportType === 'user') {
            getReportingUser()
        } else if (reportType === 'product') {
            getReportingProduct()
        } else if (reportType === 'comment') {
            getReportingComment()
        }
    }, [])

    const createReport = async () => {
        //send to administrator
        if (reportType === 'user') {
            await api.createUserReport(reportingId, reportReason, description)
            navigate('success')
        } else if (reportType === 'product') {
            await api.createProductReport(reportingId, reportReason, description)
            navigate('success')
        } else if (reportType === 'comment') {
            await api.createCommentReport(reportingId, reportReason, description)
            navigate('success')
        }
    }
    
    return (
        <div>
            <Header />
            
            <div className='report-whole-box'>
                <div className='report-page-out-box'>
                    <div className='report-head'>
                        <h1>举报页面</h1>
                    </div>  

                    <div className='report-info-box'>
                        <div className='report-desc-box'>
                            <h3>{reportingTitle}</h3>
                            <span>{reportingName}</span>
                        </div>
                        
                        <div className='report-desc-box'>
                            <h3>举报用户名: </h3>
                            <span>{username}</span>
                        </div>

                        <div className='report-desc-box'>
                            <label className='report-form-label'><h3>举报理由: </h3></label>
                            <select name="report-type" class="report-form-type-select"
                             value={reportReason} onChange={event => setReportReason(event.target.value)}>
                                <option value='none'>-----</option>
                                <option value='scam'>诈骗</option>
                                <option value='selling prohibited item'>贩售违禁品</option>
                                <option value='sending offensive messages'>信息攻击</option>
                                <option value='counterfeit'>贩售仿造品</option>
                                <option value='others'>其他</option>
                            </select>
                        </div>
                    </div>

                    <div className='report-form'>
                        <label className='report-form-label'><h4>详细描述</h4></label>
                        <textarea 
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            type='reason' 
                            placeholder='请输入举报原因' />
                    </div>

                    <div className='report-button-submit-box'>
                        <button onClick={() => createReport()} type='submit' className='report-button-submit'>提交</button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default ReportPage
