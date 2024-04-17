import React from 'react'
import './uploader.less'
import Popup from '../../UI/popup/Popup'
import UploadFile from './UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../../reducers/uploadReducer'

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

  return (
    isVisible &&
    <div className='uploader'>
        <Popup header={'Uploaded files'} onClick={() => dispatch(hideUploader())}>
            <div className="uploader__content">
                {files.map(file => <UploadFile key={file.id} file={file} />)}
            </div>
        </Popup>
    </div>
  )
}

export default Uploader