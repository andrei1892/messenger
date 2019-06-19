import React from 'react'

const GetConversations = (props) => {
    return (
        <nav className="conversations-list column">
          <input
            className="search-conversations-list"
            placeholder="Search Messages"
          />
          {/* {props.messages.map((conversationContent,key) => (
            <div key={key} className="info-box-wrapper">
            <p>{conversationContent}</p>
            </div>
          ))} */}
          {props.conversations.map( (conversationContent,key) => (
          <div key={key} 
            id={conversationContent._id} 
            className="info-box-wrapper last-conversation"
            onClick={props.getConversation}
            >
              {conversationContent.messages[0].msg_content}
            </div>
            )
          )}
        </nav>
      )
}

export default GetConversations ;