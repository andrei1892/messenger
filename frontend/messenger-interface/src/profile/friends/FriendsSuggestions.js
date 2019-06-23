import React from "react";

const FriendsSuggestions = props => {
  if (props.suggestions.length === 0)
    return <div className="frienship-category">There are no suggestions</div>;
  else {
    return (
      <div className="frienship-category">
        <h5>Suggestions</h5>
        {props.suggestions.map((suggestion, key) => {
          return (
            <div
              key={key}
              className="info-box-wrapper friend-box"
              id={suggestion._id}
            >
              <p>
                <span className="px-1">{suggestion.firstname}</span>
                <span>{suggestion.lastname}</span>
              </p>
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
export default FriendsSuggestions;
