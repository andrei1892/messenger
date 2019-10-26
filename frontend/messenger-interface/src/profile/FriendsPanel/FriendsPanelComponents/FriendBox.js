import React from "react";
import {ICONS} from 'reusables/Icons/Icons';
import '../FriendsPanel.css';

const FriendWrapper = props => {

  return (
    <div>
      <h5>{props.category}</h5>
      {props.list.map((item, key) => {
        return (
          <div key={key} className="info-box-wrapper friend-box" id={item.id}>
            <div className='friend-info' >
              <span className="px-1">{item.firstname}</span>
              <span>{item.lastname}</span>
              <ICONS 
                type={'FaIcons'} 
                name={'FaInfo'} 
                iconClass={'info-icon'} 
                title='About'
                onClick={() => props.getFriendInfo(item.id)}
              />
            </div>
            {props.children}
          </div>
        );
      })}
    </div>
  );
};

FriendWrapper.defaultProps = {
  getFriendInfo: (id) => {}
}

export default FriendWrapper;
