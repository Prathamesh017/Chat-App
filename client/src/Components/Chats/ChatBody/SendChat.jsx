import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { chatContext } from "../../../Context/context";
import axios from "axios";
import "../chat.css";
function SendChat() {
  const { selectChat } = useContext(chatContext);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  let loggedUser = JSON.parse(localStorage.getItem("user"));


  const sendChat = async () => {
    try {
      if (content === "") {
        return;
      }
      const sentMessage = await axios.post(
        "https://chat-app-backend-production-b904.up.railway.app/api/message",
        {
          message: content,
          chatId: selectChat.chatId || selectChat[0].chatId,
        },
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        }
      );

      
      setMessages((existingMessages) => [
        ...existingMessages,
        {
          message: sentMessage.data.data[0].message,
          sender: sentMessage.data.data[0].sender,
        },
      ]);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  const fetchAllChats = async () => {
    try {
      let chatId = selectChat.chatId || selectChat[0].chatId;
      setMessages([]);
      const allGroupChats = await axios.get(
        "https://chat-app-backend-production-b904.up.railway.app/api/message",
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
          params: { chatId: chatId },
        }
      );
      
      allGroupChats.data.data.map((user) => {
        return setMessages((existingMessage) => [
          ...existingMessage,
          {
            message: user.message,
            sender: user.sender,
          },
        ]);
      });
      setContent("");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchAllChats();
  }, [selectChat]);
  console.log(selectChat);
  return (
    <div>
      <>
        <div className="chat-box">
          <div className="sender-box">
            {messages.length > 0 &&
              messages.map((message) => {
             
                return loggedUser.id === message.sender._id ? (
                  <div style={{ textAlign: "right" }}>
                    <p className="right-side" style={{}}>
                      {message.message}
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: "left" }}>
                    <p className="left-side" style={{}}>
                      <span style={{ color: "black" }}>
                        {message.sender.name}:
                      </span>
                      {message.message}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </>

      <div className="send-input">
        <input
          placeholder="enter a message"
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button onClick={sendChat}>Send</button>
      </div>
    </div>
  );
}

export default SendChat;
