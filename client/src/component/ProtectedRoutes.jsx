import { Outlet, useParams } from 'react-router'
import Login from '../pages/Login'

const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem('activeUser'))

    let isAuth = false
    const params = useParams()
    const employeeName = params.employee
    const receptionistName = params.receptionist
    const adminName = params.admin

    if (user.role === 'receptionist') {
       isAuth = user.name === receptionistName ? true : false
    }
    else if (user.role === 'employee') {
        isAuth = user.name === employeeName ? true : false
    }
    else if (user.role === 'admin') {
        isAuth = user.name === adminName ? true : false
    }
   
  return (
     isAuth ? <Outlet/> : <Login/>
  )
}

export default ProtectedRoutes
