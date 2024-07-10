import React, { useState } from "react";
import "./disk.less";
import Popup from "../UI/popup/Popup";
import Input from "../UI/input/Input";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer";
import { createDir } from "../../actions/file";

const CreateDir = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch()

  function createHandler() {
    dispatch(createDir(currentDir, dirName))
    setDirName('')
    dispatch(setPopupDisplay('none'))
  }

  return (
    <div className="createdir" onClick={() => dispatch(setPopupDisplay('none'))} style={{ display: popupDisplay }} data-testid="testOutsideContent">
      <div className="createdir__content" data-testid="testContent">
        <Popup header="Create new folder" onClick={() => dispatch(setPopupDisplay('none'))}>
          <Input type="text"  data-testid="createInput" placeholder="Enter folder name..." value={dirName} onChange={(event) => setDirName(event.target.value)} />
          <PrimaryButton onClick={() => createHandler()} data-testid="createBtn">Create</PrimaryButton>
        </Popup>
      </div>
    </div>
  );
};

export default CreateDir;
