import React from "react";
import FriendWrapper from "./FriendBox";
import {FaHourglassHalf} from 'react-icons/fa';
import '../FriendsPanel.css';

const FriendsList = props => {
  if (
    props.friends.length === 0 &&
    props.pendingRequests.length === 0 &&
    props.awaitingRequests.length === 0
  )
    return (
      <div className="frienship-category">
        You have no friends; search suggestions{" "}
      </div>
    );
  else {
    return (
      <div className="frienship-category">
        <FriendWrapper list={props.friends} category={"Friends"} getFriendInfo={props.getFriendInfo} />
        {props.pendingRequests.length !== 0 ? (
          <FriendWrapper list={props.pendingRequests} category={"Friend Requests"}>
            <div>
            <button
              className="btn btn-add-friend"
              value = "accept"
              onClick={props.requestResponse}
            >
              Accept
            </button>
            <button
              className="btn btn-add-friend"
              value = "reject"
              onClick={props.requestResponse}
            >
              Reject
            </button>
            </div>
          </FriendWrapper>
        ) : null}
        {props.awaitingRequests.length !== 0 ? (
          <FriendWrapper list={props.awaitingRequests} category={"Requests sent"}>
            <FaHourglassHalf title='Awaiting Confirmation'/>
          </FriendWrapper>
        ) : null}
      </div>
    );
  }
};
export {FriendsList};
