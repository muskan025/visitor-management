import InputFeild from '../component/common/form/InputFeild'
import useForm from '../hooks/useForm'
import { useNavigate } from 'react-router'
import DropDown from '../component/common/form/DropDown'
import { toast } from 'react-toastify'
import { baseURL } from '../constants'
import axios from 'axios'
import style from './styles/Auth.module.css'
import Squares from '../component/squares/Squares'

const Registration = () => {

  const { form, addUserDetails } = useForm()
  const navigate = useNavigate()
 
  async function handleRegister(e) {
    e.preventDefault()

    try {
      const res = await axios.post(`${baseURL}/employee/register`, form)
      const data = res.data

      if (data.status !== 201) {
        throw new Error(data.message)
      }
      toast.success('Registration Successful')
      navigate('/login')
    }
    catch (error) {
      toast.error(`${error}`)
    }
  }

  return (
    <main>
      <p className='heading'>Sign up</p>
 
      <form onSubmit={handleRegister} className={style.auth}>
        <InputFeild type="text" name="name" label='name' value={form?.name} handleChange={addUserDetails} />
        <InputFeild type="email" name="email" label='email' value={form?.email} handleChange={addUserDetails} />
        <InputFeild type="password" name="password" label='password' value={form?.password} handleChange={addUserDetails} />
        <InputFeild type="tel" name="phone" label='contact number' value={form?.phone} handleChange={addUserDetails} />
        <DropDown name='role' handleChange={addUserDetails} options={['Employee', 'Receptionist']} />
        <br></br>
        <button>Sign up</button>
    
      </form>
   
    </main>
  )
}

export default Registration
