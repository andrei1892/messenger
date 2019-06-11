import React, { Component } from "react";

const Friends = props => {
  if (props.friends.length === 0 && props.pendingRequests.length === 0)
    return (
      <div className="in-frienships-bar">
        You have no friends; search suggestions{" "}
      </div>
    );
  else {
    
    return (
      <div className="in-frienships-bar">
        <div className="friends">
          <h4> Friends </h4>
          {props.friends.map(friend => {
            return (
              <div className="info-box-wrapper">
                <span>{friend.firstname}</span>
                <span>{friend.lastname}</span>
              </div>
            );
          })}
        </div>
        <div className="pending-requests">
        <h4> Suggestions </h4>
          {props.pendingRequests.map(pending => {
            return (
              <div className="info-box-wrapper" id={pending.id}>
                <span>{pending.firstname}</span>
                <span>{pending.lastname}</span>
                <button
                  className="btn btn-add-friend"
                  onClick={props.acceptRequest}
                >
                  Accept
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
export default Friends;
