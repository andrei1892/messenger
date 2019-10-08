import axios from "axios";

export const GetPersonalData = () =>
  axios.get("http://localhost:4000/user/get_my_data", {
    headers: { 
      token: localStorage.getItem("token") 
    }
  });

export const GetFriends = () =>
  axios.get("http://localhost:4000/user/get_friends", {
    headers: {
      token: localStorage.getItem("token")
    }
  });

export const GetFriendsSuggestion = () =>
  axios.get("http://localhost:4000/user/get_friends_suggestions", {
    headers: {
      token: localStorage.getItem("token")
    }
  });

export const GetInfoAbout = userId => axios.get("http://localhost:4000/user/get_info_about", {
    headers: {
      token: localStorage.getItem("token")
    },
    params:{ 
      id: userId
    }
  });

export const GetConversationsList = () =>
  axios.get("http://localhost:4000/user/get_conversations", {
    headers: {
      token: localStorage.getItem("token")
    }
  });

export const GetConversation = conversationId =>
  axios.get(
    "http://localhost:4000/user/get_conversation?id=" + conversationId,
    {
      headers: {
        token: localStorage.getItem("token")
      }
    });
