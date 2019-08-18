import React from "react";

const UserInfo = props => {
  return (
    <header className="user-info d-flex flex-row">
      <img className="mx-2" src="" alt="profile" />
      <p className="mx-2">{props.data.firstname}</p>
      <p className="mx-2">{props.data.lastname}</p>
    </header>
  );
};

export default UserInfo;