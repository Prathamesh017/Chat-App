import React, { useEffect } from "react";
import { useContext } from "react";
import { chatContext } from "../../../Context/context";
import GroupChatModal from "./GroupChat";
import "../chat.css";
function ChatBodyLeft() {
  const { allChats, setSelectChat } = useContext(chatContext);

  // all chats shown on left side
  const chatSelected = (user) => {
    setSelectChat(user);
  };
  useEffect(() => {}, [allChats]);

  return (
    <div className="chat-left">
      <div className="chat-left-header">
        <h2 style={{ color: "white" }}>MY Chats</h2>
        <GroupChatModal></GroupChatModal>
      </div>
      <div className="chat-left-body">
        <div className="list">
          {allChats.length > 0 &&
            allChats.map((user, index) => {
              return (
                <div
                  className="list-item"
                  onClick={() => {
                    chatSelected(user);
                  }}
                >
                  <div className="list-item-left">
                    <img
                      src={user[0].image}
                      width="50px"
                      height="50px"
                      style={{ borderRadius: "50%" }}
                      alt="mp"
                    />
                  </div>
                  <div className="list-item-right">
                    <div>{user[0].name}</div>
                    <div>message</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ChatBodyLeft;
