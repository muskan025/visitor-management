import { useEffect, useState } from 'react'
import Table from '../component/table/Table'
import useFetch from '../hooks/useFetch'
import { dateTimeForCalander } from '../utils/calendar'

const EmployeeDashboard = () => {

  const tableHeadings = ['Visitor','Contact No.','Email','Status','Request','Meeting Room']
  const [meetings,setMeetings] = useState([])
  const {fetchData,isLoading} = useFetch()

 async function checkMeetingStatus(visitor,status){
  fetchData('post','visitor/meeting-status','',{visitor,status})
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('activeUser'))
    const name = user.name
     const date = new Date()
    const time = '06:00 am'
    const timeRange = dateTimeForCalander(date, time, 'admin') 

     fetchData('post', 'meeting-room/getmeetings', setMeetings, { dateTimeStart: timeRange.start, dateTimeEnd: timeRange.end,employee:name})
  },[])


  return (
    <main>
      <div className="heading">Meetings</div>
          <Table tableHeadings={tableHeadings} tableData={meetings.meetings} events={meetings.events} checkMeetingStatus={checkMeetingStatus}  table='employee' isLoading={isLoading}/>
    </main>
  )
}

export default EmployeeDashboard
