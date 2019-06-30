import React from "react";

const FriendWrapper = props => {
  return (
    <div>
      <h5>{props.category}</h5>
      {props.list.map((item, key) => {
        return (
          <div key={key} className="info-box-wrapper friend-box" id={item.id}>
            <p>
              <span className="px-1">{item.firstname}</span>
              <span>{item.lastname}</span>
            </p>
            {props.children}
          </div>
        );
      })}
    </div>
  );
};

export default FriendWrapper;
