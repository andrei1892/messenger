import React from "react";

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
        <div className="friends">
          <h5> Friends </h5>
          {props.friends.map((friend, key) => {
            return (
              <div key={key} className="info-box-wrapper friend-box">
                <p>
                  <span className="px-1">{friend.firstname}</span>
                  <span className="px-1">{friend.lastname}</span>
                </p>
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
                  <div
                    key={key}
                    className="info-box-wrapper friend-box"
                    id={pending.id}
                  >
                    <p>
                      <span className="px-1">{pending.firstname}</span>
                      <span>{pending.lastname}</span>
                    </p>
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
          {props.awaitingFrRes.length !== 0 ? (
            <>
              <h5>Requests sent</h5>
              {props.awaitingFrRes.map((awaiting, key) => {
                return (
                  <div
                    key={key}
                    className="info-box-wrapper friend-box"
                    id={awaiting.id}
                  >
                    <p>
                      <span>{awaiting.firstname}</span>
                      <span>{awaiting.lastname}</span>
                    </p>
                    <img src="" alt="-awaiting" />
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    );
  }
};
export default Friends;
