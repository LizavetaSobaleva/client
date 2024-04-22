import React, { useState } from 'react'
import './navbar.less'
import Logo from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../UI/input/Input'
import { getFiles, searchFiles } from '../../actions/file'
import avatarLogo from '../../assets/img/user_primary.svg'
import { showLoader } from '../../reducers/appReducer'

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const currentDir = useSelector(state => state.files.currentDir)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const [searchName, setSearchName] = useState('')
  const [searchTimout, setSearchTimout] = useState(false)
  const avatar = currentUser.avatar ? `${process.env.REACT_APP_API_URL}/${currentUser.avatar}` : avatarLogo


  function searchChangeHandler(e) {
    setSearchName(e.target.value)
    if(searchTimout !== false) {
      clearTimeout(searchTimout)
    }
    dispatch(showLoader())
    if(e.target.value !== '') {
      setSearchTimout(setTimeout((value) => {
        dispatch(searchFiles(value))
      }, 500, e.target.value))
    } else {
      dispatch(getFiles(currentDir))
    }
  }
  

  return (
    <div className='navbar'>
      <div className="navbar__content">
      {!isAuth ? 
        <>
          <div className="navbar__header">
            <img src={Logo} alt="" className="navbar__logo"/>
            <span>MERN cloud</span>
          </div>
          <div className="navbar__btns">
            <div className="navbar__login"><NavLink to="/login">Log in</NavLink></div>
            <div className="navbar__registration"><NavLink to="/registration">Sign up</NavLink></div>
          </div>
        </>
        :
        <>
          <div className="navbar__header">
            <Input type='search' placeholder="Type to search..."
              value={searchName}
              onChange={e => searchChangeHandler(e)}
            />
          </div>
          <div className="navbar__user">
            <div className="navbar__message">Hello, {currentUser.name}!</div>
            <NavLink to="/profile">
              <img src={avatar} alt="" className="navbar__avatar"/>
            </NavLink>
          </div>
        </>
      }
        </div>
      

        
    </div>
  )
}

export default Navbar