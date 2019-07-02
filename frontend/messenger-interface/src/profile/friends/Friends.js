import React from "react";
import FriendWrapper from "./FriendBox";

const Friends = props => {
  if (
    props.friends.length === 0 &&
    props.pendingFrReq.length === 0 &&
    props.awaitingFrRes.length === 0
  )
    return (
      <div className="frienship-category">
        You have no friends; search suggestions{" "}
      </div>
    );
  else {
    return (
      <div className="frienship-category">
        <FriendWrapper list={props.friends} category={"Friends"} />
        {props.pendingFrReq.length !== 0 ? (
          <FriendWrapper list={props.pendingFrReq} category={"Friend Requests"}>
            <div>
            <button
              className="btn btn-add-friend"
              value = "accept"
              onClick={props.frReqResponse}
            >
              Accept
            </button>
            <button
              className="btn btn-add-friend"
              value = "reject"
              onClick={props.frReqResponse}
            >
              Reject
            </button>
            </div>
          </FriendWrapper>
        ) : null}
        {props.awaitingFrRes.length !== 0 ? (
          <FriendWrapper list={props.awaitingFrRes} category={"Requests sent"}>
            <img src="" alt="-awaiting" />
          </FriendWrapper>
        ) : null}
      </div>
    );
  }
};
export default Friends;
