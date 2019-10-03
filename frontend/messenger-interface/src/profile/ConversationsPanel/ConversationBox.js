import React from "react";
import { Link } from "react-router-dom";
import "./ConversationsPanel.css";

const Conversation = props => {
  return (
    <Link to={`/profile/${props.conversationContent._id}`}>
      <div
        id={props.conversationContent._id}
        className="info-box-wrapper last-conversation-container"
        onClick={() => props.getConversation(props.conversationContent._id)}
      >
        {/* <img  className="profile-picture" /> */}
        <div className="last-conversation-details">
          <p className="conv-other">
            <span>{props.conversationContent.other.firstname}</span>
            <span> {props.conversationContent.other.lastname}</span>
          </p>
          <p className="conv-last-message">
            <span>{props.conversationContent.last_sender.firstname}</span>
            <span>
              {" "}
              {props.conversationContent.last_sender.lastname}
              {`: `}
            </span>
            <span>{props.conversationContent.messages.message_content}</span>
          </p>
          <p className="conv-last-timestamp">
            {" "}
            {props.conversationContent.timestamp.time}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
