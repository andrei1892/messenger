import React from "react";

const GetConversations = props => {
  const [firstRendered, updateFirstRendered] = React.useState(true);
  return (
    <nav className="conversations-list column">
      <input
        className="search"
        placeholder="Search conversations"
      />
      {props.conversations.map((conversationContent, key) => {
        if (key === 0 && firstRendered === true) {
          props.getConversation({
            target: {
              id: conversationContent._id
            }
          });
          updateFirstRendered(false);
        }
        return (
          <div
            key={key}
            id={conversationContent._id}
            className="info-box-wrapper last-conversation"
            onClick={props.getConversation}
          >
            {conversationContent.messages.msg_content}
          </div>
        );
      })}
    </nav>
  );
};

export default GetConversations;
