import React, { Component } from "react";
import UserInfo from "./info/UserInfo";
import GetConversations from "./conversations/ConversationsLists";
import CurrentConversation from "./crt_conversation/CurrentConversation";
import FriendshipsBar from "./friends/FriendshipsBar";

import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      myData: {},
      friends: [],
      pendingRequests: [],
      suggestions: [],
      messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/user/get_my_data", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({ myData: response.data });
      })
      .catch(err => console.log(`get my data - eroare la catch: ${err}`));

    axios
      .get("http://localhost:4000/user/get_friends", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({
          friends: response.data.friends,
          pendingRequests: response.data.pending
        });
      })
      .catch(err => console.log(`get fr - eroare la catch: ${err}`));

    axios
      .get("http://localhost:4000/user/get_friends_suggestions", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({ suggestions: response.data.suggestions });
      })
      .catch(err => console.log(`get conv - eroare la catch: ${err}`));

    axios
      .get("http://localhost:4000/user/get_conversations", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(conversations => { console.log(conversations)})
      .catch(err => console.log(`get conv - eroare la catch: ${err}`));

    //  axios.get('http:/localhost:4000/user/search_friends', {
    //     headers:{
    //         token: localStorage.getItem('token')
    //     }
    // })
    // .then()
    // .catch()
  }

  sendFriendRequest = ev => {
    axios
      .post(
        "http://localhost:4000/send_friend_request",
        {
          receiver: ev.target.parentNode.id
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  acceptRequest = ev => {
    // console.log(ev.target.parentNode.id);
    axios
      .post(
        "http://localhost:4000/accept_request",
        {
          friend: ev.target.parentNode.id
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
    
      axios
      .get("http://localhost:4000/user/get_friends", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({
          friends: response.data.friends,
          pendingRequests: response.data.pending
        });
      })
      .catch(err => console.log(`get fr - eroare la catch: ${err}`));
    
  };

  render() {
    return (
      <div className="page-container container-fluid">
        <UserInfo data={this.state.myData} />
        <main className="main-wrapper ">
          <GetConversations messages={this.state.messages} />
          <CurrentConversation />
          <FriendshipsBar
            friends={this.state.friends}
            pendingRequests={this.state.pendingRequests}
            suggestions={this.state.suggestions}
            sendFriendRequest={this.sendFriendRequest}
            acceptRequest={this.acceptRequest}
          />
        </main>
      </div>
    );
  }
}

export default Profile;
