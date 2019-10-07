import React from "react";
import * as icons from 'react-icons/fa';
import '../FriendsPanel.css';

const FriendWrapper = props => {
  console.log(icons)
  return (
    <div>
      <h5>{props.category}</h5>
      {props.list.map((item, key) => {
        return (
          <div key={key} className="info-box-wrapper friend-box" id={item.id}>
            <div>
              <span className="px-1">{item.firstname}</span>
              <span>{item.lastname}</span>
              <icons.FaInfo  onClick={props.toggleFriendInfo} />
            </div>
            {props.children}
          </div>
        );
      })}
    </div>
  );
};

export default FriendWrapper;
