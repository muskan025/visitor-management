
import { useEffect, useState } from 'react'

const useForm = () => {
    const [form,setForm] = useState({})

    function addUserDetails(e){
        const {name,value} = e.target
        setForm((prev)=>({...prev,[name]:value}))
    }
 
 
  return {form,addUserDetails}
}

export default useForm
