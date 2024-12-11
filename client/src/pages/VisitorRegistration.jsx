import { useEffect, useState } from 'react'
import InputFeild from '../component/common/form/InputFeild'
import useForm from '../hooks/useForm'
import DropDown from '../component/common/form/DropDown'
import useFetch from '../hooks/useFetch'
import { meetingEvent } from '../utils/calendar'
import style from './styles/VisitorRegistration.module.css'


const VisitorRegistration = () => {

  let { form, addUserDetails } = useForm()
  const { fetchData } = useFetch()
  const [formIndex, setFormIndex] = useState(0)
  const [employees, setEmployees] = useState([])
  const [visitors, setVisitors] = useState([])
  const [event,setEvent] = useState({})
  const user = JSON.parse(localStorage.getItem('activeUser'))
  const receptionist = user.email
  const meetingRooms =[
    { name: "Innovation Hub", capacity: 2},
    { name: "Everest Conference Room", capacity: 12 },
    { name: "Silicon Valley", capacity: 8 },
    { name: "Zen Garden", capacity: 6 },
    { name: "Galileo Room", capacity: 10 },
    { name: "Startup Lounge", capacity: 15 },
    { name: "Pacific Conference Room", capacity: 25 },
    { name: "Einstein Boardroom", capacity: 16 },
    { name: "Global Connect", capacity: 1 },
    { name: "Creative Corner", capacity: 14 }
];
  

  function handleRegister(e) {
    e.preventDefault()
    const body = {...form,receptionist:user.email}
    fetchData('post', 'visitor/register', '', body)
  }

  function handleNextForm() {
    setFormIndex((prev)=> prev+1)
  }
  function handleBackForm() {
    setFormIndex((prev)=> prev-1)
  }

  async function handleAssign(e) {
    e.preventDefault()
    fetchData('post', 'visitor/assign', '', form)
  }

  function sortFetchedList(list) {
    const updatedList = list.map((user) => user.name)
    return updatedList
  }

  function handleMeetingEvent(e){

    const description = `This meeting is conducted in ${form?.roomname}`
    const slotTime= e.target.innerText
    const calendarEvent =  meetingEvent(form?.roomname,description,form?.date,slotTime)
    setEvent(calendarEvent)
  }

  async function bookMeeting(){
    // findMeetingRoomCapacity()
    const roomName = form?.roomname
    const visitor = form?.visitor
    const capacity = Number(form?.capacity)
 
    fetchData('post','meeting-room/meeting','',{roomName,capacity,visitor,receptionist,event})
  }
 
  function findMeetingRoomCapacity(roomName) {
    const selectedRoom = meetingRooms.find(room => room.name === roomName);
    return selectedRoom ? selectedRoom.capacity : null;
}

  useEffect(() => {
    fetchData('post','visitor/visitors',setVisitors,{receptionist:user.email},sortFetchedList)
    fetchData('get', 'employee/employees', setEmployees,'',sortFetchedList)
  }, [formIndex])
 
  useEffect(() => {
    if (form?.roomname) {
        const capacity = findMeetingRoomCapacity(form.roomname);
        addUserDetails({
            target: {
                name: 'capacity',
                value: capacity
            }
        });
    }
}, [form?.roomname]);

  return (
    <main>
      {formIndex === 0 ? <>
        <p className='heading'>Visitor Registration</p>
        <form action='post' onSubmit={handleRegister}>
          <InputFeild type="text" name="name" label='name' value={form?.name} handleChange={addUserDetails} />
          <InputFeild type="email" name="email" label='email' value={form?.email} handleChange={addUserDetails} />
          <InputFeild type="tel" name="phone" label='contact number' value={form?.phone} handleChange={addUserDetails} />
          <button>Register</button>
        </form>
        <br></br>
        <button onClick={handleNextForm}>Next</button>
      </> :
       ( formIndex === 1 ? <>
          <p className='heading'>Assign Visitor to Employee</p>
          <form onSubmit={handleAssign}>
            <DropDown name='visitor' handleChange={addUserDetails} options={visitors} />
            <br/>
            <DropDown name='employee' handleChange={addUserDetails} options={employees} />
            <br/>
            <button>Assign</button>
          </form>
          <br></br>
          <button onClick={handleNextForm}>Next</button>
        </> :
        <>
        <form action="">
        <p className='heading'>Book Meeting Room</p>
         <DropDown name='roomname' handleChange={addUserDetails} options={meetingRooms} />
         <br></br>
         <span className={style.capacity}>{form?.capacity ? form?.capacity : 'Capacity'}</span>
           <InputFeild type="email" name="visitor" label='visitor&apos;s email' value={form?.visitor} handleChange={addUserDetails} />
         <InputFeild type="date" name="date" label='date' value={form?.date} handleChange={addUserDetails} />
          </form>
          {
            form?.date ? 
            <div className={style.slots}>
              <p>Meeting slots</p>
              <ul onClick={handleMeetingEvent}>
                <li>10:00 am</li>
                <li>11:00 am</li>
                <li>12:00 pm</li>
                <li>2:00 pm</li>
                <li>3:00 pm</li>
                <li>4:00 pm</li>
              </ul>
              <button onClick={bookMeeting}>Book Meeting</button>
            </div> :
            <div className={style.slots}>
              <p>Select a date to view slots</p>
            </div>
          }
          <br></br>
          <button onClick={handleBackForm}>Back</button>
          </>)
      }

    </main>
  )
}

export default VisitorRegistration
