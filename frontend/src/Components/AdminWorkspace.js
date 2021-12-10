import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import './AdminWorkspace.css'
import {useState, useEffect} from 'react'

const AdminWorkspace = () => {
    const [reports, setReports] = useState([])
    const [reportTypeFilter, setReportTypeFilter] = useState('All')
    const [reportStatusFilter, setReportStatusFilter] = useState('All')

    const handleReportTypeFilter = (event, value) => {
        setReportTypeFilter(value)
    }

    const handleReportStatusFilter = (event, value) => {
        setReportStatusFilter(value)
    }
 
    const getReports = async() => {
        if (reportTypeFilter === 'All' && reportStatusFilter === 'All') {
            
        }
    }

    useEffect(() => {
        const getReports = async() => {
            const reportsFromServer = await fetchReports()
            setReports(reportsFromServer)
        }

        getReports()
    }, [reportTypeFilter, reportStatusFilter])

    return (
        <div className='admin-workspace-out-box'>
            <div className='admin-workspace-filter-box'>
                <h3>筛选</h3>

                <div className='admin-workspace-type-filter-box'>
                    <h4>举报分类</h4>
                    
                    <RadioGroup defaultValue="All" name="radio-buttons-group" onChange={handleReportTypeFilter}>
                        <FormControlLabel value="All" control={<Radio size="small" color="default"/>} label="全部" />
                        <FormControlLabel value="Customer" control={<Radio size="small" color="default"/>} label="客户举报" />
                        <FormControlLabel value="Seller" control={<Radio size="small" color="default"/>} label="商家举报" />
                        <FormControlLabel value="Product" control={<Radio size="small" color="default"/>} label="商品举报" />
                        <FormControlLabel value="Comment" control={<Radio size="small" color="default"/>} label="评价举报" />
                    </RadioGroup>
                </div>


                <div className='admin-workspace-status-filter-box'>
                    <h4>状态分类</h4>
                    
                    <RadioGroup defaultValue="All" name="radio-buttons-group" onChange={handleReportStatusFilter}>
                        <FormControlLabel value="All" control={<Radio size="small" color="default"/>} label="全部" />
                        <FormControlLabel value="Pending" control={<Radio size="small" color="default"/>} label="待处理" />
                        <FormControlLabel value="Successful" control={<Radio size="small" color="default"/>} label="已完成" />
                        <FormControlLabel value="Rejected" control={<Radio size="small" color="default"/>} label="已拒绝" />
                    </RadioGroup>
                </div>
            </div>

            <div className='admin-workspace-show-box'> 
                {reportTypeFilter + reportStatusFilter} 
            </div>
        </div>
    )
}

export default AdminWorkspace
