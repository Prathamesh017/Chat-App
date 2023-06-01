import React from "react";
import ChatHeader from "./ChatHeader";
import "./chat.css";
import { BasicModal } from "./Modal";
function ChatPage() {
  return (
    <>
      <ChatHeader></ChatHeader>
      <BasicModal></BasicModal>
    </>
  );
}

export default ChatPage;
