import { useEffect, useState } from 'react'
import Table from '../component/table/Table'
import useFetch from '../hooks/useFetch'

const EmployeeDashboard = () => {

  const tableHeadings = ['Visitor','Contact No.','Email','Request','Status']
  const [visitors,setVisitors] = useState([])
  const {fetchData,isLoading} = useFetch()

 async function checkMeetingStatus(visitor,status){
  fetchData('post','visitor/meeting-status','',{visitor,status})
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('activeUser'))
    fetchData('get',`employee/employee-meetings/${user.name}`,setVisitors)
  },[])

  return (
    <main>
      <div className="heading">Meetings</div>
          <Table tableHeadings={tableHeadings} tableData={visitors} checkMeetingStatus={checkMeetingStatus}  table='employee' isLoading={isLoading}/>
    </main>
  )
}

export default EmployeeDashboard
