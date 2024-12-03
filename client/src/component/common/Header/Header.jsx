import React from 'react'
import { Link } from 'react-router'
import style from './Header.module.css'

const Header = () => {

  const user = JSON.parse(localStorage.getItem('activeUser')) 
  const role = user.role
 
  return (
    <nav>
      <Link to='/' className={style.name}>VMS</Link>
      <div className={style.pages}>
      <Link to={`/${role.toLowerCase()}-dashboard`}>Dashboard</Link> 
      {user.role === 'receptionist' && <Link to='/visitor-registration'>Visitor</Link>}
      <Link to='/signup'>Signup</Link>
      <Link to='/login'>Login</Link>
      </div>
    </nav>
  )
}

export default Header
