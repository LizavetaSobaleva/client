import React, { useState } from 'react'
import './navigation.less'
import DirItem from './DirItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearStack, setCurrentDir } from '../../../reducers/fileReducer'
import { NavLink } from 'react-router-dom'
import Dir from '../../../assets/img/dir.svg'
import Star from '../../../assets/img/star.svg'
import Settings from '../../../assets/img/settings.svg'
import DropdownButton from '../../UI/dropdownButton/DropdownButton'


const Navigation = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const dirStructure = useSelector((state) => state.files.dirStructure)
    const hasChildren = dirStructure && dirStructure.length > 0


    function openHandler() {
        dispatch(clearStack())
        dispatch(setCurrentDir(null))
    }

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }
    

  return (
    <div className='navigation'>
      
      <div className="navigation__item">
      <NavLink to="/"  onClick={() => openHandler()}>
        <div className="navigation__title">
          <img src={Dir} alt="" className="navigation__icon"/>
          <div className="navigation__name">My Cloud</div>

          {hasChildren && (
            <div className="navigation__dropdown" onClick={toggleDropdown}>
              <DropdownButton />
            </div>
          )}
        </div>
        </NavLink>
        <div className={`navigation__content ${isOpen ? 'visible' : ''}`} >
          {hasChildren && (
            <div className="navigation__element">
              {dirStructure.map((dir) => 
                <DirItem file={dir} title={dir.name} key={dir.path}/>
              )}
            </div>
          )}
        </div>
      </div>
      

      <div className="navigation__item">
      <div className="navigation__title">
          <img src={Star} alt="" className="navigation__icon"/>
          <div className="navigation__name">Menu Item 2</div>
        </div>
      </div>

      <div className="navigation__item">
      <div className="navigation__title">
          <img src={Settings} alt="" className="navigation__icon"/>
          <div className="navigation__name">Menu Item 3</div>
        </div>
      </div>
        
        
        
    </div>
  )
}

export default Navigation