import React from 'react'
import './profile.less'
import { useDispatch, useSelector } from 'react-redux'
import avatarLogo from '../../assets/img/user_primary.svg'
import sizeFormat from '../../utils/sizeFormat'
import SecondaryButton from '../UI/secondaryButton/SecondaryButton'
import ProgressBar from '../UI/progressBar/ProgressBar'
import { deleteAvatar, uploadAvatar } from '../../actions/user'
import backIcon from "../../assets/img/back.png"
import { logout } from '../../reducers/userReducer'
import { NavLink } from 'react-router-dom'


const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const avatarUser = `${process.env.REACT_APP_API_URL}/${currentUser.avatar}`
    const avatar = currentUser.avatar ? avatarUser : avatarLogo
    const usedSpace = ((currentUser.usedSpace / currentUser.diskSpace) * 100).toFixed()
    const dispatch = useDispatch()

    const handleUploadButtonClick = () => {
        document.getElementById('avatarInput').click();
    }

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

  return (
    <>
    <NavLink to="/">
        <div className="profile__back">
            <img src={backIcon} alt="" className='profile__img'/>
        </div>
    </NavLink>
        <div className='profile'>

            <div className="profile__avatar">
                <img src={avatar} alt="" className="profile__image"/>
                <input type="file" accept='image/*' id="avatarInput" onChange={e => changeHandler(e)} />
                <label htmlFor="avatarInput">
                    {!currentUser.avatar && <SecondaryButton onClick={handleUploadButtonClick}>Upload avatar</SecondaryButton>}
                </label>
                {currentUser.avatar && <SecondaryButton onClick={() => dispatch(deleteAvatar())}>Delete avatar</SecondaryButton>}
            </div>

            <div className="profile__content">
                <div className="profile__name">{currentUser.name}</div>
                <div className="profile__email">{currentUser.email}</div>
                <div className="profile__diskSpace">
                    Used space:
                    <div className="profile__data">
                        {sizeFormat(currentUser.usedSpace)} from {sizeFormat(currentUser.diskSpace)}
                        <ProgressBar progress={usedSpace}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="profile__logout" onClick={() => dispatch(logout())}>
            <SecondaryButton>
                Log out
            </SecondaryButton>
        </div>
    </>
    
  )
}

export default Profile