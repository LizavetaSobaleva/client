import React, { useEffect, useState } from 'react'
import './profile.less'
import { useDispatch, useSelector } from 'react-redux'
import avatarLogo from '../../assets/img/user_primary.svg'
import sizeFormat from '../../utils/sizeFormat'
import SecondaryButton from '../UI/secondaryButton/SecondaryButton'
import ProgressBar from '../UI/progressBar/ProgressBar'
import { deleteAvatar, getAllUsers, uploadAvatar } from '../../actions/user'
import backIcon from "../../assets/img/back.png"
import { logout } from '../../reducers/userReducer'
import { NavLink } from 'react-router-dom'
import UsersList from './usersList/UsersList'
import Label from '../UI/label/Label'


const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const avatarUser = `${process.env.REACT_APP_API_URL}/${currentUser.avatar}`
    const avatar = currentUser.avatar ? avatarUser : avatarLogo
    const usedSpace = ((currentUser.usedSpace / currentUser.diskSpace) * 100).toFixed()
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])

    const handleUploadButtonClick = () => {
        document.getElementById('avatarInput').click();
    }

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    
    const fetchUsers = async () => {
        if (currentUser.status === 'admin') {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentUser.status]);

  return (
    <>
    <NavLink to="/">
        <div className="profile__back" data-testid="profile-back">
            <img src={backIcon} alt="" className='profile__img'/>
        </div>
    </NavLink>
        <div className='profile' data-testid="profile">

            <div className="profile__avatar" data-testid="profile-avatar">
                <img src={avatar} alt="" className="profile__image"/>
                <input type="file" accept='image/*' id="avatarInput" onChange={e => changeHandler(e)} data-testid="avatar-input" />
                <label htmlFor="avatarInput">
                    {!currentUser.avatar && <SecondaryButton onClick={handleUploadButtonClick} data-testid="upload-avatar-btn">Upload avatar</SecondaryButton>}
                </label>
                {currentUser.avatar && <SecondaryButton onClick={() => dispatch(deleteAvatar())} data-testid="delete-avatar-btn">Delete avatar</SecondaryButton>}
            </div>

            <div className="profile__content" data-testid="profile-content">
                <div className="profile__name" data-testid="profile-name">{currentUser.name}</div>
                <div className="profile__status" data-testid="profile-status">
                    <Label status={currentUser.status}>{currentUser.status}</Label>
                </div>
                <div className="profile__email" data-testid="profile-email">{currentUser.email}</div>
                <div className="profile__diskSpace" data-testid="profile-disk-space">
                    Used space:
                    <div className="profile__data" data-testid="profile-used-space">
                        {sizeFormat(currentUser.usedSpace)} from {sizeFormat(currentUser.diskSpace)}
                        <ProgressBar progress={usedSpace} data-testid="progress-bar"/>
                    </div>
                </div>
            </div>
        </div>

        {currentUser.status === 'admin' && (
                <UsersList users={users} fetchUsers={fetchUsers} data-testid="usersList" />
        )}

        <div className="profile__logout" onClick={() => dispatch(logout())} data-testid="logout-btn">
            <SecondaryButton>
                Log out
            </SecondaryButton>
        </div>
    </>
    
  )
}

export default Profile