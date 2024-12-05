import { useEffect, useState } from 'react'
import InputFeild from '../component/common/form/InputFeild'
import useForm from '../hooks/useForm'
import DropDown from '../component/common/form/DropDown'
import useFetch from '../hooks/useFetch'

const VisitorRegistration = () => {

  const { form, addUserDetails } = useForm()
  const { fetchData } = useFetch()
  const [formIndex, setFormIndex] = useState(0)
  const [employees, setEmployees] = useState([])
  const [visitors, setVisitors] = useState([])
  const user = JSON.parse(localStorage.getItem('activeUser')) 
  

  function handleRegister(e) {
    e.preventDefault()
    const body = {...form,receptionist:user.email}
    fetchData('post', 'visitor/register', '', body)
  }

  function handleNextForm() {
    setFormIndex(1)
  }
  function handleBackForm() {
    setFormIndex(0)
  }

  async function handleAssign(e) {
    e.preventDefault()
    fetchData('post', 'visitor/assign', '', form)
    
  }

  function sortFetchedList(list) {
    const updatedList = list.map((user) => user.name)
    return updatedList
  }

  useEffect(() => {
    fetchData('post','visitor/visitors',setVisitors,{receptionist:user.email},sortFetchedList)
    fetchData('get', 'employee/employees', setEmployees,'',sortFetchedList)
  }, [formIndex])

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
        <>
          <p className='heading'>Assign Visitor to Employee</p>
          <form onSubmit={handleAssign}>
            <DropDown name='visitor' handleChange={addUserDetails} options={visitors} />
            <br/>
            <DropDown name='employee' handleChange={addUserDetails} options={employees} />
            <br/>
            <button>Assign</button>
          </form>
          <br></br>
          <button onClick={handleBackForm}>Back</button>
        </>
      }

    </main>
  )
}

export default VisitorRegistration
