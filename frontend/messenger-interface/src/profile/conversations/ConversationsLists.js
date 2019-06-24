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
            className="info-box-wrapper last-conversation"
            onClick={ () => props.getConversation(conversationContent._id) }
          >
            <p className="conv-participant" >
              <span>
                {conversationContent.other.firstname}
              </span>
              <span> {conversationContent.other.lastname}{`:`}</span>
            </p >
            <p className="px-1 conv-last-message" >{conversationContent.messages.msg_content}</p>
          </div>
        );
      })}
    </nav>
  );
};

export default GetConversations;
