import React from "react";

const Conversation = (props) => {
    return(
        <div
        id={props.conversationContent._id}
        className="info-box-wrapper last-conversation-container"
        onClick={ () => props.getConversation(props.conversationContent._id) }
      >
        {/* <img  className="profile-picture" /> */}
        <div className="last-conversation-details" >
        <p className="conv-last-sender" >
          <span>
            {props.conversationContent.last_sender.firstname}
          </span>
          <span> {props.conversationContent.last_sender.lastname}{`:`}</span>
        </p >
        <p className="conv-last-message" >{props.conversationContent.messages.msg_content}</p>
        <p className="conv-last-timestamp" > {props.conversationContent.timestamp.time} </p>
        </div>
      </div>
    )
}

export default Conversation;