import React from 'react'
import { useState, useEffect } from 'react'

export default function EmailFolderList({filterBy,onFilterBy}) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const[isRead, setIsRead] = useState (filterBy.isRead)
  
    useEffect(() => {
      onFilterBy(filterByToEdit)
    }, [filterByToEdit])
  
  
    function handleChange({ target }) {
      const { value, name } = target
      setFilterByToEdit(prev => ({ ...prev, [name]: value }))
  }
  
  function btnName(){
    return isRead ? "Read" : "Unread" 
  }
  
  function onReadBtnClicked(prev){
    setIsRead(prev => !prev)
    setFilterByToEdit(prev=>({ ...prev, ["isRead"]: !isRead }))
  }

    function onChooseFolder({target}){
        console.log("Clicked inbox")
    }

    return (
        <section className="email-folder-list-section">
            <h4 onClick={onChooseFolder}>Inbox</h4>
            <h4>Sent</h4>
            <h4>Star</h4>
            <h4>Trash</h4>
        </section>
    )
}
