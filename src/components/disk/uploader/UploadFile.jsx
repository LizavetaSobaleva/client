import React from 'react'
import './uploader.less'
import fileLogo from '../../../assets/img/file.svg'
import ProgressBar from '../../UI/progressBar/ProgressBar'
import close from '../../../assets/img/close.svg'
import SecondaryButton from '../../UI/secondaryButton/SecondaryButton'
import { useDispatch } from 'react-redux'
import { removeUploadFile } from '../../../reducers/uploadReducer'

const UploadFile = ({file}) => {
    const dispatch = useDispatch()


    return (
        <div className='uploadFile'>
            <img src={fileLogo} alt="" className='uploadFile__img'/>
            <div className="uploadFile__content">
                <div className="uploadFile__name" data-testid="fileName">{file.name}</div>
                <ProgressBar progress={file.progress} data-testid="progressBar"/>
            </div>
            <SecondaryButton onClick={() => dispatch(removeUploadFile(file.id))} data-testid="closeBtn">
                <img src={close} alt='' className='popup__close'/>
            </SecondaryButton>
            

        </div>
    )
}

export default UploadFile