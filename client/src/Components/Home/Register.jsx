import React from "react";
import FormControl from "@mui/material/FormControl";
import { OutlinedInput } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export default function Register() {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    image: "",
  });

  const [error, setError] = useState({
    showToast: false,
    showToastStatus: "",
    message: "",
  });
  const [isLoading, setisLoading] = useState(false);

  const checkForErrors = async function () {
    if (!data.email || !data.password || !data.cpassword || !data.name) {
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "error",
        message: "please fill all details",
      }));
      return;
    } else if (!regex.test(data.email)) {
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "error",
        message: "Please Enter Valid Email",
      }));
    } else if (!(data.password === data.cpassword)) {
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "error",
        message: "Passwords Don't Match",
      }));
      return;
    } else {
      register();
    }
  };

  const handleImage = async (event) => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dgkwwd1zl");
    const Imagedata = await axios.post(
      "https://api.cloudinary.com/v1_1/dgkwwd1zl/image/upload",
      formData
    );

    setData((existingData) => ({
      ...existingData,
      image: Imagedata.data.url,
    }));
    setisLoading(false);
  };
  const register = async () => {
    try {
      setisLoading(true);
      if (data.image === "") {
        data.image =
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
      }
      const user = await axios.post(
        "http://localhost:3000/api/user/register",
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
    } finally {
      setisLoading(false);
    }

    return;
  };
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput
          placeholder="Please enter Name"
          style={{ color: "black", marginBottom: "10px" }}
          onChange={(event) => {
            setData((existingData) => ({
              ...existingData,
              name: event.target.value,
            }));
          }}
        />
      </FormControl>

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
          style={{ color: "black", marginBottom: "10px" }}
          onChange={(event) => {
            setData((existingData) => ({
              ...existingData,
              password: event.target.value,
            }));
          }}
        />
      </FormControl>

      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput
          placeholder="Please enter  password"
          style={{ color: "black", marginBottom: "10px" }}
          onChange={(event) => {
            setData((existingData) => ({
              ...existingData,
              cpassword: event.target.value,
            }));
          }}
        />
      </FormControl>

      <FormControl>
        <label>Upload Profile Pic</label>
        <OutlinedInput
          placeholder="Upload Image"
          type="file"
          accept=".png,.jpg,.jpeg"
          fullWidth
          style={{ color: "black", marginBottom: "10px", width: "100%" }}
          onChange={(event) => {
            handleImage(event);
          }}
        />
      </FormControl>

      <Button
        loading
        loadingIndicator="Loading…"
        variant="contained"
        disabled={isLoading}
        onClick={checkForErrors}
        style={{ width: "100%", marginTop: "40px" }}
      >
        Register
      </Button>
      {isLoading && <CircularProgress style={{ marginLeft: "50%" }} />}
      {error.showToast && (
        <Alert severity={error.showToastStatus} style={{ marginTop: "20px" }}>
          {error.message}{" "}
        </Alert>
      )}
    </>
  );
}
