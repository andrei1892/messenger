import React, { Component } from "react";
import Conversation from "./ConversationBox";

import Loader from 'reusables/Loader/Loader';

import "./ConversationsPanel.css"

class AllConversationsList extends Component {
  constructor(props) {
    super();
    this.state = {
      dataIsLoading: true,
      dataLoaded: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.conversations !== prevProps.conversations) {
      if (this.state.dataLoaded && this.props.conversations.length > 0) {
        console.log(this.props.match.params);
        this.props.getConversation(this.props.match.params.id || this.props.conversations[0]._id, this.props.history);
      }
      this.setState({ dataLoaded: false, dataIsLoading: false });
    }
    // if (this.props !== prevProps && this.props.conversations.length > 0 )  {
    //   this.props.getConversation(this.props.match.params.id || this.props.conversations[0]._id, this.props.history);
    // }
  }

  setFirstConversation = () => {
    this.setState({ dataIsLoading: false });
  };

  render() {
      return (
        <nav className="conversations-list column">
          <input className="search" placeholder="Search conversations" />
          <Loader size={'medium'} isLoading={this.state.dataIsLoading}>
          {this.props.conversations.map((conversationContent, key) => {
            return (
              <Conversation
                key={key}
                conversationContent={conversationContent}
                getConversation={this.props.getConversation}
              />
            );
          })
          }
          </Loader>
        </nav>
      );
   }
}

export default AllConversationsList;
