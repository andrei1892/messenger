import React from "react";
import '../FriendsPanel.css';

const FriendsSuggestions = props => {
  if (props.friendsSuggestions.length === 0)
    return <div className="frienship-category">There are no suggestions</div>;
  else {
    return (
      <div className="frienship-category">
        <h5>Suggestions</h5>
        {props.friendsSuggestions.map((suggestion, key) => {
          return (
            <div
              key={key}
              className="info-box-wrapper friend-box"
              id={suggestion._id}
            >
              <div>
                <span className="px-1">{suggestion.firstname}</span>
                <span>{suggestion.lastname}</span>
              </div>
              <button
                className="btn btn-add-friend"
                onClick={props.sendFriendRequest}
              >
                Add Friend
              </button>
            </div>
          );
        })}
      </div>
    );
  }
};
export {FriendsSuggestions};
