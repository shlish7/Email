import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import EmailDetails from './EmailDetails';
import whiteStar from '../assets/imgs/whiteStar.png'
import yellowStar from '../assets/imgs/yellowStar.png'
import { emailService } from '../services/email.service'
import envelope from '../assets/imgs/envelope.png'
import trash from '../assets/imgs/trash.png'

function EmailPreview({ email, onUpdateEmail }) {

    const [openDetails, setOpenDetails] = useState(false)
    const [isRead, setIsRead] = useState(email.isRead || false)
    const [showIcons,setShowIcons] = useState(false)

    useEffect(() => {
   
    }, [isRead,showIcons])
    

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getHours()
    let seconds = date.getHours()
    let currentDate = `${day}-${month}-${year} ${hour}:${minute}:${seconds}`

    function onOpenEmail() {
        setOpenDetails(prev => !prev)
        setIsRead(true)
        const update = {...email, isRead: true}
        emailService.save(update)


    }
    function changeStar(e) {
        e.stopPropagation()
        const emailToUpdate = { ...email, isStarred: !email.isStarred }
        onUpdateEmail(emailToUpdate)
   

    }

    function showEmailIcons(){
        setShowIcons(prev=>!prev)
    }

    function chagneToUnread(e){
        e.stopPropagation()
        e.preventDefault()
        setIsRead(false)
        const update = {...email, isRead: false}
        emailService.save(update)
    }


    
    function onMoveToTrash(e){
        e.stopPropagation()
        e.preventDefault()
        const emailToUpdate = { ...email, removedAt:  currentDate}
        onUpdateEmail(emailToUpdate)
    }


    return (
        <li onClick={onOpenEmail} onMouseEnter={showEmailIcons} onMouseLeave={showEmailIcons} className={isRead ? 'email-clicked':''}>
            <img onClick={changeStar} src={email.isStarred ? yellowStar : whiteStar} alt="" />
            <Link className='link-to-details' to={`/emailDetails/${email.id}`}>
                <span className='email-from'>{email.from}</span>
                <span className='email-subject'>{email.subject}</span>
               {showIcons &&  <>
                <img className='envelope-icon' onClick={chagneToUnread} src={envelope} alt="envelope" />
                <img  className='trash-icon' onClick={onMoveToTrash} src={trash} alt="trash" /></>
               
               } 
               {!showIcons && <span className='email-date'>{currentDate}</span> } 
            </Link>
        </li>

    )
}

export default EmailPreview



