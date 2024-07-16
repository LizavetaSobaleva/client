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
    
      if (sidebar) {
        if (screenWidth <= 768) {
          sidebar.classList.add('compressed');
        } else {
          sidebar.classList.remove('compressed');
        }
      }
    })
    


    return (
      <div className={`sidebar ${isOpen ? 'compressed' : ''}`} data-testid="sidebar">
          <div className="sidebar__content" data-testid="sidebarContent">
              <NavLink to="/" data-testid="homeLink">
                  <div className="sidebar__header" data-testid="sidebarHeader">
                      <img src={Logo} alt="" className="sidebar__logo" data-testid="sidebarLogo"/>
                      <div className="sidebar__title">MERN cloud</div>
                  </div>
              </NavLink>
              <div className="sidebar__navigation" data-testid="sidebarNavigation">
                  <Navigation />
              </div>
              <div className="sidebar__logout" data-testid="sidebarLogout">
                  <SecondaryButton onClick={() => dispatch(logout())} data-testid="logoutButton">
                      <img src={Logout} alt="" className="sidebar__logout-icon" data-testid="logoutIcon"/>
                      <div className="sidebar__logout-text">Log out</div>
                  </SecondaryButton>
              </div>
          </div>
          <div className='sidebar__compressBtn' onClick={toggleDropdown} data-testid="compressButton">
              <DropdownButton />
          </div>
      </div>
  )
}

export default Sidebar