import React from "react";

const GetConversations = props => {
  const [firstRendered, updateFirstRendered] = React.useState(true);
  return (
    <nav className="conversations-list column">
      <input className="search" placeholder="Search conversations" />
      {props.conversations.map((conversationContent, key) => {
        if (key === 0 && firstRendered === true) {
          props.getConversation( conversationContent._id);
          updateFirstRendered(false);
        }
        return (
          <div
            key={key}
            id={conversationContent._id}
            className="info-box-wrapper last-conversation-container"
            onClick={ () => props.getConversation(conversationContent._id) }
          >
            {/* <img  className="profile-picture" /> */}
            <div className="last-conversation-details" >
            <p className="conv-last-sender" >
              <span>
                {conversationContent.last_sender.firstname}
              </span>
              <span> {conversationContent.last_sender.lastname}{`:`}</span>
            </p >
            <p className="conv-last-message" >{conversationContent.messages.msg_content}</p>
            <p className="conv-last-timestamp" > {conversationContent.last_update} </p>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default GetConversations;
