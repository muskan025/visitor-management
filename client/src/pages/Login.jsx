import InputFeild from '../component/common/form/InputFeild'
import useForm from '../hooks/useForm'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { baseURL } from '../constants'
import { toast } from 'react-toastify'
import style from './styles/Auth.module.css'

const Login = () => {

    const { form, addUserDetails } = useForm()
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const res = await axios.post(`${baseURL}/employee/login`, form)
            const data = res.data
            const user = data.data
    
            const storedUser = {name:user?.name,email:user?.email,role:user?.role}
            
            if (data.status === 400) {

                throw new Error(data.message)
            }
            else if (data.status === 500) {
                throw new Error('Login Failed')
            }
            localStorage.setItem('activeUser', JSON.stringify(storedUser))
            toast.success("Login Succesfull")

            if (user.role === 'receptionist') {
                navigate(`/visitor-registration`)
            }
            else if (user.role === 'employee') {
                navigate(`/${user.name}/employeedashboard`)
            }
            else if (user.role === 'admin') {
                navigate(`/${user.name}/admindashboard`)
            }

        } catch (error) {
            toast.error(`${error}`)
        }

    }

    return (
        <main>
            <p className='heading'>Login</p>
            <form onSubmit={handleLogin} className={style.auth}>
                <InputFeild type="email" name="email" label='email' value={form?.email} handleChange={addUserDetails} />
                <InputFeild type="password" name="password" label='password' value={form?.password} handleChange={addUserDetails} />
                <div>
                    <span>Create an account? </span>
                    <Link to='/signup'><b>Signup</b></Link>
                </div>
                <button onClick={handleLogin}>Login</button>
            </form>
        </main>
    )
}

export default Login
