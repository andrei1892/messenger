import React from "react";
import {FaInfo} from 'react-icons/fa';
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
              <FaInfo 
                title='About'
                className='info-icon' 
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
  getFriendInfo: function(){}
}

export default FriendWrapper;
