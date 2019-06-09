import React from 'react'

const GetConversations = (props) => {
    return (
        <nav className="conversations-list chat-column">
          <input
            className="search-conversations-list"
            placeholder="Search Messages"
          />
          {props.messages.map(x => (
            <div className="previous-conversations">{x}</div>
          ))}
        </nav>
      )
}

export default GetConversations ;