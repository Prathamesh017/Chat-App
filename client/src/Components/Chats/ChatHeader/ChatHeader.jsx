import React from "react";
import "../chat.css";
import TemporaryDrawer from "./Drawers";
import { SelectBar } from "./RightButtons";

function ChatHeader() {
  return (
    <div className="chat-header">
      <div style={{ flexGrow: 1 }}>
        <TemporaryDrawer />
      </div>
      <div
        style={{ flexGrow: 10, textAlign: "center", fontFamily: "monospace" }}
      >
        <h1 className="chat-title">Chat Please</h1>
      </div>
      <div style={{ flexGrow: 1 }}>
        <SelectBar />
      </div>
    </div>
  );
}

export default ChatHeader;
