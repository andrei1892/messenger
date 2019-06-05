import React,{Component} from 'react';
import UserInfo from './info/UserInfo'
import GetConversations from './lists/ConversationsLists'
import CurrentConversation from './crt_conversation/CurrentConversation'

import axios from 'axios';

class Profile extends Component {
    constructor(props){
        super();
        this.state={
            myData: {},
            messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/user/get_my_data', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then( response => {
            console.log(response.data);
            this.setState({myData: response.data})
        }
        )
        .catch( err => console.log(`get my data - eroare la catch: ${err}`)  )

         axios.get('http:/localhost:4000/user/get_conversations', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then()
        .catch( err => console.log(`get conv - eroare la catch: ${err}`)  )

        //  axios.get('http:/localhost:4000/user/search_friends', {
        //     headers:{
        //         token: localStorage.getItem('token')
        //     }
        // })
        // .then()
        // .catch()
    }

    render(){
    return(
      <div className="page-container container-fluid">
        <UserInfo data={this.state.myData} />
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