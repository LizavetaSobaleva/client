import React, { useEffect, useState} from "react";
import './disk.less'
import { useDispatch, useSelector } from "react-redux";
import { getFiles, getStructure, uploadFile } from "../../actions/file";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import FileList from "./fileList/FileList";
import CreateDir from "./CreateDir";
import { setPopupDisplay } from "../../reducers/fileReducer";
import upload from "../../assets/img/upload.svg"
import plus from "../../assets/img/plus.svg"
import Uploader from "./uploader/Uploader";
import SecondaryButton from "../UI/secondaryButton/SecondaryButton";
import list from "../../assets/img/list.svg";
import list_active from "../../assets/img/list_primary.svg";
import plate from "../../assets/img/grid.svg";
import plate_active from "../../assets/img/grid_primary.svg";
import { setFileView } from "../../reducers/appReducer";

const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const [dragEnter, setDragEnter] = useState(false)
  const fileView = useSelector(state => state.app.view)
  const listView = fileView === 'list' ? list_active : list
  const plateView = fileView === 'plate' ? plate_active : plate
  

  useEffect(() => {
    dispatch(getFiles(currentDir))
    dispatch(getStructure())
  }, [currentDir])

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

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
        <div className="disk">
          <div className="disk__btns">
            <PrimaryButton onClick={() => showPopupHandler()}>Create folder</PrimaryButton>
            <div className="disk__view">
              <SecondaryButton onClick={() => dispatch(setFileView('list'))}>
                <img src={listView} alt="" className='disk__list'/>
              </SecondaryButton>
              <SecondaryButton onClick={() => dispatch(setFileView('plate'))}>
                <img src={plateView} alt="" className='disk__plate'/>
              </SecondaryButton>
            </div>
          </div>

          {!dragEnter ? 
            <div className="disk__upload" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
              <label htmlFor="disk__upload-input" className="disk__upload-label">
                <img src={upload} alt="" className='disk__upload-img'/>
                <div className="disk__upload-message">Click and choose or drag files to this area to upload</div>
              </label>
              <input onChange={(event) => fileUploadHandler(event)} multiple={true} type="file" id="disk__upload-input" className="disk__upload-input"/>
            </div>
            :
            <div className="disk__drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
              <img src={plus} alt="" className='disk__upload-img'/>
                Drop files to this area to upload
            </div>
          }
          <FileList/>  

          <Uploader/>
          <CreateDir/>
        </div>
    );
};

export default Disk;
