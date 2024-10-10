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
    <div className="user" data-testid="user">
      <div className="user__name" data-testid="userName">{user.name}</div>
      <div className="user__email" data-testid="userEmail">{user.email}</div>

      <div className="user__status" data-testid="userStatus">
        {isEditing ? (
          <Selector
            value={status}
            options={statusOptions}
            onChange={handleStatusChange}
            data-testid="statusSelector"
          />
        ) : (
          <Label status={user.status} data-testid="userLabel">{user.status}</Label>
        )}
      </div>

      <div className="user__size" data-testid="userSize">
        {sizeFormat(user.usedSpace)} from {sizeFormat(user.diskSpace)}
        <ProgressBar progress={usedSpace} />
      </div>

      <div className="user__actions" data-testid="userActions">
        {isEditing ? (
          <PrimaryButton onClick={handleSave} data-testid="saveButton">Save</PrimaryButton>
        ) : (
          <SecondaryButton onClick={() => setIsEditing(true)} data-testid="editButton">Edit</SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default User;