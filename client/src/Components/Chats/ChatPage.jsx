import React from "react";
import ChatHeader from "./ChatHeader/ChatHeader";
import "./chat.css";
import ChatBody from "./ChatBody/ChatBody";
import { useState } from "react";
import { chatContext } from "../../Context/context";
import axios from "axios";
import { useEffect } from "react";
function ChatPage() {
  const [allChats, setAllChats] = useState([]);
  const [selectChat, setSelectChat] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const fetchAllChats = async () => {
    try {
      let config = {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
        body: {
          userId: loggedUser.id,
        },
      };

      const allChats = await axios.get(
        "http://localhost:3000/api/chat",
        config
      );

      let allUsers = allChats.data.data.map((data) => {
        let users = data.usersInChat.filter((user) => {
          return user._id !== loggedUser.id;
        });
        if (data.isGroupChat) {
          let newUser = [
            {
              chatId: data._id,
              name: data.chatName,
              image:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
              isGroupChat: true,
              users: users,
            },
          ];
          return newUser;
        } else {
          users["chatId"] = data._id;
          return users;
        }
      });

     
      setAllChats(allUsers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllChats();
  }, []);
  return (
    <chatContext.Provider
      value={{ allChats, setAllChats, selectChat, setSelectChat }}
    >
      <ChatHeader></ChatHeader>
      <ChatBody />
    </chatContext.Provider>
  );
}

export default ChatPage;
