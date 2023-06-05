import React from "react";
import ChatBodyLeft from "./MyChatsLeft";
import ChatBodyRight from "./ViewChatRight";
import "../chat.css";
function ChatBody() {
  return (
    /* Contains Chat Body Left and Right Side */
    <div className="chat-body">
      <ChatBodyLeft className="chat-left"></ChatBodyLeft>
      <ChatBodyRight className="chat-right"></ChatBodyRight>
    </div>
  );
}

export default ChatBody;
