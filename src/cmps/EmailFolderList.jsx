import React from 'react'
import { useState, useEffect } from 'react'

export default function EmailFolderList({filterBy,onFilterBy}) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
  
    useEffect(() => {
      console.log("filterByToEdit: ", filterByToEdit)
      onFilterBy(filterByToEdit)
    }, [filterByToEdit])
  
  
    function onChooseFolder({ target }) {
    
      const { value, name, textContent } = target
      console.log("Click on ", textContent," Folder")

      setFilterByToEdit(prev => ({ ...prev, ["status"]:textContent.toLowerCase()}))
  }
  


    return (
        <section className="email-folder-list-section">
            <h4 onClick={onChooseFolder}>Inbox</h4>
            <h4 onClick={onChooseFolder}>Sent</h4>
            <h4 onClick={onChooseFolder}>Star</h4>
            <h4 onClick={onChooseFolder}>Trash</h4>
        </section>
    )
}


