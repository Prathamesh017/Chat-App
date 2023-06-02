import React from "react";
import FormControl from "@mui/material/FormControl";
import { OutlinedInput } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    showToast: false,
    showToastStatus: "",
  });
  const navigate = useNavigate();
  const checkForErrors = function () {
    if (!data.email || !data.password) {
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "error",
      }));
    } else {
      login();
    }
  };

  const login = async function () {
    try {
      const user = await axios.post(
        "http://localhost:3000/api/user/login",
        data
      );
      localStorage.setItem("user", JSON.stringify(user.data.data));
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "success",
        message: user.data.message,
      }));
      setTimeout(() => {
        console.log("LOGINNN");
        navigate("/chats");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "error",
        message: error.response.data.message,
      }));
    }
  };
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput
          placeholder="Please enter email"
          style={{ color: "black", marginBottom: "10px" }}
          onChange={(event) => {
            setData((existingData) => ({
              ...existingData,
              email: event.target.value,
            }));
          }}
        />
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput
          placeholder="Please enter password"
          style={{ color: "black" }}
          onChange={(event) => {
            setData((existingData) => ({
              ...existingData,
              password: event.target.value,
            }));
          }}
        />
      </FormControl>

      <Button
        variant="contained"
        style={{ width: "100%", marginTop: "40px" }}
        onClick={checkForErrors}
      >
        Login
      </Button>

      {error.showToast && (
        <Alert severity={error.showToastStatus} style={{ marginTop: "20px" }}>
          {error.message}
        </Alert>
      )}
    </>
  );
}

export default Login;
