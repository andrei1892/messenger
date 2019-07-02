import React, { Component } from "react";
import Friends from "./Friends";
import FriendsSuggestions from "./FriendsSuggestions";

class Friendships extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="friendships-bar-container column">
        <Friends
          friends={this.props.friends}
          pendingFrReq={this.props.pendingFrReq}
          awaitingFrRes={this.props.awaitingFrRes}
          frReqResponse={this.props.frReqResponse}
        />
        <br />
        <FriendsSuggestions
          sendFrReq={this.props.sendFrReq}
          suggestions={this.props.suggestions}
        />
      </div>
    );
  }
}

export default Friendships;
