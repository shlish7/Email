import React from 'react'
import EmailPreview from './EmailPreview'

function EmailList({emails}) {
    return (
            <ul>
            {emails.map(email => (
                            <EmailPreview email={email}  key={email.id}/>

            ))}

            </ul>
    )
}

export default EmailList