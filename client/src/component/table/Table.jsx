/* eslint-disable react/prop-types */
import style from './Table.module.css'
import {FaCheck } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import useFetch from '../../hooks/useFetch'

const Table = ({ tableHeadings, tableData, checkMeetingStatus, table, handleRemoveReceptionist,isLoading }) => {

    const {fetchData} = useFetch()
 
      function handleTimeOut(name) {
         fetchData('post','visitor/timeout','',{visitor:name})
    }

    function modifyTimeFormat(input) {
        const time = new Date(input)
        let hrs = time.getHours()
        let mins = time.getMinutes()
        let meridiem = ''

        if (hrs > 12) {
            hrs = hrs - 12
            if(hrs <= 9){
                hrs = `0${hrs}`
            }
            meridiem = ' PM'
        }
        else if(hrs === 12){
            meridiem = ' PM'
        }
        else if (hrs == 0) {
            hrs = 12
            meridiem = ' AM'
        }
        else {
            meridiem = ' AM'
        }

        if(mins <=9){
            mins = `0${mins}`
        }

        const formattedTime = `${hrs}:${mins} ${meridiem}`
        return formattedTime

    }

    return (

         
       isLoading ? <p>Loading...</p> : (
        tableData.length >0  ?
        <table className={style.meetingLogs}>
            <thead>
                {
                   table !== 'employee' && tableHeadings.map((heading) => (
                        <th key={heading} >{heading}</th>
                    ))
                }
            </thead>
            <br></br>
            <tbody>
                {
                    table === 'visitor' ? tableData.length > 0 && tableData.map((user) => {
                        const { _id, name, assignedEmployee, timeIn, timeOut, meetingStatus } = user
                        
                        const timein = modifyTimeFormat(timeIn)
                        const timeout = modifyTimeFormat(timeOut)

                        return (
                            <>
                                <tr key={_id} >
                                    <td>{name}</td>
                                    <td>{assignedEmployee}</td>
                                    <td>{timein}</td>
                                    {
                                        timeOut ? <td>{timeout}</td> :
                                            <div className={style.checkTimeout}>
                                            <span onClick={()=>handleTimeOut(name)}>Visitor Left</span>
                                              <FaCheck/>
                                            </div>
                                    }
                                    <td className={`${style.status} ${style[`${meetingStatus === 'accepted' ? 'greenClr' : (meetingStatus === 'rejected' ? 'redClr' :(meetingStatus === 'attended' ? 'blueClr' : 'yellowClr')) }`]}`}>{meetingStatus}</td>
                                </tr>
                                <br></br>
                            </>
                        ) 
                    }) :
                        (
                            table === 'receptionist' ? tableData.length > 0 && tableData.map((user) => {

                                return (
                                    <tr key={user} className={style.employeeTableRow}>
                                        <td>{user.name}</td>
                                        <td className={style.employeeTableBtns} >

                                            <td>
                                                <button onClick={() => handleRemoveReceptionist(user._id)} className={style.reject} aria-label={`Remove ${user.name} from table`}>Remove</button>
                                            </td>

                                        </td>
                                    </tr>
                                )
                            }) : (
                                tableData.length > 0 && tableData.map((user) => {
                                    return (
                                        <tr key={user} className={style.employeeTableRow}>
                                            <td>{user.name}</td>
                                            <td className={style.employeeTableBtns} >

                                                <td>
                                                    <button onClick={() => checkMeetingStatus(user.name, 'accepted')} className={style.green}  aria-label='Except Meeting' >Accept</button>&nbsp;
                                                    <button onClick={() => checkMeetingStatus(user.name, 'rejected')} className={style.red} aria-label='Reject Meeting'>Reject</button>
                                                </td>
                                                <td><button onClick={() => checkMeetingStatus(user.name, 'attended')} className={style.blue} aria-label='Attended Meeting'>Attended</button></td>

                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        )
                }
            </tbody>
        </table> :
        <div className={style.emptyTable}>
            <ImFilesEmpty/>
            <p>No Data To  Show</p>
        </div>
       )
       

    )
}

export default Table

// style={{ color: meetingStatus === 'accepted' ? '#00800066' : (meetingStatus === 'rejected' ? '#ff000066' :(meetingStatus === 'accepted' ? '#2d4aee66' : 'yellow')) }} 