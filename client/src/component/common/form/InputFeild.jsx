/* eslint-disable react/prop-types */
import styles from './form.module.css'

const InputFeild = ({type,name,value,label,handleChange,handleFilter}) => {

 function handleCustomChange(e){
  handleChange(e)

  if(handleFilter){
    const {value,type} = e.target
    handleFilter(value,type)
  }
 }

  return (
    <div className={styles.inputContainer}>
    <input type={type} name={name} placeholder={`Enter ${label}`} onChange={handleCustomChange} value={value}/>
    </div>
  )
}

export default InputFeild
