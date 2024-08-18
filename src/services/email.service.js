import { storageService } from "./async-storage.service";
import { utilService } from './util.service.js'

export const emailService = {
    query,
    getById,
    remove,
    // save,
    // createEmail,
    getDefaultFilter

}

const STORAGE_KEY = 'emails'

_createEmails()
_createUsers()



async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if(filterBy){
        let {txt='', isRead=null} = filterBy
   

    emails = emails.filter(email => {
        return (isRead===null || email.isRead=== isRead) && 
        (email.subject.toLowerCase().includes(txt.toLowerCase())||
        email.body.toLowerCase().includes(txt.toLowerCase()))
    })   
}
    return emails

}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function getDefaultFilter() {
    return {
        status: "", 
        txt: "", 
        isRead: null,
    }
}


function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (emails && emails.length > 0) return


    emails = [
        {
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: true,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'momo@momo.com',
            to: 'demo@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Hello there!',
            body: 'How are you today',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e103',
            subject: 'This is Spam',
            body: 'BLA BLA BLA',
            isRead: true,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'momo@momo.com',
            to: 'ilan@appsus.com'
        },
        {
            id: 'e104',
            subject: 'Lets talk',
            body: 'I need to talk to you',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            subject: 'Sale starts in ZARA today!',
            body: 'Big discounts!',
            isRead: true,
            isStarred: true,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
    ]

    utilService.saveToStorage(STORAGE_KEY, emails)
}



function _createUsers(){
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (users && users.length > 0) return


    users = [
       {
        email:'user@appsus.com',
        fullname:'Mahatma Appsus'
       }
    ]

    utilService.saveToStorage(STORAGE_KEY, users)

}