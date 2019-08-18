import React, { Component } from "react";
import FriendsList from "./FriendsList";
import FriendsSuggestions from "./FriendsSuggestions";

class FriendsPanel extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="friendships-bar-container column">
        <FriendsList
          friends={this.props.friends}
          pendingRequests={this.props.pendingRequests}
          awaitingRequests={this.props.awaitingRequests}
          requestResponse={this.props.requestResponse}
        />
        <br />
        <FriendsSuggestions
          sendFriendRequest={this.props.sendFriendRequest}
          friendsSuggestions={this.props.friendsSuggestions}
        />
      </div>
    );
  }
}

export default FriendsPanel;
