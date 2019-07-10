import React, { Component } from "react";
import axios from "axios";

class CurrentConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResponse: [],
      searchMessage: ""
    };
    this.conv = React.createRef();
  }
  componenDidMount() {
    this.scrollToLast();
  }

  componentDidUpdate(prevProps) { // verificare id + nou mesaj props -> cheama functia
    //if (this.props.crtConversation._id !== prevProps.crtConversation._id || this.props.msg   ) {
      this.scrollToLast();
   // }
  }

  scrollToLast = () =>
    this.conv.current.scrollIntoView({ behaviour: "smooth" });

  searchMsg = ev => {
    if (ev.key === "Enter") {
      axios
        .post(
          "http://localhost:4000/user/search_message",
          {
            conversationId: this.props.crtConversation._id,
            search_message: this.state.searchMessage
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({ searchResponse: response.data.search });
        });
    }
  };

  getsearch = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };

  render() {
    const sender = this.props.crtConversation.userId;
    return (
      <div className="current-conversation-wrapper column">
        <input
          className="search mx-auto"
          placeholder="Search"
          id="searchMessage"
          onChange={this.getsearch}
          value={this.state.searchMessage}
          onKeyPress={this.searchMsg}
        />
        <div className="chat-conversation">
          {this.props.crtConversation.isOn
            ? this.props.crtConversation.messages.map((msg, key) => (
                <p
                  key={key}
                  className={
                    sender === msg.sender
                      ? "messaged-sent"
                      : "messaged-received"
                  }
                >
                  {msg.msg_content}
                </p>
              ))
            : null}
          <div className="dummy" ref={this.conv} />
        </div>
        <div className="chat-send" id={this.props.crtConversation._id}>
          <div
            className="message-content-container"
            onKeyPress={this.props.sendMessage}
          >
            <textarea
              className="message-content"
              rows="3"
              placeholder="Send message"
              id="msg"
              name="message"
              value={this.props.msg}
              onChange={this.props.getInput}
            />
          </div>
          <div className="message-buttons">
            {/* <button>emoji/colour</button> */}
            <button onClick={this.props.sendMessage}>send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentConversation;
