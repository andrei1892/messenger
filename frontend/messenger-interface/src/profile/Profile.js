import React,{Component} from 'react';
import UserInfo from './info/UserInfo'
import GetConversations from './lists/ConversationsLists'
import CurrentConversation from './crt_conversation/CurrentConversation'

class Profile extends Component {
    constructor(props){
        super();
        this.state={
            messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   
        }
    }

    render(){
    return(
      <div className="page-container container-fluid">
        <UserInfo />
        <main className="chat-wrapper ">
            <GetConversations messages={this.state.messages} />
            <CurrentConversation />
            <aside className="about-interlocutor chat-column">
            who you talk to
            </aside>
         </main>
      </div>
    )
    }
}

export default Profile;