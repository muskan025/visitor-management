import { baseURL } from '../constants'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useFetch = () => {

    const [isLoading,setIsLoading] = useState(false)

    async function fetchData(method,endpoint,setState,body,callback,clone,filter){
        setIsLoading(true)
        
        try {
          const res = await axios[method](
            `${baseURL}/${endpoint}`,
            body? body : '', 
            { withCredentials: true ,
            })
            const data = res.data 

        if(data.status === 200 || data.status === 201){
            if(setState){
              setState(data.data)
            }
            if(callback){
              setState(callback(data.data))
            }
            if(clone && filter){
              clone(data.data.meetings)
              filter(data.data.meetings)
            }
            if(data.message !== 'Read successful'){
              toast.success(data.message)
            }
        }
        else{
             throw new Error(data.message)
            }
    
        } catch (error) {
          toast.error(`${error}`)
        }finally{
            setIsLoading(false)
        }
      }

      return {fetchData, isLoading}
}

export default useFetch
