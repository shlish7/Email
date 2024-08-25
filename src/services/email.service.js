import { storageService } from "./async-storage.service";
import { utilService } from './util.service.js'

export const emailService = {
    query,
    getById,
    remove,
    save,
    // createEmail,
    getDefaultFilter

}

const STORAGE_KEY = 'emails'

_createEmails()
_createUsers()




async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if(filterBy){
        let {status = '', txt='', isRead=null} = filterBy
        
        emails = emails.filter(email => {
        return (isRead===null || email.isRead=== isRead) && 
        (
            email.subject.toLowerCase().includes(txt.toLowerCase())||
        email.body.toLowerCase().includes(txt.toLowerCase()
    )
    )
    }) 
    const filters = {
        inbox: email => email.to === 'user@appsus.com' && email.removedAt===null,
        sent: email => email.to !== 'user@appsus.com'  && email.removedAt===null,
        star: email => email.isStarred === true && email.removedAt===null,
        trash: email => !!email.removedAt
    };

    
    return status ? emails.filter(filters[status]) : emails;  
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
        status: "inbox", 
        txt: "", 
        isRead: null,
    }
}


function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
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
            from: 'momo@momo.com',
            to: 'user@appsus.com'        },
        {
            id: 'e102',
            subject: 'Hello there!',
            body: 'How are you today',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'koko@koko.com',
            from: 'koko@koko.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e103',
            subject: 'This is Spam',
            body: 'BLA BLA BLA',
            isRead: true,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'popo@mpopo.com',
            from: 'popo@mpopo.com',
            to: 'ilan@appsus.com'
        },
        {
            id: 'e104',
            subject: 'Lets talk',
            body: 'I need to talk to you',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'toto@toto.com',
            from: 'toto@toto.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            subject: 'Sale starts in ZARA today!',
            body: 'Big discounts!',
            isRead: true,
            isStarred: true,
            sentAt: 1551133930594,
            removedAt: null, //for later use from: 'fofo@fofo.com',
            from: 'fofo@fofo.com',
            to: 'user@appsus.com'
        },
    ]

    emails = [
        {
            "id": "e001",
            "subject": "Happy Birthday!",
            "body": "Welcome to our service! We're glad to have you with us.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1673725503362,
            "removedAt": null,
            "from": "user@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e002",
            "subject": "Application Approved",
            "body": "Your feedback is important to us. Please take a moment to complete our survey.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1691869503362,
            "removedAt": null,
            "from": "user89@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e003",
            "subject": "Your Invoice is Ready",
            "body": "We are pleased to inform you that your payment has been received.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1697399103362,
            "removedAt": null,
            "from": "user36@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e004",
            "subject": "Join Us for a Live Event",
            "body": "We have an important update regarding your account.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1700423103362,
            "removedAt": null,
            "from": "user99@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e005",
            "subject": "Payment Received",
            "body": "We are excited to announce our new product lineup.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1662234303362,
            "removedAt": null,
            "from": "user43@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e006",
            "subject": "Ticket Confirmation",
            "body": "Your order has been processed and will be delivered soon.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1695584703362,
            "removedAt": null,
            "from": "user53@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e007",
            "subject": "Invitation to Webinar",
            "body": "Your membership has been renewed successfully.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1713555903362,
            "removedAt": null,
            "from": "user98@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e008",
            "subject": "Invitation to Connect",
            "body": "We are excited to announce our new product lineup.",
            "isRead": false,
            "isStarred": false,
            "sentAt": 1691869503362,
            "removedAt": null,
            "from": "user45@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e009",
            "subject": "Action Required: Password Reset",
            "body": "We noticed unusual activity on your account. Please verify your identity.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1683792303362,
            "removedAt": null,
            "from": "user74@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e010",
            "subject": "Special Discount Inside",
            "body": "We would love to get your feedback on our latest product.",
            "isRead": false,
            "isStarred": false,
            "sentAt": 1667250303362,
            "removedAt": null,
            "from": "user50@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e011",
            "subject": "Thank You for Your Purchase",
            "body": "We appreciate your business and hope to serve you again soon.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1695584703362,
            "removedAt": null,
            "from": "user29@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e012",
            "subject": "Time to Update Your Profile",
            "body": "Please update your profile to ensure you receive the latest updates.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1703108703362,
            "removedAt": null,
            "from": "user36@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e013",
            "subject": "New Features Available",
            "body": "We have some exciting news to share with you!",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1665662703362,
            "removedAt": null,
            "from": "user61@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e014",
            "subject": "Survey Invitation",
            "body": "Thank you for being a valued customer. Here's a special offer just for you.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1668962703362,
            "removedAt": null,
            "from": "user95@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e015",
            "subject": "Reminder: Upcoming Appointment",
            "body": "Your appointment is confirmed. We look forward to seeing you.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1710157503362,
            "removedAt": null,
            "from": "user24@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e016",
            "subject": "New Job Opportunity",
            "body": "Please find the attached document for your reference.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1709828703362,
            "removedAt": null,
            "from": "user12@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e017",
            "subject": "Payment Reminder",
            "body": "Don't miss out on this limited-time offer.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1683792303362,
            "removedAt": null,
            "from": "user49@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e018",
            "subject": "Conference Registration",
            "body": "Thank you for registering for our conference. We look forward to seeing you there.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1716918303362,
            "removedAt": null,
            "from": "user13@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e019",
            "subject": "New Comment on Your Post",
            "body": "We noticed a new comment on your post. Please check it out.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1709070303362,
            "removedAt": null,
            "from": "user14@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e020",
            "subject": "Service Maintenance Notification",
            "body": "We are excited to announce our new product lineup.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1684845903362,
            "removedAt": null,
            "from": "user52@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e021",
            "subject": "Important Document Enclosed",
            "body": "Please find the attached warranty information for your records.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1681002303362,
            "removedAt": null,
            "from": "user20@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e022",
            "subject": "Exclusive Offer Just for You",
            "body": "Please confirm your subscription to our newsletter.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1673389503362,
            "removedAt": null,
            "from": "user64@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e023",
            "subject": "System Alert",
            "body": "We have received your request and are working on it.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1709828703362,
            "removedAt": null,
            "from": "user58@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e024",
            "subject": "Reminder: Upcoming Appointment",
            "body": "Please take a moment to review the attached invoice.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1701452703362,
            "removedAt": null,
            "from": "user59@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e025",
            "subject": "Your Subscription is Expiring",
            "body": "Your subscription will expire soon. Please renew to continue enjoying our services.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1662606303362,
            "removedAt": null,
            "from": "user92@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e026",
            "subject": "Please Review Your Order",
            "body": "We are excited to announce our new product lineup.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1671685503362,
            "removedAt": null,
            "from": "user75@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e027",
            "subject": "Upcoming Deadline",
            "body": "Don't forget to attend the meeting scheduled for tomorrow.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1707752703362,
            "removedAt": null,
            "from": "user83@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e028",
            "subject": "Important Security Notice",
            "body": "Your feedback is important to us. Please take a moment to complete our survey.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1705331103362,
            "removedAt": null,
            "from": "user86@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e029",
            "subject": "Holiday Greetings",
            "body": "We would love to get your feedback on our latest product.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1670343903362,
            "removedAt": null,
            "from": "user68@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e030",
            "subject": "Survey Invitation",
            "body": "We appreciate your business and hope to serve you again soon.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1691247903362,
            "removedAt": null,
            "from": "user38@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e031",
            "subject": "Conference Registration",
            "body": "Thank you for registering for our conference. We look forward to seeing you there.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1666856703362,
            "removedAt": null,
            "from": "user91@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e032",
            "subject": "Action Required: Password Reset",
            "body": "We received a request to reset your password. Please follow the instructions to proceed.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1690674303362,
            "removedAt": null,
            "from": "user63@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e033",
            "subject": "New Message from Support",
            "body": "Please take a moment to verify your email address.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1705875903362,
            "removedAt": null,
            "from": "user72@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e034",
            "subject": "Your Gift Card",
            "body": "We have a special gift just for you. Please redeem it within 30 days.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1692480303362,
            "removedAt": null,
            "from": "user27@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e035",
            "subject": "System Alert",
            "body": "We noticed unusual activity on your account. Please verify your identity.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1679708703362,
            "removedAt": null,
            "from": "user51@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e036",
            "subject": "Upcoming Deadline",
            "body": "We appreciate your business and hope to serve you again soon.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1701169503363,
            "removedAt": null,
            "from": "user20@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e037",
            "subject": "Service Maintenance Notification",
            "body": "We noticed unusual activity on your account. Please verify your identity.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1710032703363,
            "removedAt": null,
            "from": "user28@appsus.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e038",
            "subject": "Event Reminder",
            "body": "Please find the attached document for your reference.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1709768703363,
            "removedAt": null,
            "from": "user62@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e039",
            "subject": "Happy Birthday!",
            "body": "Please take a moment to review the attached invoice.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1676816703363,
            "removedAt": null,
            "from": "user73@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e040",
            "subject": "Conference Registration",
            "body": "Please confirm your attendance at the upcoming event.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1716308703363,
            "removedAt": null,
            "from": "user26@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e041",
            "subject": "Important Product Update",
            "body": "We are pleased to inform you that your payment has been received.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1714679103363,
            "removedAt": null,
            "from": "user83@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e042",
            "subject": "New Features Available",
            "body": "Your feedback is crucial to us. Please let us know your thoughts.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1718726703363,
            "removedAt": null,
            "from": "user74@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e043",
            "subject": "Account Verification Required",
            "body": "We are excited to announce our new product lineup.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1724183103363,
            "removedAt": null,
            "from": "user34@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e044",
            "subject": "Membership Renewal",
            "body": "Please review your order details and confirm.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1692474303363,
            "removedAt": null,
            "from": "user85@company.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e045",
            "subject": "Upcoming Deadline",
            "body": "Your appointment is confirmed. We look forward to seeing you.",
            "isRead": true,
            "isStarred": false,
            "sentAt": 1711575903363,
            "removedAt": null,
            "from": "user21@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e046",
            "subject": "Event Reminder",
            "body": "Please take a moment to complete the attached survey.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1716435903363,
            "removedAt": null,
            "from": "user15@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e047",
            "subject": "Thank You for Your Feedback",
            "body": "Your feedback is crucial to us. Please let us know your thoughts.",
            "isRead": false,
            "isStarred": false,
            "sentAt": 1718726703363,
            "removedAt": null,
            "from": "user90@service.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e048",
            "subject": "Important Account Update",
            "body": "Please update your payment information to continue using our service.",
            "isRead": true,
            "isStarred": true,
            "sentAt": 1716534303363,
            "removedAt": null,
            "from": "user60@webmail.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e049",
            "subject": "Survey Invitation",
            "body": "Thank you for being a valued customer. Here's a special offer just for you.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1712189103363,
            "removedAt": null,
            "from": "user82@example.com",
            "to": "user@appsus.com"
        },
        {
            "id": "e050",
            "subject": "System Alert",
            "body": "We noticed unusual activity on your account. Please verify your identity.",
            "isRead": false,
            "isStarred": true,
            "sentAt": 1710157503363,
            "removedAt": null,
            "from": "user64@company.com",
            "to": "user@appsus.com"
        }
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