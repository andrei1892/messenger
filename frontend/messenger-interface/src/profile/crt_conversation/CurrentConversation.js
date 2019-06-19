import React, { Component } from "react";

class CurrentConversation extends Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const sender = this.props.crtConversation.userId;
    return (
      <div className="current-conversation-wrapper column">
        <div className="chat-conversation">
          {  this.props.crtConversation.isOn ? this.props.crtConversation.messages.map( msg => (
            <p className={ sender === msg.sender ? "messaged-sent" : "messaged-received" }>{msg.msg_content}</p>
          )) : null }
        </div>
        <div className="chat-send" id={this.props.crtConversation._id}>
          <div className="message-content-container">
            <textarea
              className="message-content"
              rows="3"
              placeholder="Send message"
              name="message"
              value={this.props.msg}
              onChange={this.props.messageContainer}
            />
          </div>
          <div className="message-buttons">
            <button>emoji/colour</button>
            <button onClick={this.props.sendMessage} >send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentConversation;
