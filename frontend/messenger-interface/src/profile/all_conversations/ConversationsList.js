import React, { Component } from "react";
import Conversation from "./ConversationBox";

// const AllConversations = props => {
//   const [firstRendered, updateFirstRendered] = React.useState(true);
//   return (
//     <nav className="conversations-list column">
//       <input className="search" placeholder="Search conversations" />
//       {props.conversations.map((conversationContent, key) => {
//         if (key === 0 && firstRendered === true) {
//           props.getConversation(conversationContent._id);
//           updateFirstRendered(false);
//         }
//         return (
//           <div
//             key={key}
//             id={conversationContent._id}
//             className="info-box-wrapper last-conversation-container"
//             onClick={() => props.getConversation(conversationContent._id)}
//           >
//             {/* <img  className="profile-picture" /> */}
//             <div className="last-conversation-details">
//               <p className="conv-last-sender">
//                 <span>{conversationContent.last_sender.firstname}</span>
//                 <span>
//                   {" "}
//                   {conversationContent.last_sender.lastname}
//                   {`:`}
//                 </span>
//               </p>
//               <p className="conv-last-message">
//                 {conversationContent.messages.msg_content}
//               </p>
//               <p className="conv-last-timestamp">
//                 {" "}
//                 {conversationContent.timestamp.time}{" "}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </nav>
//   );
// };

class AllConversations extends Component {
  constructor(props) {
    super();
    this.state = {
      isRendered: true
    };
  }

  setFirstConversation = ()=>{
    this.setState({isRendered: false})
  }

  render() {
    return (
      <nav className="conversations-list column">
        <input className="search" placeholder="Search conversations" />
        {this.props.conversations.map((conversationContent, key) => {
          if (key === 0 && this.state.isRendered === true) {
            this.props.getConversation(conversationContent._id);
            this.setFirstConversation();
          }
          return (
            <Conversation
              key={key}
              conversationContent={conversationContent}
              getConversation={this.props.getConversation}
            />
          );
        })}
      </nav>
    );
  }
}

export default AllConversations;
