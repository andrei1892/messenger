import React from "react";
import {ICONS} from '../../reusables/Icons/Icons';
import "./UserInfo.css";

const UserInfo = props => {
  return (
    <header className="d-flex flex-row">
      <div className='info'>
      {props.data.img ? <img className="mx-2" src="" alt="profile" /> : <ICONS type={'FaIcons'} name={'FaUserAlt'} iconClass={'mx-2'} iconWrapper={'profile-picture'}  />}
      <span className="mx-2"> {props.data.firstname} {props.data.lastname}</span>
      </div>
      <div className='user-options'>
        <ICONS type={'IoIcons'} name={'IoIosSettings'} title={'Settings'} iconClass = {'mx-1'} />
        <ICONS type={'IoIcons'} name={'IoIosExit'} title={'LogOut'} iconClass = {'mx-1'} />
      </div>
    </header>
  );
};

export default UserInfo;