import React, { useState } from 'react'
import './uploadInput.less'
import { uploadFile } from "../../../actions/file";
import upload from "../../../assets/img/upload.svg"
import plus from "../../../assets/img/plus.svg"
import { useDispatch, useSelector } from 'react-redux';




const UploadInput = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const [dragEnter, setDragEnter] = useState(false)

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    
    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    
    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    
    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

  return (
    <div>
        {!dragEnter ? 
            <div className="upload" data-testid="uploadArea" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
              <label htmlFor="upload-input" className="upload__label">
                <img src={upload} alt="" className='upload__img'/>
                <div className="upload__message" data-testid="uploadMessage">Click and choose or drag files to this area to upload</div>
              </label>
              <input onChange={(event) => fileUploadHandler(event)} multiple={true} type="file" id="upload-input" className="upload__input"/>
            </div>
            :
            <div className="drop-area" data-testid="uploadDropArea" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
              <img src={plus} alt="" className='upload__img'/>
                Drop files to this area to upload
            </div>
          }
    </div>
  )
}

export default UploadInput