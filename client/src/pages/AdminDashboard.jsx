import { useEffect, useState } from 'react'
import Table from '../component/table/Table'
import style from './styles/Admin.module.css'
import DropDown from '../component/common/form/DropDown'
import useForm from '../hooks/useForm'
import '../index.css'
import InputFeild from '../component/common/form/InputFeild'
import Modal from '../component/Modal/Modal'
import useFetch from '../hooks/useFetch'
import { FaUserPlus } from 'react-icons/fa'
import { RxCaretDown } from "react-icons/rx";
import { dateTimeForCalander } from '../utils/calendar'
const AdminDashboard = () => {

  const meetingRooms =[
    { name: "Innovation Hub", capacity: 2},
    { name: "Everest Conference Room", capacity: 12 },
    { name: "Silicon Valley", capacity: 8 },
    { name: "Zen Garden", capacity: 6 },
    { name: "Galileo Room", capacity: 10 },
    { name: "Startup Lounge", capacity: 15 },
    { name: "Pacific Conference Room", capacity: 25 },
    { name: "Einstein Boardroom", capacity: 16 },
    { name: "Global Connect", capacity: 18 },
    { name: "Creative Corner", capacity: 6 },
    { name: "All"},
];

  const [meetings, setMeetings] = useState({})
  const [receptionist, setReceptionist] = useState([])
  const [visitorStatus, setVisitorStatus] = useState([])
  const [visitorClone, setVisitorClone] = useState([])
  const { form, addUserDetails } = useForm()
  const [isOpen, setIsOpen] = useState(false)
  const { fetchData, isLoading } = useFetch()
  const [isDateDropdown, setIsDateDropdown] = useState(false)

  const visitorHeadings = ['Visitor', 'Employee', 'Time-In', 'Time-Out', 'Meeting Status', 'Meeting Room']
  const dateArray = [
    {
      type: 'date',
      name: 'Today'
    },
    {
      type: 'month',
      name: 'Month'
    },
    {
      type: 'number',
      name: 'Year',
    },
  ]

  function handleRemoveReceptionist(id) {
    fetchData('post', 'employee/remove-receptionist', setReceptionist, {id})
  }

  async function handleAddReceptionist(form) {
    fetchData('post', 'employee/add-receptionist', setReceptionist, {name:form?.name,email:form?.email})
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  function getMeetingTimes(timeIn) {

    const time = new Date(timeIn)
    let timeMonth = time.getMonth() + 1
    let timeDate = time.getDate()
    let timeYear = time.getFullYear()

    if (timeMonth <= 9) {
      timeMonth = `0${timeMonth}`
    }
    if (timeDate <= 9) {
      timeDate = `0${timeDate}`
    }
    const formattedtodayDate = `${timeYear}-${timeMonth}-${timeDate}`
    const formattedMonthDate = `${timeYear}-${timeMonth}`
    const formattedYearDate = `${timeYear}`

    return { today: formattedtodayDate, month: formattedMonthDate, year: formattedYearDate }

  }

  function filterTimeBased(value,type) {
    let logs = []

    logs = visitorClone.filter((vis) => {
      
      if (type === 'date' && getMeetingTimes(vis.timeIn).today === value) {
        return vis
      }
      else if(type === 'month' && getMeetingTimes(vis.timeIn).month === value) {
        return vis
      }
      else if(type === 'number' && getMeetingTimes(vis.timeIn).year === value) {
        return vis
      }
    })
   
    setMeetings((prev)=>({...prev,meetings:[...logs]}))
    setVisitorStatus(logs)
 
  }

  function filterMeetingStatus(status) {
    let logs = []
  
    if (status !== 'all') {
      logs = visitorStatus.filter((vis) => (
        vis.meetingStatus.toLowerCase() === status.toLowerCase()
      ))
      setMeetings((prev)=>({...prev,meetings:[...logs]}))
    }
    else {
      setMeetings((prev)=>({...prev,meetings:[...visitorClone]}))
    }

  }

  function filterMeetingRoom(roomname) {
    let logs = []
 
    if (roomname.toLowerCase() !== 'all') {
      logs = visitorClone.filter((vis) => {
         return vis?.meetingID?.roomName?.toLowerCase() === roomname.toLowerCase()
    })
    
      setMeetings((prev)=>({...prev,meetings:[...logs]}))
    }
    else {
      setMeetings((prev)=>({...prev,meetings:[...visitorClone]}))
    }

  }

  function handleDate(value,type){
    filterTimeBased(value,type)
  }

  useEffect(() => {
    const date = new Date()
    const time = '06:00 am'
    const timeRange = dateTimeForCalander(date, time, 'admin')
    console.log(timeRange)  

     fetchData('post', 'meeting-room/getmeetings', setMeetings, { dateTimeStart: timeRange.start, dateTimeEnd: timeRange.end,allreceptionists:true},'',setVisitorClone,setVisitorStatus)
  }, [])

  useEffect(() => {
    fetchData('get', 'employee/receptionists', setReceptionist) 
  },[])


  return (
    <main className={style.admin}>
      <form action="" className={style.dropdowns}>
        <DropDown name='role logs' handleChange={addUserDetails} options={['Visitor Table', 'Receptionist Table']} />
        <DropDown name='status' dropdown='sort' handleChange={addUserDetails} handleFilter={filterMeetingStatus} options={['Attended', 'Accepted', 'Rejected','Pending', 'All']} />
        <DropDown name='meetingroom' dropdown='sort' handleChange={addUserDetails} handleFilter={filterMeetingRoom} options={meetingRooms} />
        <div className={style.dateDropdown} >
          <div className={style.dropdownHeader}>
            <p>Sort Period</p>
            <RxCaretDown onClick={()=>setIsDateDropdown(!isDateDropdown)} />
          </div>

          {
            isDateDropdown && <ul>
              {dateArray.map((item) => (
                <li key={item.name}>
                  <p>{item.name}</p>
                  <InputFeild type={item.type} name='period' label={item.name.toLowerCase()} value={form[item.name]} handleChange={addUserDetails} handleFilter={handleDate}/>
                </li>
              ))}
            </ul>
          }

        </div>
      </form>

      {form?.['role logs'] === 'receptionist table' ?
        <form className={style.table} onSubmit={handleSubmit}>
          <div className={style.header}>
            <p>Receptionist</p>
            <div className={style.addBtn} onClick={() => setIsOpen(true)}>
              <FaUserPlus title='Add Receptionist'  />
            </div>
          </div>
          <ul role='list'>
            {isLoading ? <p>Loading...</p> :
              receptionist.length > 0 && receptionist.map((user) => {
                return (
                  <li key={user._id}>
                    <p>{user.name}</p>
                    <button className={style.removeBtn} onClick={() => handleRemoveReceptionist(user._id)} type='button'>Remove</button>
                  </li>
                )
              })}
          </ul>

        </form> :

        <Table tableHeadings={visitorHeadings} tableData={meetings?.meetings} events={meetings?.events} table='visitor' isLoading={isLoading} />

      }
      {isOpen &&
        <Modal handleRequest={handleAddReceptionist} setIsOpen={setIsOpen} form={form}>
          <InputFeild type="text" name="name" label='name' value={form?.name} handleChange={addUserDetails} />
          <InputFeild type="email" name="email" label='email' value={form?.email} handleChange={addUserDetails} />
          </Modal>
      }
    </main>
  )
}

export default AdminDashboard
