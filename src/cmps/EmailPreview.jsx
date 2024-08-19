import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import EmailDetails from './EmailDetails';
import whiteStar from '../assets/imgs/whiteStar.png'
import yellowStar from '../assets/imgs/yellowStar.png'
import { emailService } from '../services/email.service'
import envelope from '../assets/imgs/envelope.png'
import trash from '../assets/imgs/trash.png'

function EmailPreview({ email }) {

    const [openDetails, setOpenDetails] = useState(false)
    const [isRead, setIsRead] = useState(email.isRead || false)
    const [isStarred, setIsStarred] = useState(email.isStarred || false)
    const [showIcons,setShowIcons] = useState(false)
    const [moveToTrash,setMoveToTrash] = useState();

    useEffect(() => {
        // console.log("Email:", email)
    }, [isRead,showIcons,isStarred])

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getHours()
    let seconds = date.getHours()
    let currentDate = `${day}-${month}-${year} ${hour}:${minute}:${seconds}`

    function onOpenEmail() {

        // console.log("email opened, email ID: ", email.id, "openDetails: ", openDetails)
        setOpenDetails(prev => !prev)
        // console.log("email opened, email ID: ", email.id, "openDetails: ", openDetails)
        console.log("email item color: ", isRead)
        setIsRead(true)
        // const update = {...email, : !isRead}
        const update = {...email, isRead: true}

        emailService.save(update)


    }
    function changeStar(e) {
        e.stopPropagation()
        setIsStarred(prev => !prev)
        const updatedEmail = { ...email, isStarred: !isStarred }
        console.log("updatedEmail:", updatedEmail)
        emailService.save(updatedEmail)

    }

    function showEmailIcons(){
        setShowIcons(prev=>!prev)
    }

    function chagneToUnread(e){
        e.stopPropagation()
        e.preventDefault()
        console.log("email is read?: ", isRead)

        setIsRead(false)
        console.log("email is read?: ", isRead)

        const update = {...email, isRead: false}
        emailService.save(update)
    }

    function moveEmailToTrash(e){
        e.stopPropagation()
        e.preventDefault()
        setMoveToTrash(prev=>!prev)
    }


    return (
        <div>
        <li onClick={onOpenEmail} onMouseEnter={showEmailIcons} onMouseLeave={showEmailIcons} className={isRead ? 'email-clicked':''}>
            <img onClick={changeStar} src={isStarred ? yellowStar : whiteStar} alt="" />
            <Link className='link-to-details' to={`/emailDetails/${email.id}`}>
                <span>{email.from}</span>
                <span>{email.subject}</span>
               {showIcons &&  <>
                <img onClick={chagneToUnread} src={envelope} alt="envelope" />
                <img  onClick={moveEmailToTrash} src={trash} alt="trash" /></>
               
               } 
               {!showIcons && <span className="current-date">{currentDate}</span> } 
            </Link>
        </li>
        </div>

    )
}

export default EmailPreview



