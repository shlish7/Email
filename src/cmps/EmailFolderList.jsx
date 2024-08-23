import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashCan, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faInbox } from '@fortawesome/free-solid-svg-icons'

export default function EmailFolderList({ filterBy, onFilterBy, emailFolders }) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


  useEffect(() => {
    onFilterBy(filterByToEdit)
  }, [filterByToEdit])


  // const foldersIcons = [
  //   { name: 'Inbox', icon: faInbox },
  //   { name: 'Sent', icon: faPaperPlane },
  //   { name: 'Star', icon: faStar },
  //   { name: 'Trash', icon: faTrashCan }
  // ];

  // const foldersIcons = ['faInbox', 'faPaperPlane', 'faStar', 'faTrashCan']


  function onChooseFolder({ target }) {

    const { value, name, textContent } = target
    setFilterByToEdit(prev => ({ ...prev, ["status"]: textContent.toLowerCase().trim() }))

  }



  return (
    <section className="email-folder-list-section">
      <ul>
        {
          emailFolders.map((folder, idx) => {
            // console.log("idx: " ,idx)
            // console.log("folder: " ,folder.idx)
           return  <li className="folder-li" key={idx} onClick={onChooseFolder}>
              <FontAwesomeIcon icon={folder.icon} className="folder-icons"/>
              <h4>{folder.name}</h4>
              </li>
          })
        }
      </ul>
    </section>
  )

}

