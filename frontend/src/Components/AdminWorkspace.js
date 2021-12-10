import { FormControlLabel, Pagination, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import './AdminWorkspace.css'
import {useState, useEffect} from 'react'
import api from './Api'
import Report from './Report'

const AdminWorkspace = () => {
    const [page, setPage] = useState(1)
    const [reports, setReports] = useState([])
    const [reportTypeFilter, setReportTypeFilter] = useState('All')
    const [reportStatusFilter, setReportStatusFilter] = useState('pending')
    const [pageCount, setPageCount] = useState(0)

    const handlePageChange = (event, value) => {
        setPage(value)
    }
    
    const handleReportTypeFilter = (event, value) => {
        setReportTypeFilter(value)
        setPage(1)
    }

    const handleReportStatusFilter = (event, value) => {
        setReportStatusFilter(value)
        setPage(1)
    }
 
    const fetchReports = async() => {
        if (reportTypeFilter === 'All') {
            const data = await api.getReportListByStatusAndPage(page, reportStatusFilter)
            console.log(data);
            return data
        } else if (reportTypeFilter === 'Customer' || reportTypeFilter === 'Seller') {
            const data = await api.getReportedUserListByStatusAndPage(page, reportStatusFilter)
            return data
        } else if (reportTypeFilter === 'Product') {
            const data = await api.getReportedProductListByStatusAndPage(page, reportStatusFilter)
            return data
        } else if (reportTypeFilter === 'Comment') {
            const data = await api.getReportedCommentListByStatusAndPage(page, reportStatusFilter)
            return data
        }
    }

    useEffect(() => {
        const getReports = async() => {
            const reportsFromServer = await fetchReports()
            setReports(reportsFromServer.data)
            setPageCount(reportsFromServer.data.pageCount)
        }

        getReports()
    }, [reportTypeFilter, reportStatusFilter, page])

    return (
        <div className='admin-workspace-out-box'>
            <div className='admin-workspace-filter-box'>
                <h3>筛选</h3>

                <div className='admin-workspace-type-filter-box'>
                    <h4>举报分类</h4>
                    
                    <RadioGroup defaultValue="All" name="radio-buttons-group" onChange={handleReportTypeFilter}>
                        <FormControlLabel value="All" control={<Radio size="small" color="default"/>} label="全部" />
                        <FormControlLabel value="Customer" control={<Radio size="small" color="default"/>} label="客户举报" />
                        <FormControlLabel value="Product" control={<Radio size="small" color="default"/>} label="商品举报" />
                        <FormControlLabel value="Comment" control={<Radio size="small" color="default"/>} label="评价举报" />
                    </RadioGroup>
                </div>

                <div className='admin-workspace-status-filter-box'>
                    <h4>状态分类</h4>

                    <RadioGroup defaultValue="pending" name="radio-buttons-group" onChange={handleReportStatusFilter}>
                        <FormControlLabel value="pending" control={<Radio size="small" color="default"/>} label="待处理" />
                        <FormControlLabel value="succesful" control={<Radio size="small" color="default"/>} label="已处理" />
                        <FormControlLabel value="rejected" control={<Radio size="small" color="default"/>} label="已拒绝" />
                    </RadioGroup>
                </div>
            </div>

            <div className='admin-workspace-show-box'> 
                <div className='admin-workspace-show-page-box'>
                    {/* change to report page */}
                    <Pagination count={pageCount} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
                </div>

                <div className='admin-workspace-report-show-box'>
                    {reports.map((report, index) => (
                        <div className='admin-workspace-report-box'>
                            <Report key={index} report={report}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminWorkspace
