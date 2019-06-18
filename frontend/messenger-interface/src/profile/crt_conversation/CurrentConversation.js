import React, { Component } from "react";

class CurrentConversation extends Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    console.log(this.props)
    return (
      <div className="current-conversation-wrapper column">
        <div className="chat-conversation">
          <p className="messaged-received">msg received</p>
          <p className="messaged-sent">msg send</p>
          {  this.props.crtConversation.isOn ? this.props.crtConversation.messages.map( msg => (
            <p className="messaged-received" >{msg.msg_content}</p>
          )) : null }
        </div>
        <div className="chat-send">
          <div className="message-content-container">
            <textarea
              className="message-content"
              rows="3"
              placeholder="Send message"
              name="message"
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
