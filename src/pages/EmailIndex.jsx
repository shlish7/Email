
import EmailList from "../cmps/EmailList"
import EmailFilter from "../cmps/EmailFilter"
import { emailService } from "../services/email.service"
import { useState, useEffect } from "react"
import EmailFolderList from "../cmps/EmailFolderList"




export function EmailIndex() {
    const defaultFilter = emailService.getDefaultFilter()

    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(defaultFilter)
    
    useEffect(() => {
        console.log("Emails:", emails)
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)

        } catch (err) {
            console.log(err)
            alert('Couldnt load emails')
        }
    }

    async function removeEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(email => emails.filter(email => email.id !== emailId))
        } catch (err) {
            console.log(err)            
            alert('Couldnt remove email')
        }
    }
    function onFilterBy(filterBy) {
        console.log("filterBy: ", filterBy)
        setFilterBy(filterBy)
    }

    if (!emails) return <div>Loading...</div>
    return <section className="email-index-section">

        <EmailFolderList filterBy={filterBy} onFilterBy={onFilterBy} />
        <section className="emails-list">
            <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} />
            <EmailList emails={emails} onRemove={removeEmail} />
        </section>

    </section>


}