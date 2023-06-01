import React from "react";
import "./chat.css";
import Button from "@mui/material/Button";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { BasicModal } from "./Modal";
export function SelectBar() {
  return (
    <div className="right-buttons">
      {/* <Button variant="outlined" size="small">
        <span>{<AccountBoxIcon fontSize="25px" />}</span>Profile
      </Button> */}
      <BasicModal />
      <Button variant="outlined" size="small">
        Logout
      </Button>
    </div>
  );
}
