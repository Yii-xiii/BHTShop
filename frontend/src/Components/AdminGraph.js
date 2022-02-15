import React from 'react'
import './AdminGraph.css'
import {useState, useEffect} from 'react'
import api from './Api'

import { PureComponent } from 'react';
import {
  BarChart, LineChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Label,
} from 'recharts';



const AdminGraph = () => {
      const [reports, setReports] = useState([]);

      useEffect(() => {
        const getReports = async() => {

            var day1 = new Date();
            var day2 = new Date();
            var day3 = new Date();
            var day4 = new Date();
            var day5 = new Date();
            var day6 = new Date();
            var day7 = new Date();
            day1.setDate(day7.getDate() - 6);
            day2.setDate(day7.getDate() - 5);
            day3.setDate(day7.getDate() - 4);
            day4.setDate(day7.getDate() - 3);
            day5.setDate(day7.getDate() - 2);
            day6.setDate(day7.getDate() - 1);
            console.log(day1);
            console.log(day7);

            var Day1 = await api.getReportListByDayAndPage(1,day1.getFullYear(),day1.getMonth()+1,day1.getDate())
            console.log(Day1);

            var Day2 = await api.getReportListByDayAndPage(1,day2.getFullYear(),day2.getMonth()+1,day2.getDate())
            console.log(Day2);

            var Day3 = await api.getReportListByDayAndPage(1,day3.getFullYear(),day3.getMonth()+1,day3.getDate())
            console.log(Day3);

            var Day4 = await api.getReportListByDayAndPage(1,day4.getFullYear(),day4.getMonth()+1,day4.getDate())
            console.log(Day4);

            var Day5 = await api.getReportListByDayAndPage(1,day5.getFullYear(),day5.getMonth()+1,day5.getDate())
            console.log(Day5);

            var Day6 = await api.getReportListByDayAndPage(1,day6.getFullYear(),day6.getMonth()+1,day6.getDate())
            console.log(Day6);

            var Day7 = await api.getReportListByDayAndPage(1,day7.getFullYear(),day7.getMonth()+1,day7.getDate())
            console.log(Day7);

            setReports([ 
                {date: day1.getFullYear() + '-' + (day1.getMonth()+1) + '-' + day1.getDate(), reports: Day1.reportCount},
                {date: day2.getFullYear() + '-' + (day2.getMonth()+1) + '-' + day2.getDate(), reports: Day2.reportCount},
                {date: day3.getFullYear() + '-' + (day3.getMonth()+1) + '-' + day3.getDate(), reports: Day3.reportCount},
                {date: day4.getFullYear() + '-' + (day4.getMonth()+1) + '-' + day4.getDate(), reports: Day4.reportCount},
                {date: day5.getFullYear() + '-' + (day5.getMonth()+1) + '-' + day5.getDate(), reports: Day5.reportCount},
                {date: day6.getFullYear() + '-' + (day6.getMonth()+1) + '-' + day6.getDate(), reports: Day6.reportCount},
                {date: day7.getFullYear() + '-' + (day7.getMonth()+1) + '-' + day7.getDate(), reports: Day7.reportCount},
            ])
            console.log(reports)
        }

        const printReports = async() => {
            console.log(reports)
        }

        getReports()
        printReports()
    }, [])

    return (
        <div className='admin-graph-outer-box'>
            <div className='admin-graph-box'>

                <h1>Number of Reports in 7 days </h1>
            
                <LineChart
                width={400}
                height={400}
                data={reports}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                <XAxis dataKey="date">
                    <Label  value="Date" offset={0} position="insideBottom" />
                    </XAxis>
                <YAxis label={{ value: "Number of Reports", angle: -90, position: 'insideLeft' }} allowDecimals={false} domain={['dataMin', 'dataMax']}/>
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="reports" stroke="#ff7300" yAxisId={0} />
                </LineChart>

            </div>
            
         </div>
    )
}

export default AdminGraph
