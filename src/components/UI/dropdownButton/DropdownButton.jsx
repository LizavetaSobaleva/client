import React, { useState } from 'react'
import './dropdownButton.less'
import down from '../../../assets/img/down.svg'

const DropdownButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className="dropdown" onClick={toggleDropdown}>
        <img alt="" src={down} className={`dropdown__icon ${isOpen ? 'flipped' : ''}`} />
    </div>
  )
}

export default DropdownButton