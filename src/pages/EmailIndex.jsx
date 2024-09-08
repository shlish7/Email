import { useState, useEffect } from "react"
import { useSearchParams, Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom'


import EmailList from "../cmps/EmailList"
import EmailFilter from "../cmps/EmailFilter"
import { EmailSort } from "../cmps/EmailSort"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import EmailFolderList from "../cmps/EmailFolderList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faPaperPlane, faFile } from '@fortawesome/free-regular-svg-icons'
import { faInbox, faPen, faBars } from '@fortawesome/free-solid-svg-icons'
import gmailLogo from '../assets/imgs/gmailLogo.png'
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"




export function EmailIndex() {
    const navigate = useNavigate()

    const defaultFilter = emailService.getDefaultFilter()
    const [menuBar, setMenuBar] = useState('open')
    const [emails, setEmails] = useState([])
    const [unreadCount, setUnreadCount] = useState()
    const [activeFolder,setActiveFolder] = useState()
    const [searchParam, setSearchParam] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromSearchParams(searchParam))
    const [sortBy, setSortBy] = useState({ key: 'date', direction: 'desc' })

    const { status, txt, isRead, sortField, sortOrder } = filterBy


    useEffect(() => {
        const status = searchParam.get('status') || 'inbox'
        if (searchParam) setFilterBy(prev => ({ ...prev, status: status }))
        

    }, [])

    useEffect(() => {
        // console.log('useEff emails: ',emails);
        // unreadCountEmails(emails)
        unreadCountEmails()
    },[emails])

    useEffect(() => {

        new URLSearchParams()
        loadEmails()
        setSearchParam(utilService.getExistingProperties(filterBy))


    }, [filterBy,sortBy])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            onSortBy('date')
            setEmails(emails)
        } catch (err) {
            console.log(err)
            showErrorMsg('Couldnt load emails')
        }
    }

    async function removeEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(email => emails.filter(email => email.id !== emailId))
            // unreadCountEmails(emails)
            showSuccessMsg('Email removed successfully')

        } catch (err) {
            console.log(err)
            showErrorMsg('Couldnt remove email')
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            
            setEmails(prevEmails =>prevEmails.map(email => {
                if (email.id === updatedEmail.id) {
                    return updatedEmail
                } 
                else { return email }
            }))
        //    unreadCountEmails(emails)

        }
        catch (err) {
            console.log(err)
            showErrorMsg('Couldnt move email to trash')

        }

    }

    async function onSaveEmail(email) {
        try {
            const emailToSave = await emailService.save(email)

            if (!email.id) {
                setEmails(emails => [...emails, emailToSave])
            }
            else {
                setEmails(emails => emails.map(_email => {
                    _email.id === emailToSave.id ? emailToSave : _email
                }

                ))
            }
        } catch (err) {
            console.log(err)
            showErrorMsg('Couldnt sent email')

        }
    }

   async function unreadCountEmails(){
        try {
             const  unreadEmails = await emailService.getUnreadCountEmails()
             console.log('unreadEmails',unreadEmails);

            setUnreadCount(unreadEmails)

        } catch (error) {
            showErrorMsg('couldnt fetch unread emails')
        }
    }

    function handleFolderChange(folderName){
        setFilterBy(prev => ({ ...prev, status: folderName }))
        setActiveFolder(folderName)

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

    }



    function onSortBy(sortField, sortOrder) {
        const sortedEmails = [...emails]
    
       sortedEmails.sort((a, b) => {
            let comparison = 0
            switch(sortField) {
                case 'date':
                    comparison = new Date(a.sentAt) - new Date(b.sentAt)
                    break
                case 'subject':
                    comparison = a.subject.localeCompare(b.subject);
                    break
                default:
                    return 0
            }
            console.log('comparison: ',comparison);
            return sortBy.direction === 'desc' ? -comparison : comparison
        });
        // setFilterBy(prev => ({ ...prev, [sortField]: sortOrder }));

        setEmails(sortedEmails)
    }

    function onChangeMenuBar(ev){
        ev.stopPropagation()
        ev.preventDefault()
        menuBar === 'open' ? setMenuBar('close') : setMenuBar('open')
    }

    function onNavigateToCompose(ev){
        ev.stopPropagation()
        ev.preventDefault()
        console.log('compose');
        navigate("/Compose")

    }
    

    if (!emails) return <div>Loading...</div>
    return <section className="email-index-section">
        <header className="email-index-header">

            <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} />

        </header>
        <aside className={menuBar ==='open' ? "email-index-left-aside": "email-index-left-aside-closed"}>
            <div className="logo-section">
            <FontAwesomeIcon icon={faBars} className = 'menu-bar-icon' onClick={onChangeMenuBar}/>
            <img src={gmailLogo} alt="" className="gmail-logo" />
            </div>
      
            {
               menuBar==='open' ? <Link className='link-to-compose' to="/Compose">
                Compose
                <FontAwesomeIcon className="pen-icon" icon={faPen}  />
            </Link> 
            :
            <FontAwesomeIcon className="pen-icon" icon={faPen} onClick={onNavigateToCompose} />

            }
            {/* <Link className='link-to-compose' to="/Compose">
                Compose
                <FontAwesomeIcon className="pen-icon" icon={faPen} />
            </Link> */}


            <EmailFolderList 
                filterBy={filterBy}
                onFilterBy={onFilterBy} 
                emailFolders={emailFolders} 
                unreadCount={unreadCount} 
                onFolderChange={handleFolderChange}
                menuBar={menuBar} />

        </aside>
        <main className="emails-list">
            <EmailSort onSortBy={onSortBy} />
            <EmailList emails={emails} onRemove={removeEmail} onUpdateEmail={onUpdateEmail} filterBy={filterBy}  />

        </main>
        <aside className="email-index-right-aside">

        </aside>
        <Outlet context={{ onSaveEmail }} />

    </section>


}