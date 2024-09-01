import { useState, useEffect } from "react"
import { useSearchParams, Link, Outlet } from 'react-router-dom'

import EmailList from "../cmps/EmailList"
import EmailFilter from "../cmps/EmailFilter"
import { EmailSort } from "../cmps/EmailSort"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import EmailFolderList from "../cmps/EmailFolderList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faPaperPlane, faFile } from '@fortawesome/free-regular-svg-icons'
import { faInbox, faPen } from '@fortawesome/free-solid-svg-icons'
import gmailLogo from '../assets/imgs/gmailLogo.png'
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"




export function EmailIndex() {
    const defaultFilter = emailService.getDefaultFilter()

    const [emails, setEmails] = useState([])
    const [unreadCount, setUnreadCount] = useState()
    const [activeFolder,setActiveFolder] = useState()
    const [searchParam, setSearchParam] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromSearchParams(searchParam))
    const [sortBy, setSortBy] = useState({ key: 'date', direction: 'desc' })



    useEffect(() => {
        // console.log(searchParam.get('status'))
        const status = searchParam.get('status') || 'inbox'
        console.log(searchParam.get('inbox'))
        if (searchParam) setFilterBy(prev => ({ ...prev, status: status }))
        

    }, [])

    useEffect(() => {
        new URLSearchParams()
        loadEmails()
        setSearchParam(utilService.getExistingProperties(filterBy))


    }, [filterBy,sortBy])

    async function loadEmails() {
        try {
            console.log(filterBy)
            const emails = await emailService.query(filterBy)
            sortEmails(emails)

            setEmails(emails)
            unreadCountEmails(emails)


        } catch (err) {
            console.log(err)
            showErrorMsg('Couldnt load emails')
        }
    }

    async function removeEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(email => emails.filter(email => email.id !== emailId))
            unreadCountEmails(emails)
            showSuccessMsg('Email removed successfully')

        } catch (err) {
            console.log(err)
            showErrorMsg('Couldnt remove email')
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(email => {
                if (email.id === updatedEmail.id) {
                    return updatedEmail
                } 
                else { return email }
            }))
           unreadCountEmails(emails)

        }
        catch (err) {
            console.log(err)
            showErrorMsg('Couldnt move email to trash')

        }

    }

    async function onSaveEmail(email) {
        try {
            const emailToSave = await emailService.save(email)
            console.log('emailToSave: ', emailToSave)
            console.log('email.id: ', email.id)
            if (!email.id) {
                setEmails(emails => [...emails, emailToSave])
            }
            else {
                setEmails(emails => emails.map(_email => {
                    _email.id === emailToSave.id ? emailToSave : _email
                    console.log('_email: ', _email)
                }

                ))
            }
        } catch (err) {
            console.log(err)
            showErrorMsg('Couldnt sent email')

        }
    }

    function unreadCountEmails(emails, activeFolder) {
        
        if(filterBy.status==='inbox'){
            const emailsCount = emails.filter(email => !email.isRead).length
            console.log('emailsCount: ', emailsCount)
    
            setUnreadCount(emailsCount)
        }

        
    }

    function handleFolderChange(){
        setFilterBy(prev => ({ ...prev, status: folderName }))
    }

    const emailFolders = [
        { name: 'Inbox', icon: faInbox },
        { name: 'Sent', icon: faPaperPlane },
        { name: 'Star', icon: faStar },
        { name: 'Trash', icon: faTrashCan },
        { name: 'Draft', icon: faFile }

    ];

    function onFilterBy(filterBy) {
        setFilterBy(filterBy)
        // unreadCountEmails(emails)

    }

    function sortEmails(emails) {
        const sortedEmails = [...emails].sort((a, b) => {
            if (sortBy.key === 'date') {
                // console.log(new Date(a.sentAt))
                // console.log('subject',a.subject.localeCompare(b.subject))
                return sortBy.direction === 'asc' ? new Date(a.sentAt) - new Date(b.sentAt) : new Date(b.sentAt) - new Date(a.sentAt)
            } else if (sortBy.key === 'subject') {
                return sortBy.direction === 'asc' ? a.subject.localeCompare(b.subject) : b.subject.localeCompare(a.subject)
            }
        })
        setEmails(sortedEmails);
    }

    function onSortBy(key) {
        const newDirection = sortBy.direction === 'asc' ? 'desc' : 'asc';
        setSortBy({ key, direction: newDirection });
    }



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


            <EmailFolderList filterBy={filterBy} onFilterBy={onFilterBy} emailFolders={emailFolders} unreadEmailsCount={unreadCount} onFolderChange={handleFolderChange} />

        </aside>
        <main className="emails-list">
            <EmailSort onSortBy={onSortBy}/>
            <EmailList emails={emails} onRemove={removeEmail} onUpdateEmail={onUpdateEmail} filterBy={filterBy}  />

        </main>
        <aside className="email-index-right-aside">

        </aside>
        <Outlet context={{ onSaveEmail }} />

    </section>


}