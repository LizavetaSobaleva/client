import React, { useState } from "react"
import "./fileList.less"
import { useDispatch, useSelector } from "react-redux"
import File from "./file/File"
import { popFromStack, setCurrentDir } from "../../../reducers/fileReducer"
import backIcon from "../../../assets/img/back.png"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Loader from "../../UI/loader/Loader"


const FileList = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)
  const loader = useSelector(state => state.app.loader)
  const fileView = useSelector(state => state.app.view)
  const [fieldName, setFieldName] = useState('type');

  const files = useSelector((state) => state.files.files)
  const sortedFiles = files.slice().sort((a,b) => a[fieldName].localeCompare(b[fieldName]))

  const dirStack = useSelector((state) => state.files.dirStack)

  function backClickHandler() {
    dispatch(popFromStack(currentDir));
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }


  if (fileView === 'list') {
    return (
      <>
        <div className="filelist">
          <div className="filelist__header">
            <div className="filelist__type" onClick={() => setFieldName('type')}>Type</div>
            <div className="filelist__name" onClick={() => setFieldName('name')}>Name</div>
            <div className="filelist__date" onClick={() => setFieldName('date')}>Date</div>
            <div className="filelist__size">File size</div>
            <div className="filelist__actions"></div>
          </div>

          {loader && <Loader/> }
          
            {currentDir && 
              <div className="filelist__back" data-testid="backBtn" onClick={() => backClickHandler()}>
                <img src={backIcon} alt="" className='filelist__img'/>
                Back
              </div>}
  
              <TransitionGroup>
                {sortedFiles.map((file) => 
                  <CSSTransition
                    key={file._id}
                    timeout={500} 
                    classNames={"file"}
                    exit={false}
                    in={!loader}
                    mountOnEnter
                    unmountOnExit
                  >
                    <File file={file} />
                  </CSSTransition>
                )}
              </TransitionGroup>
        </div>
        
        {files.length === 0 &&
          <div className="filelist__empty">
            Files not found
          </div>
        }
      </>
      
    );
  }

  if (fileView === 'plate') {
    return (
      <>
        <div className="fileplate">
          
            {currentDir && 
              <div className="fileplate__back" onClick={() => backClickHandler()}>
                <img src={backIcon} alt="" className='fileplate__img'/>
              </div>}
  
              {loader && <Loader/> }
            
                {sortedFiles.map((file) => 
                  <File file={file} key={file._id} />
                )}
        </div>
        
        {files.length === 0 &&
          <div className="fileplate__empty">
            Files not found
          </div>
        }
      </>
      
    );
  }
  
};

export default FileList;
