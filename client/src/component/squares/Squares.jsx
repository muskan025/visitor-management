import React from 'react'
import style from './Squares.module.css'

const Squares = ({size,inset}) => {
  return (
    <div className={style.square} style={{width:`${size}`,height:`${size}`,inset:`${inset}`}}>
    </div>
  )
}

export default Squares
