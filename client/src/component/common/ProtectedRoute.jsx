import React from 'react'
import Login from '../../pages/Login'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Receptionist from '../../pages/VisitorRegistration'
import Admin from '../../pages/Admin'

const ProtectedRoute = () => {

    
    const user = JSON.parse(localStorage.getItem('activeUser')) || {}
    const navigate = useNavigate()

 console.log(user)
    if(!user){
        return <Login/>
    }
 
   if(user.role === 'Receptionist'){
        return <Receptionist/>
    }
    else if(user.role === 'Admin'){
        return <Admin/>
    }

   
}

export default ProtectedRoute
