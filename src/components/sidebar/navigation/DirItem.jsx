import React, { useState } from 'react'
import './navigation.less'
import { useDispatch } from 'react-redux'
import { pushToStack, setCurrentDir, clearStack } from '../../../reducers/fileReducer'
import DropdownButton from '../../UI/dropdownButton/DropdownButton'

const DirItem = ({ file, title }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = file && file.childs && file.childs.length > 0;


  function openHandler() {
    const path = file.idPath.slice(0, -1)
    dispatch(clearStack())
    dispatch(pushToStack(path))
    dispatch(setCurrentDir(file._id))
  }

  

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='diritem' data-testid={`dirItem-${file._id}`}>
      <div className="diritem__content">
        <div className="diritem__title" onClick={() => openHandler(file)} data-testid={`dirItemTitle-${file._id}`}>
          {title}
        </div>

        {hasChildren && (
          <div className="diritem__dropdown" onClick={toggleDropdown} data-testid={`dirItemDropdown-${file._id}`}>
            <DropdownButton />
          </div>
        )}
      </div>

      {hasChildren && (
        <div className={`diritem__subitem ${isOpen ? 'visible' : ''}`} data-testid={`dirItemSubItem-${file._id}`}>
          {file.childs.map((dir) =>
            <DirItem file={dir} title={dir.name} key={dir.path} />
          )}
        </div>
      )}
    </div>
  )
}

export default DirItem
