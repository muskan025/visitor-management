import { useEffect, useState } from 'react'
import Table from '../component/table/Table'
import useFetch from '../hooks/useFetch'
import { dateTimeForCalander } from '../utils/calendar'
 
const ReceptionistDashboard = () => {

  const [meetings, setMeetings] = useState([])
  const { fetchData, isLoading } = useFetch()
  const tableHeadings = ['Visitor', 'Employee', 'Time-In', 'Time-Out', 'Meeting Status', 'Meeting Room']
  const user = JSON.parse(localStorage.getItem('activeUser'))

  useEffect(() => {
    const date = new Date()
    const time = '06:00 am'
    const todayTimes = dateTimeForCalander(date, time, 'today')
  
    fetchData('post', 'meeting-room/getmeetings', setMeetings, { dateTimeStart: todayTimes.start, dateTimeEnd: todayTimes.end,receptionist: user.email})
 
  }, [])


  return (
    <main>
      <p className="heading">Meetings</p>
   <Table tableHeadings={tableHeadings} tableData={meetings?.meetings} events={meetings?.events} table='visitor' isLoading={isLoading}  />
    </main>

  )
}

export default ReceptionistDashboard
