import React from "react";
import "../chat.css";
import Button from "@mui/material/Button";
import { BasicModal } from "./ProfileModal";
import { useNavigate } from "react-router-dom";
export function SelectBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="right-buttons">
      <BasicModal />
      <Button variant="outlined" size="small" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
