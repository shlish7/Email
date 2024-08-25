import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import gmailLogo from '../assets/imgs/gmailLogo.png'


export default function EmailFolderList({ filterBy, onFilterBy, emailFolders }) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [activeFolder, setActiveFolder] = useState('inbox')



  useEffect(() => {
    onFilterBy(filterByToEdit)
  }, [filterByToEdit])



  function onChooseFolder({ target }) {
    const { value, name, textContent } = target

    console.log("textContent: ", textContent.toLowerCase().trim())

    setFilterByToEdit(prev => ({ ...prev, ["status"]: textContent.toLowerCase().trim() }))
    setActiveFolder(textContent.toLowerCase().trim())

  }



  return (
    <section className="email-folder-list-section">
      <img src={gmailLogo} alt="" className="gmail-logo"/>

      <ul className='folder-list-ul'>
        {
          emailFolders.map((folder, idx) => {

            return <li className={`folder-li ${activeFolder === folder.name.toLowerCase() ? 'active' : ''}`}  key={idx} onClick={onChooseFolder}>
            {/* return <li className="folder-li" key={idx} onClick={onChooseFolder}> */}
              <FontAwesomeIcon icon={folder.icon} className="folder-icons" />
              <h4
                className={`folder-name ${activeFolder === folder.name.toLowerCase() ? 'active' : ''}`}              
                >
                  {folder.name}</h4>

            </li>
          })
        }
      </ul>
    </section>
  )

}

