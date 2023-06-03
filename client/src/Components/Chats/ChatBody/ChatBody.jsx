import React from "react";
import ChatBodyLeft from "./ChatBodyLeft";
import ChatBodyRight from "./ChatBodyRight";
import "../chat.css";
function ChatBody() {
  return (
    <div className="chat-body">
      <ChatBodyLeft className="chat-left"></ChatBodyLeft>
      <ChatBodyRight className="chat-right"></ChatBodyRight>
    </div>
  );
}

export default ChatBody;
