import React, { useState } from 'react'
import './sidebar.less'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import Logo from '../../assets/img/logo.png'
import Logout from '../../assets/img/logout.svg'
import SecondaryButton from '../UI/secondaryButton/SecondaryButton'
import { NavLink } from 'react-router-dom'
import Navigation from './navigation/Navigation'
import DropdownButton from '../UI/dropdownButton/DropdownButton'


const Sidebar = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }

    window.addEventListener('resize', function() {
      const screenWidth = window.innerWidth
      const sidebar = document.querySelector('.sidebar')
    
      if (screenWidth <= 768) {
        sidebar.classList.add('compressed')
      } else {
        sidebar.classList.remove('compressed')
      }
    })
    


  return (
    <div className={`sidebar ${isOpen ? 'compressed' : ''}`}>
        <div className="sidebar__content">
          <NavLink to="/">
            <div className="sidebar__header">
              <img src={Logo} alt="" className="sidebar__logo"/>
              <div className="sidebar__title">MERN cloud</div>
            </div>
          </NavLink>
          <div className="sidebar__navigation">
            <Navigation/>
          </div>
          <div className="sidebar__logout" onClick={() => dispatch(logout())}>
            
            <SecondaryButton>
              <img src={Logout} alt="" className="sidebar__logout-icon"/>
              <div className="sidebar__logout-text">Log out</div>
            </SecondaryButton>
          </div>
        </div>
        <div className='sidebar__compress' onClick={toggleDropdown}>
          <DropdownButton/>
        </div>
    </div>
  )
}

export default Sidebar