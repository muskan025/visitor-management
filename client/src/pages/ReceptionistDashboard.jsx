import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL } from '../constants'
import Table from '../component/table/Table'
import useFetch from '../hooks/useFetch'

const ReceptionistDashboard = () => {

    const [visitors,setVisitors] = useState([])
    const {fetchData, isLoading} = useFetch()
    const tableHeadings = ['Visitor','Employee','Time-In','Time-Out','Meeting Status']
    const user = JSON.parse(localStorage.getItem('activeUser')) 

   useEffect(()=>{
    fetchData('post','visitor/visitors',setVisitors,{receptionist:user.email})
  },[])
  
  return (
    <main>
      <p className="heading">Meetings</p>
          <Table tableHeadings={tableHeadings} tableData={visitors} table='visitor' isLoading={isLoading}/>
    </main>
            
  )
}

export default ReceptionistDashboard
