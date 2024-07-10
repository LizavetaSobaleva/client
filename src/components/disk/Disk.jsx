import React, { useEffect } from "react";
import './disk.less'
import { useDispatch, useSelector } from "react-redux";
import { getFiles, getStructure } from "../../actions/file";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import FileList from "./fileList/FileList";
import CreateDir from "./CreateDir";
import { setPopupDisplay } from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import SecondaryButton from "../UI/secondaryButton/SecondaryButton";
import list from "../../assets/img/list.svg";
import list_active from "../../assets/img/list_primary.svg";
import plate from "../../assets/img/grid.svg";
import plate_active from "../../assets/img/grid_primary.svg";
import { setFileView } from "../../reducers/appReducer";
import UploadInput from "./uploadInput/UploadInput";

const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
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

  
  return (
        <div className="disk">
          <div className="disk__btns">
            <PrimaryButton onClick={() => showPopupHandler()} data-testid="diskCreateBtn">Create folder</PrimaryButton>
            <div className="disk__view">
              <SecondaryButton onClick={() => dispatch(setFileView('list'))} data-testid="listViewBtn">
                <img src={listView} alt="" className='disk__list'/>
              </SecondaryButton>
              <SecondaryButton onClick={() => dispatch(setFileView('plate'))} data-testid="plateViewBtn">
                <img src={plateView} alt="" className='disk__plate'/>
              </SecondaryButton>
            </div>
          </div>

          <UploadInput/>
          <FileList/>  
          <Uploader/>
          <CreateDir/>
        </div>
    );
};

export default Disk;
