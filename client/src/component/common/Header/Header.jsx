import { useState } from 'react'
import { Link } from 'react-router'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import style from './Header.module.css'

const Header = () => {

  const [isHamburgerMenu, setIsHamburgerMenu] = useState(false)
  const user = JSON.parse(localStorage.getItem('activeUser'))
  const name = user.name
  const role = user.role

  return (
    <nav>
      <Link to='/' className={style.name}>VMS</Link>
      <ul className={`${style.pages} ${isHamburgerMenu ? style.menuOpen : style.menuClose}`} >
        <Link to={`/${name.toLowerCase()}/${role}dashboard`}>Dashboard</Link>
        {user.role === 'receptionist' && <Link to={`/visitor-registration`}>Visitor</Link>}
        <Link to='/signup'>Signup</Link>
        <Link to='/login'>Login</Link>
      </ul>
      {
        isHamburgerMenu ? <GrClose className={style.close} onClick={() => setIsHamburgerMenu(false)} /> :
          <GiHamburgerMenu className={style.hamburger} onClick={() => setIsHamburgerMenu(true)} />
      }
    </nav>
  )
}

export default Header
