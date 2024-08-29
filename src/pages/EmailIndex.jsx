import { useState, useEffect } from "react"
import { useSearchParams, Link, Outlet } from 'react-router-dom'

import EmailList from "../cmps/EmailList"
import EmailFilter from "../cmps/EmailFilter"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import EmailFolderList from "../cmps/EmailFolderList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faPaperPlane, faFile } from '@fortawesome/free-regular-svg-icons'
import { faInbox, faPen } from '@fortawesome/free-solid-svg-icons'
import gmailLogo from '../assets/imgs/gmailLogo.png'




export function EmailIndex() {
    const defaultFilter = emailService.getDefaultFilter()

    const [emails, setEmails] = useState([])
    const [searchParam, setSearchParam] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromSearchParams(searchParam))


    useEffect(() => {
        // console.log(searchParam.get('status'))
        console.log(searchParam.get('inbox'))
        const status = searchParam.get('status') || 'inbox'

        if (searchParam) setFilterBy(prev => ({ ...prev, status: status }))

    }, [])

    useEffect(() => {
        new URLSearchParams()
        loadEmails()
        setSearchParam(utilService.getExistingProperties(filterBy))

    }, [filterBy])

    async function loadEmails() {
        try {
            console.log("filterBy: ", filterBy)

            const emails = await emailService.query(filterBy)
            console.log("Email Index: ", emails)
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
        // console.log("filterBy: ", filterBy)
        setFilterBy(filterBy)
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(email => {
                if (email.id === updatedEmail.id) return updatedEmail
                else { return email }
            }))
        }
        catch (err) {
            console.log(err)
            alert('Couldnt move email trash')

        }

    }

    const emailFolders = [
        { name: 'Inbox', icon: faInbox },
        { name: 'Sent', icon: faPaperPlane },
        { name: 'Star', icon: faStar },
        { name: 'Trash', icon: faTrashCan },
        { name: 'Draft', icon: faFile }

    ];


    if (!emails) return <div>Loading...</div>
    return <section className="email-index-section">
        <header className="email-index-header">

            <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} />

        </header>
        <aside className="email-index-left-aside">

            <img src={gmailLogo} alt="" className="gmail-logo" />
            <Link className='link-to-compose' to="/Compose">
                Compose
                <FontAwesomeIcon className="pen-icon" icon={faPen} />
            </Link>


            <EmailFolderList filterBy={filterBy} onFilterBy={onFilterBy} emailFolders={emailFolders} />

        </aside>
        <main className="emails-list">
            <EmailList emails={emails} onRemove={removeEmail} onUpdateEmail={onUpdateEmail} filterBy={filterBy} />

        </main>
        <aside className="email-index-right-aside">

        </aside>
        <Outlet/>

    </section>


}