import React, { useState } from 'react'

function EmailCompose() {

  cosnt [sendTo,setSendTo] = useState(null)
  const [subject,setSubject] = useState(null)
  const [emailBody, setEmailBody] = useState(null)
  
  function onSubmit(){
    setSendTo()
    setSubject()
    
  }
  return (
    <div>
      <form action="">
        <label for="send To">Send To</label>
        <input type="text" id="sendTo"  name="sendTo"/>
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject"/>
        <label for="body">Email Body:</label>
        <textarea id="mailBody" name="body" rows="4" cols="50"/>
      </form>
    </div>

  )
}

export default EmailCompose