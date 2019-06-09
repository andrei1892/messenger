import React, { Component } from "react";

class CurrentConversation extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="current-conversation-wrapper column">
        <div className="chat-conversation">
          <p className="messaged-received">msg received</p>
          <p className="messaged-sent">msg send</p>
        </div>
        <div className="chat-send">
          <div className="message-content-container">
            <textarea
              className="message-content"
              rows="3"
              placeholder="Send message"
            />
          </div>
          <div className="message-buttons">
            <button>emoji/colour</button>
            <button>send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentConversation;
