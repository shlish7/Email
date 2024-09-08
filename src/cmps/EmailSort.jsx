import React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'


export function EmailSort({onSortBy}) {
    const [dateArrowDirection, setDateArrowDirection] = useState('desc')
    const [subjectArrowDirection, setSubjectArrowDirection] = useState()

    function onSortDate() {
        // Toggle the sorting direction
        // console.log('dateArrowDirection',dateArrowDirection);
        const newDirection = dateArrowDirection === 'asc' ? 'desc' : 'asc'
        setDateArrowDirection(newDirection)
        onSortBy('date')
    }

    function onSortSubject() {
        // console.log('dateArrowDirection',dateArrowDirection);

        const newDirection = subjectArrowDirection === 'asc' ? 'desc' : 'asc'
        setSubjectArrowDirection(newDirection)
        onSortBy('subject')
    }



    return (
        <section className='sort-emails'>
            <button className='sort-btn sort-date' onClick={onSortDate}>
                {dateArrowDirection === 'asc' ? (
                    <FontAwesomeIcon icon={faChevronUp} className='up-arrow' />
                ) : (
                    <FontAwesomeIcon icon={faChevronDown} className='down-arrow' />
                )}
                Date
            </button>
            <button className='sort-btn sort-subject' onClick={onSortSubject}>
            {subjectArrowDirection === 'asc' ? (
                    <FontAwesomeIcon icon={faChevronUp} className='up-arrow' />
                ) : (
                    <FontAwesomeIcon icon={faChevronDown} className='down-arrow' />
                )}
                Subject
            </button>
        </section>
    );
}
