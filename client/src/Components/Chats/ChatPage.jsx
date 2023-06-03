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
        return data.usersInChat.filter((user) => {
          return user._id !== loggedUser.id;
        });
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
    <chatContext.Provider value={{ allChats, setAllChats }}>
      <ChatHeader></ChatHeader>
      <ChatBody />
    </chatContext.Provider>
  );
}

export default ChatPage;
