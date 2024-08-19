import React, { useState, useEffect } from 'react'
import { emailService } from '../services/email.service'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'


function EmailDetails() {

  const [email, setEmail] = useState()
  const {id} =useParams()

  useEffect(() => {
    loadEmails()
  }, [id])

  async function loadEmails() {
    try {
      const email = await emailService.getById(id)
      setEmail(email)

    } catch (err) {
      console.log(err)
      alert('Couldnt load the email')
    }
  }

  if (!email) {
    return <div>No email data available</div>;
  }

  return (
    <>
      <div className='email-details-container'>
        <h1 className='email-subject'>{email.subject}</h1>
        <p className='email-body'>{email.body}</p>
        <Link to="/emailIndex">Back</Link>
      </div>     
    </>
  )
}

export default EmailDetails

// {
//   id: 'e101',
//   subject: 'Miss you!',
//   body: 'Would love to catch up sometimes',
//   isRead: false,
//   isStarred: true,
//   sentAt: 1551133930594,
//   removedAt: null, //for later use from: 'momo@momo.com',
//   to: 'demo@appsus.com'
// }