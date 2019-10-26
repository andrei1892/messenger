import React from "react";
import {Redirect} from 'react-router-dom';
import {ICONS} from 'reusables/Icons/Icons';
import "./UserInfo.css";

const UserInfo = props => {

  const [isSignedOut ,  signingOut] = React.useState(false);

  const signOut = () => {
    localStorage.removeItem("token");
    signingOut(true);
  }
  
  if (isSignedOut) return <Redirect to="/" />;
  else return (
    <header className="d-flex flex-row">
      <div className='info'>
      { props.data.img ?  <img className="mx-2" 
          src={props.data.img}
          alt="profile" /> : 
        <ICONS 
          type={'FaIcons'} 
          name={'FaUserAlt'} 
          iconClass={'mx-2'} 
          iconWrapper={'profile-picture'}
        /> }
      <span className="mx-2"> {props.data.firstname} {props.data.lastname}</span>
      </div>
      <div className='user-options'>
        <ICONS 
          type={'IoIcons'}
          name={'IoIosSettings'}
          title={'Settings'} 
          iconClass={'mx-1'} 
          iconWrapper={'action'} 
          onClick={props.openSettings}/>
        <ICONS 
          type={'IoIcons'}
          name={'IoIosExit'}
          title={'Sign Out'} 
          iconClass={'mx-1'}
          iconWrapper={'action'}
          onClick={signOut}/>
      </div>
    </header>
  );
};

export default UserInfo;