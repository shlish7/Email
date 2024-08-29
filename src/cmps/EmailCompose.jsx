import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faMinus, faArrowsUpDown, faX } from '@fortawesome/free-solid-svg-icons'
import { emailService } from '../services/email.service';


export function EmailCompose() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(emailService.createEmail('tst'))

  const  { id, subject, body, isRead, isStarred, sentAt, removedAt, from, to } = email

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
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
}

  function onSubmitEmail(ev) {
    ev.preventDefault()
    console.log('email: ' ,email)
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
          <input onChange={handleChange} className='send-to-input' type="text" value={to} id="sendTo" name="to" />
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

