import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import UserInfo from "./UserInfo/UserInfo";
import AllConversationsList from "./ConversationsPanel/ConversationsList";
import CurrentConversation from "./CurrentConversation/CurrentConversation";
import FriendsPanel from "./FriendsPanel/FriendsPanel";
import * as FetchData from "../helpers/GetRequests"

import "./Profile.css";


class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      userData: {},
      friends: [],
      pendingRequests: [],
      awaitingRequests: [],
      friendsSuggestions: [],
      conversations: [],
      msg: "",
      crtConversation: {
        isOn: false
      }
    };
  }

  componentDidMount() {
    FetchData.GetPersonalData()
      .then(response => {
        this.setState({ userData: response.data });
      })
      .catch(err => console.log(`get my data - eroare la catch: ${err}`));

    FetchData.GetFriends()
      .then(response => {
        this.setState({
          friends: response.data.friends,
          pendingRequests: response.data.pending,
          awaitingRequests: response.data.awaiting
        });
      })
      .catch(err => console.log(`get friends - eroare la catch: ${err}`));

    FetchData.GetFriendsSuggestion()
      .then(response => {
        this.setState({ friendsSuggestions: response.data.suggestions });
      })
      .catch(err => console.log(`get friendsSuggestions - eroare la catch: ${err}`));

    FetchData.GetConversationsList()
      .then(response => {
        this.setState({ conversations: response.data.conversations }, (state) => console.log(this.state) );
      })
      .catch(err => console.log(`get conv - eroare la catch: ${err}`));
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
        FetchData.GetFriends()
          .then(response => {
            this.setState({
              friends: response.data.friends,
              pendingRequests: response.data.pending,
              awaitingRequests: response.data.awaiting
            });
          })
          .catch(err => console.log(`get fr - eroare la catch: ${err}`));

        FetchData.GetFriendsSuggestion()
          .then(response => {
            this.setState({ friendsSuggestions: response.data.suggestions }, () => {
              console.log(this.state);
            });
          })
          .catch(err => console.log(`get conv - eroare la catch: ${err}`));
      })
      .catch(err => console.log(err));
  };

  requestResponse = ev => {
    axios
      .post(
        "http://localhost:4000/user/accept_request",
        {
          friend: ev.target.parentNode.parentNode.id,
          response: ev.target.value
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        if (res.data.accepted) {
          FetchData.GetFriends()
            .then(response => {
              this.setState({
                friends: response.data.friends,
                pendingRequests: response.data.pending,
                awaitingRequests: response.data.awaiting
              });
            })
            .catch(err => console.log(`get fr - eroare la catch: ${err}`));
        } else {
          FetchData.GetFriends()
          .then(response => {
            this.setState({
              friends: response.data.friends,
              pendingRequests: response.data.pending,
              awaitingRequests: response.data.awaiting
            });
          });
          FetchData.GetFriendsSuggestion()
            .then(response => {
              this.setState({ friendsSuggestions: response.data.suggestions });
            })
            .catch(err =>
              console.log(`get friendsSuggestions - eroare la catch: ${err}`)
            );
        }
      })
      .catch(err => console.log(err));
  };

  getConversation = (conversationId, history) => {
    FetchData.GetConversation(conversationId)
      .then(response => {
        this.setState(prevstate => {
          let crtConversation = response.data.conversation;
          crtConversation.isOn = true;
          crtConversation.userId = prevstate.userData.id;
          return {
            crtConversation: crtConversation
          };
        });
      })
      .catch(err => {
        history.push("/profile/"+this.state.conversations[0]._id)
      });
  };

  getInput = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };

  sendMessage = ev => {
    if (this.state.msg.match(/\n/g)) {
      this.setState(prevstate => {
        let msg = prevstate.msg.trim(); // replace(\r\n|\n|\r)/gm, " ");
        return { msg: msg };
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
            FetchData.GetConversation(response.data.convId)
              .then(conv => {
                this.setState(prevstate => {
                  let crtConversation = conv.data.conversation;
                  crtConversation.isOn = true;
                  crtConversation.userId = prevstate.userData.id;
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
      }
    }
  };

  render() {
    const {friends, pendingRequests, friendsSuggestions, awaitingRequests} = this.state;
    return (
      <div className="profile-container">
        <UserInfo data={this.state.userData} />
        <main className="main-wrapper ">
          <BrowserRouter>        
            <Route path={["/profile/:id","/profile"]} render={(props) =>
               <AllConversationsList
              conversations={this.state.conversations}
              getConversation={this.getConversation}
              {...props}
            />}/>
            <CurrentConversation
              crtConversation={this.state.crtConversation}
              getInput={this.getInput}
              
              sendMessage={this.sendMessage}
              msg={this.state.msg} />
            <FriendsPanel
              friends={friends}
              pendingRequests={pendingRequests}
              awaitingRequests={awaitingRequests}
              friendsSuggestions={friendsSuggestions}
              sendFriendRequest={this.sendFriendRequest}
              requestResponse={this.requestResponse}
            />
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default Profile;
