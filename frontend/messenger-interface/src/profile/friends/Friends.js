import React from "react";

const Friends = props => {
  if (
    props.friends.length === 0 &&
    props.pendingFrReq.length === 0 &&
    props.awaitingFrRes.length === 0
  )
    return (
      <div className="in-frienships-bar">
        You have no friends; search suggestions{" "}
      </div>
    );
  else {
    return (
      <div className="in-frienships-bar">
        <div className="friends">
          <h5> Friends </h5>
          {props.friends.map(friend => {
            return (
              <div className="info-box-wrapper">
                <span className="px-1">{friend.firstname}</span>
                <span> </span>
                <span className="px-1">{friend.lastname}</span>
              </div>
            );
          })}
        </div>
        <div className="pending-requests">
          {props.pendingFrReq.length !== 0 ? (
            <>
              <h5> Friend requests </h5>
              {props.pendingFrReq.map((pending, key) => {
                return (
                  <div key={key} className="info-box-wrapper" id={pending.id}>
                    <span className="px-1">{pending.firstname}</span>{" "}
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
            </>
          ) : null}
        </div>
        <div className="requests-sent">
          <h5>Requests sent</h5>
          {props.awaitingFrRes.map((awaiting, key) => {
            return (
              <div key={key} className="info-box-wrapper" id={awaiting.id}>
                <span>{awaiting.firstname}</span>{" "}
                <span>{awaiting.lastname}</span>
                <img src="" alt="-awaiting" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
export default Friends;
