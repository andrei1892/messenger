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
      dataIsLoading: true,
      dataLoaded: true
    };
  }

  // componentDidMount() {
  //   // this.props.getConversation(this.props.conversations[0]._id);
  //   console.log(this.props.conversations);
  // }
  componentDidUpdate(prevProps) {
    if (this.props.conversations !== prevProps.conversations) {
      // this.setState({ dataIsLoading: false });
      // console.log(this.state.dataLoaded);
      if (this.state.dataLoaded && this.props.conversations.length > 0) {
        this.props.getConversation(this.props.conversations[0]._id);
      }
      this.setState({ dataLoaded: false, dataIsLoading: false });
    }
  }

  setFirstConversation = () => {
    this.setState({ dataIsLoading: false });
  };

  render() {
    if (this.state.dataIsLoading) {
      return (
        <nav className="conversations-list column">
          <input className="search" placeholder="Search conversations" />
          <h3>Loading...</h3>
        </nav>
      );
    } else
      return (
        <nav className="conversations-list column">
          <input className="search" placeholder="Search conversations" />
          {this.props.conversations.map((conversationContent, key) => {
            // if (key === 0 && this.state.dataIsLoading === true) {
            //   if( this.state.dataIsLoading ){ this.props.getConversation(conversationContent._id)};
            //   this.setFirstConversation();
            // }
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
