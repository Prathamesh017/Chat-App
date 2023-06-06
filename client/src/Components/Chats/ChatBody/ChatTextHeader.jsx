import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import BasicModal from "./ShowChatModal";
import { useContext } from "react";
import { chatContext } from "../../../Context/context";
import "../chat.css";
function ChatText() {
  //header  of chat right
  const { selectChat, setSelectChat } = useContext(chatContext);
  return (
    <div className="chat-screen">
      <div className="chat-screen-header">
        <div>
          <Button
            endIcon={<ArrowBackIcon fontSize="medium" />}
            onClick={() => {
              setSelectChat([]);
            }}
          ></Button>
        </div>
        <div className="header-name">
          <h1>
            {selectChat[0].isGroupChat ? "Group Name : " : "Sender :"}
            {selectChat[0].name}
          </h1>
        </div>
        <div>
          <BasicModal></BasicModal>
        </div>
      </div>
    </div>
  );
}

export default ChatText;
