import React from 'react'

const GetConversations = (props) => {
    return (
        <nav className="conversations-list column">
          <input
            className="search-conversations-list"
            placeholder="Search Messages"
          />
          {props.messages.map((x,key) => (
            <div key={key} className="info-box-wrapper">{x}</div>
          ))}
        </nav>
      )
}

export default GetConversations ;