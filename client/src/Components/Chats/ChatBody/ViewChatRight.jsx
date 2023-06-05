import React, { useContext } from "react";
import "../chat.css";
import { chatContext } from "../../../Context/context";
import ChatText from "./ChatTextHeader";
function ChatBodyRight() {
  // chat body right side
  const { selectChat } = useContext(chatContext);
  return (
    <div className="chat-right">
      {selectChat.length === 0 ? (
        <div className="no-chat-to-show">
          <h1 className="center">Click on a User to Chat</h1>
        </div>
      ) : (
        <ChatText></ChatText>
      )}
    </div>
  );
}

export default ChatBodyRight;
