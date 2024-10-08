import React, { useState } from "react";
import "./user.less";
import sizeFormat from "../../../../utils/sizeFormat";
import ProgressBar from "../../../UI/progressBar/ProgressBar";
import { useDispatch } from "react-redux";
import { changeUserStatus } from "../../../../actions/user";
import PrimaryButton from "../../../UI/primaryButton/PrimaryButton";
import SecondaryButton from "../../../UI/secondaryButton/SecondaryButton";
import Label from "../../../UI/label/Label";
import Selector from "../../../UI/selector/Selector";

const User = ({ user, fetchUsers }) => {
  const dispatch = useDispatch();
  const usedSpace = ((user.usedSpace / user.diskSpace) * 100).toFixed();
  const [status, setStatus] = useState(user.status);
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleSave = async () => {
    await dispatch(changeUserStatus(user._id, status));
    setIsEditing(false);
    fetchUsers();
  };

  const statusOptions = [
    { value: 'standard', label: 'standard' },
    { value: 'premium', label: 'premium' },
    { value: 'admin', label: 'admin' },
  ];

  return (
    <div className="user">
      <div className="user__name">{user.name}</div>
      <div className="user__email">{user.email}</div>

      <div className="user__status">
        {isEditing ? (
          <Selector value={status} options={statusOptions} onChange={handleStatusChange} />
        ) : (
          <Label status={user.status}>{user.status}</Label>
        )}
      </div>

      <div className="user__size">
        {sizeFormat(user.usedSpace)} from {sizeFormat(user.diskSpace)}
        <ProgressBar progress={usedSpace} />
      </div>

      <div className="user__actions">
        {isEditing ? (
          <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
        ) : (
          <SecondaryButton onClick={() => setIsEditing(true)}>Edit</SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default User;