import React, { Component } from "react";
import {FriendsList} from "./FriendsPanelComponents/FriendsList";
import {FriendsSuggestions} from "./FriendsPanelComponents/FriendsSuggestions";
import {FriendProfile} from "./FriendsPanelComponents/FriendProfile";

import {GetInfoAbout} from 'helpers/GetRequests';

import './FriendsPanel.css';

class FriendsPanel extends Component {
  constructor(props) {
    super();
    this.state = {
      displayFriendInfo: false,
      friendInfo: {}
    };
  }

  getFriendInfo = (id) => {
    GetInfoAbout(id).then( response => {
      this.setState({
          displayFriendInfo: true,
          friendInfo: response.data.userinfo
      });
    });
  }

  closeFriendInfo = () => {
    return this.setState({
      displayFriendInfo: false,
      friendInfo: {}
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
          getFriendInfo={this.getFriendInfo}
        />
        <br />
        <FriendsSuggestions
          sendFriendRequest={this.props.sendFriendRequest}
          friendsSuggestions={this.props.friendsSuggestions}
        />
        <FriendProfile 
          toggle={this.state.displayFriendInfo}
          info = {this.state.friendInfo}
          closeFriendInfo={this.closeFriendInfo} 
        />
      </div>
    );
  }
}

export default FriendsPanel;
