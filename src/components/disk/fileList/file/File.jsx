import React from 'react'
import './file.less'
import dirLogo from '../../../../assets/img/folder.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import SecondaryButton from '../../../UI/secondaryButton/SecondaryButton'
import options from '../../../../assets/img/options.svg'
import Popup from '../../../UI/popup/Popup'
import { deleteFile, downloadFile } from '../../../../actions/file'
import sizeFormat from '../../../../utils/sizeFormat'

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.app.view)

    function openHandler() {
      if(file.type === 'dir') {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
      }
      }

    function downloadClickHandler(e) {
      e.stopPropagation()
      downloadFile(file)
    }

    // function renameClickHandler(e) {
    // }

    function deleteClickHandler(e) {
      e.stopPropagation()
      dispatch(deleteFile(file))
    }


  if (fileView === 'list') {
    return (
      <div className='file' onClick={() => openHandler(file)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className='file__img'/>
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{file.size !== 0 && sizeFormat(file.size)}</div>
        <div className="file__actions">
          <SecondaryButton style={{padding: 8}}>
            <img src={options} alt="" className='file__menu'/>
          </SecondaryButton>
          <div className="file__options">
            <Popup>
              {file.type !== 'dir' && <SecondaryButton onClick={(e) => downloadClickHandler(e)}>Download</SecondaryButton>}
              {/* <SecondaryButton onClick={(e) => renameClickHandler(e)}>Rename</SecondaryButton> */}
              <SecondaryButton onClick={(e) => deleteClickHandler(e)}>Delete</SecondaryButton>
            </Popup>
            </div>
        </div>
      </div>
    )
  }

  if (fileView === 'plate') {
    return (
      <div className='file-plate' onClick={() => openHandler(file)}>
          <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className='file-plate__img'/>
          <div className="file-plate__name">{file.name}</div>
          <div className="file-plate__date">{file.date.slice(0, 10)}</div>
          <div className="file-plate__size">{file.size !== 0 && sizeFormat(file.size)}</div>
          <div className="file-plate__actions">
            <SecondaryButton style={{padding: 8}}>
              <img src={options} alt="" className='file-plate__menu'/>
            </SecondaryButton>
              <div className="file-plate__options">
                <Popup>
                  {file.type !== 'dir' && <SecondaryButton onClick={(e) => downloadClickHandler(e)}>Download</SecondaryButton>}
                  {/* <SecondaryButton onClick={(e) => renameClickHandler(e)}>Rename</SecondaryButton> */}
                  <SecondaryButton onClick={(e) => deleteClickHandler(e)}>Delete</SecondaryButton>
                </Popup>
              </div>
          </div>
      </div>
    )
  }
}

export default File