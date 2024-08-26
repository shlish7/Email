
import EmailList from "../cmps/EmailList"
import EmailFilter from "../cmps/EmailFilter"
import { emailService } from "../services/email.service"
import { useState, useEffect } from "react"
import EmailFolderList from "../cmps/EmailFolderList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import gmailLogo from '../assets/imgs/gmailLogo.png'




export function EmailIndex() {
    const defaultFilter = emailService.getDefaultFilter()

    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(defaultFilter)
    
    useEffect(() => {
        
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            console.log("Email Index: " , emails)
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

    async function onUpdateEmail(email){
        try{
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(email=>{
                if(email.id === updatedEmail.id) return updatedEmail
                else {return email}
            }) )
        }
        catch(err){
            console.log(err)            
            alert('Couldnt move email trash')

        }
          
    }

      const emailFolders = [
    { name: 'Inbox', icon: faInbox },
    { name: 'Sent', icon: faPaperPlane },
    { name: 'Star', icon: faStar },
    { name: 'Trash', icon: faTrashCan }
  ];


    if (!emails) return <div>Loading...</div>
    return <section className="email-index-section">
        <header className="email-index-header">

        <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} />

        </header>
        <aside className="email-index-left-aside">
        <EmailFolderList filterBy={filterBy} onFilterBy={onFilterBy}  emailFolders={emailFolders}/>
        </aside>
    <main className="emails-list">
    <EmailList emails={emails} onRemove={removeEmail} onUpdateEmail={onUpdateEmail} filterBy={filterBy}/>

    </main>
      <aside className="email-index-right-aside">

      </aside>

    </section>


}