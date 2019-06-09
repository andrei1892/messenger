import React, { Component } from "react";

const Friends = props => {
  if (props.friends.length === 0)
    return <p>You have no friends; search suggestions</p>;
  else {
    return (
      <div className="friends-wrapper">
        <div className="friends">
          {props.friends.map(friend => {
            return (
              <div className="previous-conversations">
                <span>{friend.firstname}</span>
                <span>{friend.lastname}</span>
              </div>
            );
          })}
        </div>
        <div className="pending-requests">
          {props.pendingRequests.map(pending => {
            return (
              <div className="previous-conversations">
                <span>{pending.id}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
export default Friends;
