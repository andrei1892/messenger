import React, { Component } from "react";
import {FriendsList} from "./FriendsPanelComponents/FriendsList";
import {FriendsSuggestions} from "./FriendsPanelComponents/FriendsSuggestions";
import {FriendProfile} from "./FriendsPanelComponents/FriendProfile";
import './FriendsPanel.css';

class FriendsPanel extends Component {
  constructor(props) {
    super();
    this.state = {
      displayFriendInfo: false
    };
  }

  toggleFriendInfo = () => {
    this.setState( prevState => {
      let displayFriendInfo = prevState.displayFriendInfo
      console.log(displayFriendInfo);
      return { 
        displayFriendInfo: !displayFriendInfo
      };
    });
  }

  render() {
    return (
      <div className="friendships-bar-container column">
        <FriendsList
          friends={this.props.friends}
          pendingRequests={this.props.pendingRequests}
          awaitingRequests={this.props.awaitingRequests}
          requestResponse={this.props.requestResponse}
          toggleFriendInfo={this.toggleFriendInfo}
        />
        <br />
        <FriendsSuggestions
          sendFriendRequest={this.props.sendFriendRequest}
          friendsSuggestions={this.props.friendsSuggestions}
        />
        <FriendProfile on={this.state.displayFriendInfo}  toggleFriendInfo={this.toggleFriendInfo} />
      </div>
    );
  }
}

export default FriendsPanel;
