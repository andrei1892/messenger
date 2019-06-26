import React, { Component } from "react";

class CurrentConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.conv = React.createRef();
  }
  componenDidMount(){
    this.scrollToLast();
  }

  componentDidUpdate(prevProps){
    if( this.props.crtConversation._id !== prevProps.crtConversation._id ){
      this.scrollToLast();
    }
  }

  scrollToLast = () => this.conv.current.scrollIntoView({ behaviour:"smooth"}) 

    
  render() {
    const sender = this.props.crtConversation.userId;
    return (
      <div className="current-conversation-wrapper column">
         <input
        className="search mx-auto"
        placeholder="Search"
      />
        <div className="chat-conversation" >
          {  this.props.crtConversation.isOn ? this.props.crtConversation.messages.map( (msg , key ) => (
            <p key={key} className={ sender === msg.sender ? "messaged-sent" : "messaged-received" }>{msg.msg_content}</p>
          )) : null }
          <div className="dummy"  ref={this.conv}/>
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
