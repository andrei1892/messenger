import React, { Component } from "react";
import UserInfo from "./info/UserInfo";
import AllConversations from "./all_conversations/ConversationsList";
import CurrentConversation from "./crt_conversation/CurrentConversation";
import FriendshipsBar from "./friends/FriendshipsBar";

import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      myData: {},
      friends: [],
      pendingFrReq: [],
      awaitingFrRes: [],
      suggestions: [],
      conversations: [],
      msg: "",
      crtConversation: {
        isOn: false
      }
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
        // console.log(response);
        this.setState({
          friends: response.data.friends,
          pendingFrReq: response.data.pending,
          awaitingFrRes: response.data.awaiting
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
      .then(response => {
        //console.log(response)
        this.setState({ conversations: response.data.conversations });
      })
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
        "http://localhost:4000/user/send_friend_request",
        {
          receiver: ev.target.parentNode.id
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        axios
          .get("http://localhost:4000/user/get_friends", {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(response => {
            this.setState({
              friends: response.data.friends,
              pendingFrReq: response.data.pending,
              awaitingFrRes: response.data.awaiting
            });
          })
          .catch(err => console.log(`get fr - eroare la catch: ${err}`));
      })
      .catch(err => console.log(err));
  };

  acceptRequest = ev => {
    axios
      .post(
        "http://localhost:4000/user/accept_request",
        {
          friend: ev.target.parentNode.id
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        axios
          .get("http://localhost:4000/user/get_friends", {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(response => {
            this.setState({
              friends: response.data.friends,
              pendingFrReq: response.data.pending,
              awaitingFrRes: response.data.awaiting
            });
          })
          .catch(err => console.log(`get fr - eroare la catch: ${err}`));
      })
      .catch(err => console.log(err));
  };

  getConversation = convId => {
    axios
      .get("http://localhost:4000/user/get_conversation?id=" + convId, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState(prevstate => {
          let crtConversation = response.data.conversation;
          crtConversation.isOn = true;
          crtConversation.userId = prevstate.myData.id;
          return {
            crtConversation: crtConversation
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getInput = ev => {
    // this.setState({ msg: ev.target.value });
    this.setState({ [ev.target.id]: ev.target.value });
  };

  sendMessage = ev => {

    if (this.state.msg.match(/\n/g)) {
      this.setState(prevstate => {
        let msg = prevstate.msg.trim();    // replace(\r\n|\n|\r)/gm, " ");
        return { msg:msg };
      });
      return null;
    }
  
    if (this.state.msg) {
         if (ev.type === "click" || ev.key === "Enter") {
      axios
        .post(
          "http://localhost:4000/user/send_message",
          {
            message: this.state.msg,
            conversationId: ev.target.offsetParent.offsetParent.id
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          this.setState({ msg: "" });
          axios
            .get(
              "http://localhost:4000/user/get_conversation?id=" +
                response.data.convId,
              {
                headers: {
                  token: localStorage.getItem("token")
                }
              }
            )
            .then(response => {
              this.setState(prevstate => {
                let crtConversation = response.data.conversation;
                crtConversation.isOn = true;
                crtConversation.userId = prevstate.myData.id;
                return {
                  crtConversation: crtConversation
                };
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => console.log(err));
    }}
  };

  render() {
    return (
      <div className="page-container">
        <UserInfo data={this.state.myData} />
        <main className="main-wrapper ">
          <AllConversations
            conversations={this.state.conversations}
            getConversation={this.getConversation}
          />
          <CurrentConversation
            crtConversation={this.state.crtConversation}
            getInput={this.getInput}
            sendMessage={this.sendMessage}
            msg={this.state.msg}
          />
          <FriendshipsBar
            friends={this.state.friends}
            pendingFrReq={this.state.pendingFrReq}
            awaitingFrRes={this.state.awaitingFrRes}
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
