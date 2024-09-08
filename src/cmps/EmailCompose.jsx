import React, { useState, useEffect } from 'react'
import { useSearchParams ,useNavigate, useOutletContext } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faMinus, faArrowsUpDown, faX } from '@fortawesome/free-solid-svg-icons'
import { emailService } from '../services/email.service';
import { utilService } from '../services/util.service';


export function EmailCompose() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(emailService.createEmail())
  const { onSaveEmail } = useOutletContext()
  const [searchParam, setSearchParam] = useSearchParams()


  useEffect(() => {
    const status = searchParam.get('status')
    const sendTo = searchParam.get('to')
    const subject = searchParam.get('subject')   
    
    if (sendTo || subject) {
      setEmail((prevEmail) => ({
        ...prevEmail,
        to: sendTo || prevEmail.to,
        subject: subject || prevEmail.subject,
      }))
    }

    console.log('status: ',status)
    console.log('sendTo: ',sendTo)
    console.log('subject: ',subject)
}, [searchParam])

  const currentDate = utilService.currentDateTime()

  const { id, subject, body, isRead, isStarred, sentAt, removedAt, from, to } = email


  function handleChange({ target }) {
    let { name: field, value, type } = target
    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break;
      case 'checkbox':
        value = target.checked
        break
      default:
        break;
    }
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value, sentAt: currentDate, from: 'sharon@gmail.com' }))
  }

  function onSubmitEmail(ev) {
    ev.preventDefault()
    console.log('email: ', email)
    onSaveEmail(email)
  }

  function onCloseModal() {
    navigate("/")
  }


  return (
    <section className='compose-modal-container'>
      <form className="compose-form" onSubmit={onSubmitEmail}>
        <section className='compose-box-title'>
          <span className='compose-span-title'>New Message</span>
          <section className="modal-icons">
            <FontAwesomeIcon icon={faMinus} />
            <FontAwesomeIcon className="arrow-icon" icon={faArrowsUpDown} />
            <FontAwesomeIcon className="close-modal-icon" icon={faX} onClick={onCloseModal} />
          </section>
        </section>
        <section className='send-to-section'>
          <span className='send-to-span'>To</span>
          <input onChange={handleChange} className='send-to-input' type="email" value={to} id="sendTo" name="to" />
        </section>
        <section className='send-to-section'>
          <span className='subject-span'>Subject</span>
          <input onChange={handleChange} className='subject-input' type="text" value={subject} id="subject" name="subject" />
        </section>
        <textarea onChange={handleChange} className='body-input' value={body} id="mailBody" name="body" rows="4" cols="50" />
        <button className='send-btn'>Send</button>
      </form>
    </section>


  )
}

