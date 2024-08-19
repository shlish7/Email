import React from 'react'
import EmailPreview from './EmailPreview'

function EmailList({emails, onRemove}) {
    return (
            <ul >
            {emails.map(email => (
                <div key={email.id} className='email-item'>
                     <EmailPreview email={email}  key={email.id}/>
                     <button onClick={() => onRemove(email.id)}>Remove</button>


                </div>
                            

            ))}

            </ul>
    )
}

export default EmailList