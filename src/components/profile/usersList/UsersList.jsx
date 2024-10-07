import React from "react";
import "./usersList.less";
import User from "./user/User";

const UsersList = ({ users, fetchUsers }) => {

  return (
    <>
      <div className="users">
        <div className="users__header">
          <div className="users__name">Name</div>
          <div className="users__email">Email</div>
          <div className="users__status">Status</div>
          <div className="users__size">Used space</div>
        </div>

        <div className="users__list">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                user={user}
                fetchUsers={fetchUsers}
              />
            ))
          ) : (
            <div>No users found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersList;
