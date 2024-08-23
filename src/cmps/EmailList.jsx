import React from 'react'
import EmailPreview from './EmailPreview'

function EmailList({emails, onRemove, onUpdateEmail, filterBy}) {
    return (
            <ul >
            {emails.map(email => (
                <div key={email.id} className='email-item'>
                     <EmailPreview email={email}  key={email.id} onUpdateEmail={onUpdateEmail}/>
                     { filterBy.status.toLowerCase()=== 'trash' &&<button onClick={() => onRemove(email.id)}>Remove</button>}


                </div>
                            

            ))}

            </ul>
    )
}

export default EmailList