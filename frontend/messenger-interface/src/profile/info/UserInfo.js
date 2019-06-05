import React from "react";

const UserInfo = props => {
  return (
    <header className="user-info d-flex flex-row">
      <img className="p-2" src="" alt="profile" />
      <div className="p-2">{props.data.firstname}</div>
      <div className="p-2">{props.data.lastname}</div>
    </header>
  );
};

export default UserInfo;