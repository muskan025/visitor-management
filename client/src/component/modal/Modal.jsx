import React from 'react'
import InputFeild from '../common/form/InputFeild'
import './Modal.css'

const Modal = ({handleRequest,form,children,setIsOpen}) => {

    function handleSubmit(e){
        e.preventDefault()
            handleRequest(form)
            handleCloseModal(e)
    }

    function handleCloseModal(e){
        if(e.target.className === "modalOverlay" || e.target.className === "modalBtn"){
         setIsOpen(false)
       }
     }

    return (
        <div className="modalOverlay" onClick={handleCloseModal}>
            <div className="formModalContent">
                {children}
                <button className='modalBtn' onClick={handleSubmit} type='button'>Save</button>
            </div>
        </div>
    )
}

export default Modal
