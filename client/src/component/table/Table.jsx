/* eslint-disable react/prop-types */
import style from './Table.module.css'
import { FaCheck, FaEdit } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import useFetch from '../../hooks/useFetch'
import sendThankyouNote from '../../utils/feedbackForm';
import Loader from '../common/Loader';

const Table = ({ tableHeadings, tableData, checkMeetingStatus, table, handleRemoveReceptionist, isLoading }) => {

    const { fetchData } = useFetch()
    const user = JSON.parse(localStorage.getItem('activeUser'))
    const role = user.role

    async function handleTimeOut(name, receptionist, email,) {
        await fetchData('post', 'visitor/timeout', '', { visitor: name })
        sendThankyouNote(receptionist, email)
    }

    function modifyTimeFormat(input) {
        const time = new Date(input)
        let hrs = time.getHours()
        let mins = time.getMinutes()
        let meridiem = ''

        if (hrs > 12) {
            hrs = hrs - 12
            if (hrs <= 9) {
                hrs = `0${hrs}`
            }
            meridiem = ' PM'
        }
        else if (hrs === 12) {
            meridiem = ' PM'
        }
        else if (hrs == 0) {
            hrs = 12
            meridiem = ' AM'
        }
        else {
            meridiem = ' AM'
        }

        if (mins <= 9) {
            mins = `0${mins}`
        }

        const formattedTime = `${hrs}:${mins} ${meridiem}`
        return formattedTime

    }

    return (

        isLoading ? <Loader /> : (
            tableData.length > 0 ?
                <table className={style.meetingLogs}>
                    <thead>
                        {
                            tableHeadings.map((heading) => (
                                <th key={heading} >{heading}</th>
                            ))
                        }
                    </thead>
                    <br></br>
                    <tbody>
                        {
                            table === 'visitor' ? tableData.length > 0 && tableData.map((user) => {
                                const { _id, name, email, receptionist, assignedEmployee, timeIn, timeOut, meetingStatus } = user

                                const timein = modifyTimeFormat(timeIn)
                                const timeout = modifyTimeFormat(timeOut)

                                return (
                                    <>
                                        <tr key={_id} >
                                            <td>{name}</td>
                                            <td>{assignedEmployee}</td>
                                            <td>{timein}</td>
                                            {
                                                timeOut ? <td className={style.edit} onClick={() => handleTimeOut(name, receptionist, email)}>
                                                    <span>{timeout}</span> &nbsp;
                                                    {role === 'receptionist' && <FaEdit title='Reset timeout' aria-label='Reset Timeout' />}
                                                </td> :
                                                    (role === 'receptionist' ? <td className={style.checkTimeout} onClick={() => handleTimeOut(name, receptionist, email)}>
                                                        <span>Visitor Left</span> &nbsp;
                                                        <FaCheck title='Set Timeout' aria-label='Set Timeout' />
                                                    </td> :
                                                        <span>N/A</span>)
                                            }
                                            <td className={`${style.status} ${style[`${meetingStatus === 'accepted' ? 'greenClr' : (meetingStatus === 'rejected' ? 'redClr' : (meetingStatus === 'attended' ? 'blueClr' : 'yellowClr'))}`]}`}>{meetingStatus}</td>
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
                                            const { _id, name, phone, email, meetingStatus } = user
                                            return (
                                                <>
                                                <tr key={_id} className={style.employeeTableRow}>
                                                    <td>{name}</td>
                                                    <td>{phone}</td>
                                                    <td>{email}</td>
                                                   
                                                        <td className={`${style.status} ${style[`${meetingStatus === 'accepted' ? 'greenClr' : (meetingStatus === 'rejected' ? 'redClr' : (meetingStatus === 'attended' ? 'blueClr' : 'yellowClr'))}`]}`}>{user.meetingStatus}</td> 
                                                        {meetingStatus && meetingStatus === 'Pending' &&
                                                        <td className={style.employeeTableBtns} >
                                                            <td>
                                                                <button onClick={() => checkMeetingStatus(user.name, 'accepted')} className={style.green} aria-label='Except Meeting' >Accept</button>&nbsp;&nbsp;
                                                                <button onClick={() => checkMeetingStatus(user.name, 'rejected')} className={style.red} aria-label='Reject Meeting'>Reject</button>
                                                            </td>
                                                            <td><button onClick={() => checkMeetingStatus(user.name, 'attended')} className={style.blue} aria-label='Attended Meeting'>Attended</button></td>

                                                        </td>}
                                                </tr>
                                                <br></br>
                                                </>
                                            )
                                        })
                                    )
                                )
                        }
                    </tbody>
                </table> :
                <div className={style.emptyTable}>
                    <ImFilesEmpty />
                    <p>No Data To  Show</p>
                </div>
        )


    )
}

export default Table

