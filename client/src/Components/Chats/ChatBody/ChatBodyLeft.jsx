import React, { useEffect } from "react";
import "../chat.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { chatContext } from "../../../Context/context";
function ChatBodyLeft() {
  const { allChats } = useContext(chatContext);

  useEffect(() => {}, [allChats]);

 
  return (
    <div className="chat-left">
      <div className="chat-left-header">
        <h2 style={{ color: "white" }}>MY Chats</h2>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          style={{
            backgroundColor: "#64748B",
            size: {
              xs: "small",
              sm: "medium",
            },
          }}
        >
          New Group Chat
        </Button>
      </div>
      <div className="chat-left-body">
        <div className="list">
          {allChats.length > 0 &&
            allChats.map((user, index) => {
              return (
                <div className="list-item">
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
