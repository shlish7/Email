import React from 'react'
import { useState, useEffect } from 'react'

function EmailFilter({ filterBy, onFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [isRead, setIsRead] = useState(filterBy.isRead)

  // Rendering while rendering and filterByToEdit is changing
  useEffect(() => {
    onFilterBy(filterByToEdit)
  }, [filterByToEdit])


  function handleChange({ target }) {
    const { value, name } = target
    console.log(filterByToEdit)
    setFilterByToEdit(prev => ({ ...prev, [name]: value }))
  }

  function btnName() {
    return isRead ? "Read" : "Unread"
  }

  function onReadBtnClicked(prev) {
    setIsRead(prev => !prev)
    setFilterByToEdit(prev => ({ ...prev, ["isRead"]: !isRead }))
  }

  return <section className='email-filter'>
    {/* <label htmlFor="txt">Subject</label> */}
    <input
      value={filterByToEdit.txt}
      onChange={handleChange}
      id="txt"
      name="txt"
      type="text"
      placeholder='Search...' />

    <button className="isRead" onClick={onReadBtnClicked}>{btnName()}</button>
  </section>

}

export default EmailFilter